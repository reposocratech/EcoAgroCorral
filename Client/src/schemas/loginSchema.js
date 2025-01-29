import { z } from "zod";

export const loginSchema = z.object({
  user_email: z.string().email("El email no es válido"),
  user_password: z
    .string()
    .regex(/[A-Z]/, { message: "Debe incluir al menos una letra mayúscula" })
    .regex(/[a-z]/, { message: "Debe incluir al menos una letra minúscula" })
    .regex(/\d/, { message: "Debe incluir al menos un número" })
    .regex(/[@$!%*?&_-]/, {
      message: "Debe incluir al menos un carácter especial (@$!%*?&_-)",
    }),
});

export const recoverPassSchema = z.object({
  user_email: z.string().email("El email no es válido"),
});

export const newPassSchema = z.object({
  user_password: z
    .string()
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .regex(/[A-Z]/, { message: "Debe incluir al menos una letra mayúscula" })
    .regex(/[a-z]/, { message: "Debe incluir al menos una letra minúscula" })
    .regex(/\d/, { message: "Debe incluir al menos un número" })
    .regex(/[@$!%*?&_-]/, {
      message: "Debe incluir al menos un carácter especial (@$!%*?&_-)",
    }),
});
