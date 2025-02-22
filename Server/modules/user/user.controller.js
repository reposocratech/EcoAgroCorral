import { json } from "express";
import { hashPassword } from "../../utils/hashUtils.js";
import { sendMail } from "../../utils/nodemailer.js";
import UserDal from "./user.dal.js";
import jwt from "jsonwebtoken";
import { comparePassword } from "../../utils/hashUtils.js";
import { generateToken, getIdFromToken } from "../../utils/tokenUtils.js";
import EmailService from "../../utils/email/sendEmails.js";

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
        await UserDal.register([
          user_name,
          user_lastname,
          user_birthdate,
          user_email,
          user_address,
          user_phone,
          user_dni,
          hash,
        ]);
        
        const emailToken = jwt.sign({ user_email }, process.env.TOKEN_KEY, {
          expiresIn: "1h",
        });

        await EmailService.sendRegistrationEmail(
          { user_name, user_email },
          emailToken
        );

        res.status(200).json({ msg: "Registro exitoso, verifica tu correo" });
      }
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
  };

  verifyEmail = async (req, res) => {
    const { emailToken } = req.params;

    try {
      const decode = jwt.verify(emailToken, process.env.TOKEN_KEY);
      const user = await UserDal.findUserByEmail(decode.user_email);

      if (user.length === 0) {
        res.status(400).json({ msg: "Usuario no encontrado" });
      }
      await UserDal.validateUser(decode.user_email);
      res.json({ msg: "Registro confirmado" });
    } catch (error) {
      console.log(error);
      res.status(400).json({ msg: "Token inválido o expirado" });
    }
  };

  confirmEmail = async (req, res) => {
    const { token } = req.params;

    try {
      const decode = jwt.verify(token, process.env.TOKEN_KEY);
      const user_email = decode.user_email;

      const user = await UserDal.findUserByEmail(user_email);
      if (user.length === 0) {
        return res
          .status(400)
          .json({ msg: "Usuario no encontrado o no válido" });
      }
      await UserDal.validateUser(user_email);

      res
        .status(200)
        .json({ msg: "Correo electrónico verificado exitosamente" });
    } catch (error) {
      res.status(400).json({ msg: "Token inválido o expirado" });
    }
  };

  login = async (req, res) => {
    const { user_email, user_password } = req.body;

    try {
      const result = await UserDal.findUserByEmailLogin(user_email);
      if (result.length === 0) {
        res
          .status(401)
          .json({ message: "El usuario no existe o no está verificado." });
      } else {
        const user = result[0];
        const match = await comparePassword(user_password, user.user_password);
        if (match) {
          //generar un token
          const token = generateToken(user.user_id);
          //mandar el token
          res.status(200).json(token);
        } else {
          res.status(401).json({ message: "La contraseña es incorrecta" });
        }
      }
    } catch (error) {
      res.status(500).json({ message: "Error de server controller" });
    }
  };

  findUserById = async (req, res) => {
    const user_id = getIdFromToken(req.token);

    try {
      const resultUser = await UserDal.getUserById(user_id);
      res.status(200).json(resultUser[0]);
    } catch (error) {
      res.status(500).json({ message: "Error de server" });
    }
  };

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

      const emailToken = jwt.sign({ user_email }, process.env.TOKEN_KEY, {
        expiresIn: "1h",
      });

      sendMail(
        user_email,
        "Reenvío de verificación",
        `Hola, haz clic en el siguiente enlace para verificar tu cuenta: ${process.env.URLFRONT}/confirmarEmail/${emailToken}`
      );

      res
        .status(200)
        .json({ msg: "Se ha enviado un nuevo correo de verificación" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: "Error al reenviar la verificación" });
    }
  };

  recoverPass = async (req, res) => {
    const { user_email } = req.body;
    try {
      if (!user_email) {
        res.status(401).json({ message: "Debe cumplimentar el campo" });
      } else {
        const userResult = await UserDal.findUserByEmail(user_email);
        if (userResult.length === 0) {
          res.status(401).json({ message: "El usuario no existe" });
        } else {
          const emailToken = jwt.sign({ user_email }, process.env.TOKEN_KEY, {
            expiresIn: "1h",
          });
          await EmailService.sendRestorePasswordEmail(
            { user_name: userResult[0].user_name, user_email },
            emailToken
          );
        }
      }
      return res
        .status(200)
        .json({ message: "Correo de recuperación enviado." });
    } catch (error) {
      console.error("Error en recoverPass:", error);
      return res
        .status(500)
        .json({ message: "Error al procesar la solicitud." });
    }
  };

  confirmToken = async (req, res) => {
    const { token } = req.params;
    try {
      const decode = jwt.verify(token, process.env.TOKEN_KEY);
      const user_email = decode.user_email;
      const user = await UserDal.findUserByEmail(user_email);
      if (user.length === 0) {
        return res
          .status(400)
          .json({ message: "Usuario no encontrado o no válido" });
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(400).json({ message: "Token inválido o expirado" });
    }
  };

  changePassword = async (req, res) => {
    const { user_id } = req.params;
    const { user_password, user_repPassword } = req.body;
    try {
      if (!user_password || !user_repPassword) {
        res.status(401).json({ message: "Debe cumplimentar todos los campos" });
      } else if (user_password !== user_repPassword) {
        res.status(401).json({ message: "Las contraseñas no coinciden" });
      } else {
        const hash = await hashPassword(user_password);
        const result = await UserDal.changePassword(hash, user_id);
        if (result.changedRows == 0) {
          res.status(401).json({ message: "Usuario no válido" });
        } else {
          res.status(200).json({ message: "Su contraseña fue restablecida" });
        }
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error de server al intentar guardar la contraseña" });
    }
  };

  getReservations = async (req, res) => {
    const { user_id } = req.params;
    try {
      const result = await UserDal.getReservations(user_id);
      res.status(200).json(result);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error de server al intentar obtener las reservas" });
    }
  };

  editUser = async (req, res) => {
    try {
      const data = JSON.parse(req.body.edit);
      const file = req.file;

      console.log("Datos parseados en el controlador:", data);
      console.log("Archivo recibido en el controlador:", file);

      const result = await UserDal.editUser(data, file);

      let img = null;
      if (file) {
        img = file.filename;
      }
      res.status(200).json({ msg: "Usuario actualizado correctamente", img });
    } catch (error) {
      console.error("Error en el controlador editUser:", error);
      res.status(500).json({ msg: "Error interno del servidor" });
    }
  };

  getExperience = async (req, res) => {
    try {
      const result = await UserDal.getExperience();
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ msg: "Error al buscar la información" });
    }
  };

  createReservation = async (req, res) => {
    const {
      reservation_experience_id,
      reservation_hike_id,
      reservation_text,
      reservation_date,
      reservation_time,
      reservation_adult,
      reservation_children,
      reservation_total_price,
      reservation_user_id,
    } = req.body;

    try {
      if (
        !reservation_experience_id ||
        !reservation_hike_id ||
        !reservation_date ||
        !reservation_time ||
        !reservation_adult ||
        !reservation_children ||
        !reservation_total_price ||
        !reservation_user_id
      ) {
        return res
          .status(401)
          .json({ message: "Debe cumplimentar todos los campos" });
      }

      const user = await UserDal.getUserById(reservation_user_id);
      const hike = await UserDal.getHikeById(reservation_hike_id);

      if (!user.length) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }
  
      if (!hike.length) {
        return res.status(404).json({ message: "Ruta no encontrada" });
      }
  

      const result = await UserDal.createReservation(
        reservation_experience_id,
        reservation_hike_id,
        reservation_text,
        reservation_date,
        reservation_time,
        reservation_adult,
        reservation_children,
        reservation_total_price,
        reservation_user_id
      );

      await EmailService.sendReservationConfirmationEmail(
        {
          user_name: user[0].user_name,
          user_email: user[0].user_email,
        },
        {
          hike_title: hike[0].hike_title,
          reservation_date,
          reservation_time,
          reservation_adult,
          reservation_children,
          reservation_total_price,
        }
      );

      return res.status(200).json({ message: "Reserva hecha ok" });
    } catch (error) {
      console.error("Error al crear la reserva:", error);
      return res
        .status(500)
        .json({ message: "Error al procesar la solicitud." });
    }
  };
}

export default new UserController();