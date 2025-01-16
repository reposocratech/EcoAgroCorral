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
        const birthDate = new Date(birthdate);
        const today = new Date();
        const age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
          return age - 1 >= 18;
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
      .regex(
        /(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])/,
        "La contraseña debe incluir al menos una mayúscula, una minúscula, un número y un carácter especial"
      ),
    repPassword: z.string(),
  })
  .refine((data) => data.user_password === data.repPassword, {
    message: "Las contraseñas no coinciden",
    path: ["repPassword"]
  });
