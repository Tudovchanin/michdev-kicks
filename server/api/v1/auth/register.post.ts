
import { authService } from "~~/server/services";
import { validateBody } from "~~/server/utils/validate";
import { registerSchema } from "~~/server/validations/auth";

import type { CreateUser} from "~~/shared/types/user";


export default defineEventHandler(async (e) => {
  const body: CreateUser = await validateBody(registerSchema, e);

  await authService.register(body);

  return {
    success: true,
    message: "Письмо со ссылкой для входа отправлено на вашу почту",
    email: body.email
  };
});
