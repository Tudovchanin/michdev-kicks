
import { authService } from "~~/server/services";
import { setSessionCookie } from "~~/server/utils/cookies";
import { validateQuery } from "~~/server/utils/validate";
import { tokenQuerySchema } from "~~/server/validations/auth";


export default defineEventHandler(async (e) => {
  
  const query = validateQuery(tokenQuerySchema, e);
  const token = query.token;


  const result = await authService.verify(token);
  if (!result || !result.session || !result.user) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Ссылка недействительна'
    });
  }


  setSessionCookie(e, result.session.id, result.session.expiresAt);

  return {
    user: result.user
  };
  
});
