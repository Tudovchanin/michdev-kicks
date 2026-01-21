
import { z } from "zod";


// Схема логина
export const loginSchema = z.object({
  email: z.string().trim().pipe(z.email()),
});

// Схема регистрации
export const registerSchema = z.object({
  name: z.string().trim().min(2).max(50),
  email: z.string().trim().pipe(z.email()),//  pipe потому что не метод строки
});

// ТОКЕН MAGIC LINK
export const tokenQuerySchema = z.object({
  token: z.string().min(1)
});