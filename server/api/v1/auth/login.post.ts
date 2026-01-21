
import { authService } from "~~/server/services";
import { validateBody } from "~~/server/utils/validate";
import { loginSchema } from "~~/server/validations/auth";

import type { LoginUser } from "~~/shared/types/user";



export default defineEventHandler(async (e) => {

  const body: LoginUser = await validateBody(loginSchema, e);

  await authService.login(body.email);
  
  return {
    success: true,
    message: "Ссылка для входа отправлена на ваш email"
  }
})