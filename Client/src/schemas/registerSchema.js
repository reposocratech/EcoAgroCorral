import { z } from "zod";

export const registerSchema = z
  .object({
    user_name: z.string().nonempty("El nombre es obligatorio"),

    user_lastname: z.string().nonempty("El apellido es obligatorio"),

    user_birthdate: z
      .string()
      .regex(
        /^\d{4}-\d{2}-\d{2}$/,
        "La fecha de nacimiento debe tener el formato AAAA-MM-DD"
      )
      .refine((birthdate) => {
        const [year, month, day] = birthdate.split("-");
        const birthDate = new Date(year, month - 1, day);
        const today = new Date();

        if (isNaN(birthDate.getTime())) {
          return false;
        }

        let age = today.getFullYear() - birthDate.getFullYear();

        const isBirthdayLaterInYear =
          today.getMonth() < birthDate.getMonth() ||
          (today.getMonth() === birthDate.getMonth() &&
            today.getDate() < birthDate.getDate());

        if (isBirthdayLaterInYear) {
          age--;
        }

        return age >= 18;
      }, "Debes ser mayor de edad para registrarte"),

    user_email: z.string().email("Debes proporcionar un email válido"),
    user_address: z.string().nonempty("La dirección es obligatoria"),
    user_phone: z
      .string()
      .regex(
        /^\+?\d{1,15}$/,
        "El número de teléfono debe contener solo números y el prefijo opcional (+)"
      ),
    user_dni: z.string().nonempty("El DNI es obligatorio"),
    user_password: z
      .string()
      .min(8, "La contraseña debe tener al menos 8 caracteres")
      .regex(/[A-Z]/, { message: "Debe incluir al menos una letra mayúscula" })
      .regex(/[a-z]/, { message: "Debe incluir al menos una letra minúscula" })
      .regex(/\d/, { message: "Debe incluir al menos un número" })
      .regex(/[@$!%*?&_-]/, {
        message: "Debe incluir al menos un carácter especial, un número, una mayúscula y una minúscula",
      }),
    repPassword: z.string(),
  })
  .refine((data) => data.user_password === data.repPassword, {
    message: "Las contraseñas no coinciden",
    path: ["repPassword"],
  });
