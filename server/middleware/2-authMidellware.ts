



export default defineEventHandler((e) => {

  const path = ('/') as string;


  
  const publicApi = [
    '/api/auth/login',
    '/api/auth/register',
  ]

  if (!path.startsWith('/api/') || publicApi.includes(path)) {
    console.log('public route');
    return;
  }

  // const sessionId = getCookie(e, 'sessionId')

  // try {
   

  // } catch (error) {
  //   throw createError({ statusCode: 401, message: "ошибка" });
  // }

})