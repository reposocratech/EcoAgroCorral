import { z } from "zod";

export const loginSchema = z.object({
  user_email: z.string().email("El email no es válido"),
  user_password: z
    .string()
    .regex(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{6,}$/,
      "Contraseña no válida"
    ),
});

export const recoverPassSchema = z.object({
  user_email: z.string().email("El email no es válido"),
});

export const newPassSchema = z.object({
  user_password: z
    .string()
    .regex(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{6,}$/,
      "Contraseña no válida"
    ),
});