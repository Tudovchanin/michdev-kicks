



export default defineEventHandler((e) => {

  const path = e.path

  const publicApi = [
    '/api/auth/login',
    '/api/auth/register',
  ]

  if (!path.startsWith('/api/') || publicApi.includes(path)) {
    return
  }

  const sessionId = getCookie(e, 'sessionId')

  try {
   

  } catch (error) {
    throw createError({ statusCode: 401, message: "ошибка" });
  }

})