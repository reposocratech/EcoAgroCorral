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
      const result = await UserDal.findUserByEmailLogin(user_email);
      if(result.length === 0){
        res.status(401).json({message:"El usuario no existe o no está verificado."});
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
      res.status(500).json({message:"Error de server controller"});
    }
  }

  findUserById = async (req,res) =>{
    const user_id = getIdFromToken(req.token)

    try {
      const resultUser = await UserDal.getUserById(user_id);
      res.status(200).json(resultUser[0])
    } catch (error) {
      res.status(500).json({message:"Error de server"});
    }
  }

  resendVerification = async (req, res) => {
    const { user_email } = req.body;
  
    try {
      const user = await UserDal.findUserByEmail(user_email);
  
      if (user.length === 0) {
        return res.status(400).json({ msg: "Usuario no encontrado" });
      }
  
      if (user[0].user_is_verified) {
        return res.status(400).json({ msg: "El usuario ya está verificado" });
      }
  
      const emailToken = jwt.sign({ user_email }, process.env.TOKEN_KEY, { expiresIn: "1h" });
  
      sendMail(
        user_email,
        "Reenvío de verificación",
        `Hola, haz clic en el siguiente enlace para verificar tu cuenta: ${process.env.URLFRONT}/confirmarEmail/${emailToken}`
      );
  
      res.status(200).json({ msg: "Se ha enviado un nuevo correo de verificación" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: "Error al reenviar la verificación" });
    }
  };
  

  recoverPass = async (req,res) =>{
    const {user_email} = req.body;
    try {
      if(!user_email){
        res.status(401).json({message:"Debe cumplimentar el campo"});
      }else{
        const userResult = await UserDal.findUserByEmail(user_email);
        if(userResult.length === 0){
          res.status(401).json({message:"El usuario no existe"});
        } else{
          const emailToken = jwt.sign({user_email}, process.env.TOKEN_KEY, {expiresIn: "1h"})
          sendMail(
            user_email, 
            "Cambia tu contraseña",
            `Hola ${userResult[0].user_name}, puedes restablecer tu contraseña a traves del siguiente enlace: ${process.env.URLFRONT}/user/restablecerPass/${emailToken}`
          )
          res.status(200).json({ message: "Email enviado" });
        }
      }
    } catch (error) {
      res.status(500).json({message:"Error de server recoverPass"});
    }
  }

  confirmToken = async (req, res) =>{
    const { token } = req.params;
    try {
      const decode = jwt.verify(token, process.env.TOKEN_KEY);
      const user_email = decode.user_email;
      const user = await UserDal.findUserByEmail(user_email);
      if (user.length === 0) {
        return res.status(400).json({ message: "Usuario no encontrado o no válido" });
      }
      res.status(200).json(user)
    } catch (error) {
      res.status(400).json({ message: "Token inválido o expirado" });
    }
    
  }

  changePassword = async (req, res) =>{
    const {user_id} = req.params;
    const {user_password, user_repPassword} = req.body;
    try {
      if(!user_password || !user_repPassword){
        res.status(401).json({message:"Debe cumplimentar todos los campos"});
      }else if (user_password !== user_repPassword){
        res.status(401).json({message:"Las contraseñas no coinciden"});
      }else{
        const hash = await hashPassword(user_password);
        const result = await UserDal.changePassword(hash, user_id);
        if (result.changedRows == 0){
          res.status(401).json({message:"Usuario no válido"});
        }else{
          res.status(200).json({ message: "Su contraseña fue restablecida"});
        }
      }
      
    } catch (error) {
      res.status(500).json({message:"Error de server al intentar guardar la contraseña"});
    }
    
  }

  getReservations = async (req,res)=>{
    const {user_id} = req.params;
    try {
      const result = await UserDal.getReservations(user_id);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({message:"Error de server al intentar obtener las reservas"});
    }
  }
}

export default new UserController();
