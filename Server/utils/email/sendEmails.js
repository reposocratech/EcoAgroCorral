import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";
import mjml2html from "mjml";
import Handlebars from "handlebars";
import nodemailer from "nodemailer";
import fs from "fs/promises";

class EmailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: parseInt(process.env.EMAIL_PORT, 10),
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }

  async sendRegistrationEmail(userData, emailToken) {
    try {
      const { user_name, user_email } = userData;

      const __filename = fileURLToPath(import.meta.url);
      const __dirname = dirname(__filename);
      const templatePath = path.join(
        __dirname,
        "../email/verificationEmail.mjml"
      );

      const mjmlTemplate = await fs.readFile(templatePath, "utf8");

      const template = Handlebars.compile(mjmlTemplate);
      const mjmlWithData = template({
        logoUrl:
          "https://https://www.ecoagrocorral.com/web/image/964-3e9cbef4/logo%20ecoagrocorral.jpg.JPG",
        userName: user_name,
        verificationUrl: `${process.env.URLFRONT}/confirmarEmail/${emailToken}`,
      });

      const { html } = mjml2html(mjmlWithData);

      console.log("Email Data:", {
        to: user_email,
        subject: "Verifica tu cuenta",
      });
      await this.transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: user_email,
        subject: "Verifica tu cuenta",
        html,
      });

      console.log("Correo enviado correctamente a:", user_email);
      return true;
    } catch (error) {
      console.error("Error enviando email:", error);
      throw error;
    }
  }

  async sendRestorePasswordEmail(userData, emailToken) {
    try {
      const { user_name, user_email } = userData;

      const __filename = fileURLToPath(import.meta.url);
      const __dirname = dirname(__filename);
      const templatePath = path.join(__dirname, "../email/changePassword.mjml");

      const mjmlTemplate = await fs.readFile(templatePath, "utf8");

      const template = Handlebars.compile(mjmlTemplate);
      const mjmlWithData = template({
        logoUrl:
          "https://https://www.ecoagrocorral.com/web/image/964-3e9cbef4/logo%20ecoagrocorral.jpg.JPG",
        userName: user_name,
        restorePasswordUrl: `${process.env.URLFRONT}/user/restablecerPass/${emailToken}`,
      });

      const { html } = mjml2html(mjmlWithData);

      console.log("Email Data:", {
        to: user_email,
        subject: "Cambia tu contraseña",
      });

      await this.transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: user_email,
        subject: "Cambia tu contraseña",
        html,
      });
      console.log("Correo enviado correctamente a:", user_email);
      return true;
    } catch (error) {
      console.error("Error enviando email:", error);
      throw error;
    }
  }

  async sendReservationCancellationEmail(userData, reservationData) {
    try {
      const { user_name, user_email } = userData;
      const { hike_title, reservation_date } = reservationData;

      const __filename = fileURLToPath(import.meta.url);
      const __dirname = dirname(__filename);
      const templatePath = path.join(
        __dirname,
        "../email/cancelReservation.mjml"
      );

      const mjmlTemplate = await fs.readFile(templatePath, "utf8");

      const template = Handlebars.compile(mjmlTemplate);
      const mjmlWithData = template({
        logoUrl:
          "https://www.ecoagrocorral.com/web/image/964-3e9cbef4/logo%20ecoagrocorral.jpg.JPG",
        userName: user_name,
        hikeTitle: hike_title,
        reservationDate: `${reservation_date.slice(
          8,
          10
        )}/${reservation_date.slice(5, 7)}/${reservation_date.slice(0, 4)}`,
      });

      const { html } = mjml2html(mjmlWithData);

      console.log("Email Data:", {
        to: user_email,
        subject: "Reserva cancelada",
      });
      await this.transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: user_email,
        subject: "Reserva cancelada",
        html,
      });

      console.log("Correo enviado correctamente a:", user_email);
      return true;
    } catch (error) {
      console.error("Error enviando email:", error);
      throw error;
    }
  }

  async sendReservationConfirmationEmail(userData, reservationData) {
    try {
      const { user_name, user_email } = userData;
      const {
        hike_title,
        reservation_date,
        reservation_time,
        reservation_adult,
        reservation_children,
        reservation_total_price,
      } = reservationData;
  
      const __filename = fileURLToPath(import.meta.url);
      const __dirname = dirname(__filename);
      const templatePath = path.join(__dirname, "../email/reservationDone.mjml");
  
      const mjmlTemplate = await fs.readFile(templatePath, "utf8");
  
      const template = Handlebars.compile(mjmlTemplate);
      const mjmlWithData = template({
        logoUrl:
          "https://www.ecoagrocorral.com/web/image/964-3e9cbef4/logo%20ecoagrocorral.jpg.JPG",
        userName: user_name,
        hikeTitle: hike_title,
        reservationDate: `${reservation_date.slice(8, 10)}/${reservation_date.slice(
          5,
          7
        )}/${reservation_date.slice(0, 4)}`,
        reservationTime: reservation_time,
        adultCount: reservation_adult,
        childrenCount: reservation_children,
        totalPrice: `${reservation_total_price} €`,
      });
  
      const { html } = mjml2html(mjmlWithData);
  
      console.log("Email Data:", {
        to: user_email,
        subject: "Detalles de tu reserva",
      });
      await this.transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: user_email,
        subject: "Detalles de tu reserva",
        html,
      });
  
      console.log("Correo de confirmación enviado correctamente a:", user_email);
      return true;
    } catch (error) {
      console.error("Error enviando email de confirmación:", error);
      throw error;
    }
  }  
}

export default new EmailService();
