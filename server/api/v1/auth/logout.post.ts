
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
   
    await authService.logout(session);
  } catch (error) {
    console.error("Ошибка при удалении сессии из БД:", error);
  } finally {
    clearSessionCookie(e);
  }

  return {
    success: true,
    message: "Вы вышли из аккаунта"
  };
});
