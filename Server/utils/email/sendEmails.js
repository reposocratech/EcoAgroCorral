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

    this.transporter.verify((error, success) => {
      if (error) {
        console.error("SMTP Config Error:", error);
      } else {
        console.log("SMTP Ready:", success);
      }
    });
  }

  async sendRegistrationEmail(userData, emailToken) {
    try {
      const { user_name, user_email } = userData;

      const __filename = fileURLToPath(import.meta.url);
      const __dirname = dirname(__filename);
      const templatePath = path.join(__dirname, "../email/verificationEmail.mjml");

      const mjmlTemplate = await fs.readFile(templatePath, "utf8");

      const template = Handlebars.compile(mjmlTemplate);
      const mjmlWithData = template({
        logoUrl: "https://https://www.ecoagrocorral.com/web/image/964-3e9cbef4/logo%20ecoagrocorral.jpg.JPG",
        userName: user_name,
        verificationUrl: `${process.env.URLFRONT}/confirmarEmail/${emailToken}`,
      });

      const { html } = mjml2html(mjmlWithData);

      console.log("Email Data:", { to: user_email, subject: "Verifica tu cuenta" });
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
}

export default new EmailService();

/*       const __filename = fileURLToPath(import.meta.url);
      const __dirname = dirname(__filename);
      const templatePath = path.join(__dirname, "../email/verificationEmail.mjml");
      const mjmlTemplate = await fs.readFile(templatePath, "utf8");

      const template = Handlebars.compile(mjmlTemplate);
      const mjmlWithData = template({
        logoUrl: "https://https://www.ecoagrocorral.com/web/image/964-3e9cbef4/logo%20ecoagrocorral.jpg.JPG",
        userName: user_name,
        verificationUrl: `${process.env.URLFRONT}/confirmarEmail/${emailToken}`,
      });

      const { html } = mjml2html(mjmlWithData);

      await this.transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: user_email,
        subject: "Verifica tu cuenta",
        html,
      });

    } catch (error) {
      console.error("Error enviando email:", error);
    }
  }
} */
