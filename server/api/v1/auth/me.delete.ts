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

  await authService.deleteSelf(session);

  clearSessionCookie(e);

  return {
    success: true,
    message: "Ваш аккаунт успешно удален"
  };
});
