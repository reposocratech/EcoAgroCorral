import { z } from "zod";

export const registerSchema = z.object({
  user_email: z.string().email("El email no es válido"),
  user_password: z
    .string()
    .regex(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{6,}$/,
      "Contraseña no válida"
    ),
  user_phone: z
    .string()
    .regex(
      /^\+?[0-9]{1,3} ?([0-9]{2,3} ?){3,4}$/,
      "El teléfono debe tener un formato válido, por ejemplo: +34 611111111"
    ),
});

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