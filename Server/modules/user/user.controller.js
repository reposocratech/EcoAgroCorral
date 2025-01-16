import { json } from "express";
import { hashPassword } from "../../utils/hashUtils.js";
import { sendMail } from "../../utils/nodemailer.js";
import UserDal from "./user.dal.js";
import jwt from "jsonwebtoken"
import { comparePassword } from "../../utils/hashUtils.js";
import { generateToken, getIdFromToken } from "../../utils/tokenUtils.js";

class UserController {
  register = async (req, res) => {
    try {
      const {
        user_name,
        user_lastname,
        user_birthdate,
        user_email,
        user_address,
        user_phone,
        user_dni,
        user_password,
        repPassword,
      } = req.body;

      if (
        !user_name ||
        !user_lastname ||
        !user_birthdate ||
        !user_email ||
        !user_address ||
        !user_phone ||
        !user_dni ||
        !user_password ||
        !repPassword
      ) {
        throw new Error("Debes cumplimentar los campos");
      } else if (user_password !== repPassword) {
        throw new Error("Las contraseñas deben coincidir");
      } else {
        const hash = await hashPassword(user_password);
        const result = await UserDal.register([
          user_name,
          user_lastname,
          user_birthdate,
          user_email,
          user_address,
          user_phone,
          user_dni,
          hash
        ]);
        const emailToken = jwt.sign({user_email}, process.env.TOKEN_KEY, {expiresIn: "1h"})
        sendMail(
          user_email, 
          "Verifica tu cuenta",
          `Hola ${user_name}, por favor verifica tu cuenta mediante el siguiente enlace: ${process.env.URLFRONT}/confirmarEmail/${emailToken}`
        )
        res.status(200).json({ msg: "Todo OK!" });
      }
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
  };

  verifyEmail = async (req, res) =>{
    const {emailToken} = req.params;

    try {
      const decode = jwt.verify(emailToken, process.env.TOKEN_KEY)
      const user = await UserDal.findUserByEmail(decode.user_email)
      
      if (user.length === 0) {
        res.status(400).json({msg: "Usuario no encontrado"})
      }
      await UserDal.validateUser(decode.user_email)
      res.json({msg: "Registro confirmado"})
      
    } catch (error) {
      console.log(error);
      res.status(400).json({msg: "Token inválido o expirado"})
    }
  }

  confirmEmail = async (req, res) => {
    const { token } = req.params;
    
    try {
      const decode = jwt.verify(token, process.env.TOKEN_KEY);
      const user_email = decode.user_email;
  
      const user = await UserDal.findUserByEmail(user_email);
      if (user.length === 0) {
        return res.status(400).json({ msg: "Usuario no encontrado o no válido" });
      }
      await UserDal.validateUser(user_email);
  
      res.status(200).json({ msg: "Correo electrónico verificado exitosamente" });
    } catch (error) {
      res.status(400).json({ msg: "Token inválido o expirado" });
    }
  };

  login = async (req, res) =>{
    const {user_email, user_password} = req.body;
    
    try {
      const result = await userDal.findUserByEmail(user_email);
      if(result.length === 0){
        res.status(401).json({message:"El usuario no existe"});
      }else{
        const user = result[0];
        const match = await comparePassword(user_password, user.user_password);
        if(match){
          //generar un token
          const token = generateToken(user.user_id);
          //mandar el token
          res.status(200).json(token);
        }else{
          res.status(401).json({message:"La contraseña es incorrecta"});
        }
      }
    } catch (error) {
      res.status(500).json({message:"Error de server"});
    }

  findUserById = async (req,res) =>{
    const user_id = getIdFromToken(req.token)

    try {
      const resultUser = await userDal.getUserById(user_id);
      res.status(200).json(resultUser[0])
    } catch (error) {
      res.status(500).json({message:"Error de server"});
    }
  }
}

export default new UserController();
