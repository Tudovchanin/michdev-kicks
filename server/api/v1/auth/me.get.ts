
import { authService } from "~~/server/services";
import { clearSessionCookie } from "~~/server/utils/cookies";


export default defineEventHandler(async (e) => {

  const session = getCookie(e, 'session');

  if (!session) {
    throw createError({
      statusCode: 401,
      message: "Сессия не найдена",
    });
  }


  try {
    const result = await authService.getMe(session);


    return {
      user: result.user
    }

  } catch (error) {
    clearSessionCookie(e);

    throw error;
  }


})