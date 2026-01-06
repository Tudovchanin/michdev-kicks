export default defineEventHandler((e) => {
  const method = e.method;

  // GET и DELETE не имеют body → просто пропускаем
  if (method === "GET" || method === "DELETE") {
    return;
  }
  
  const MAX_SIZE = 50 * 1024; // 50 KB
  const contentLengthHeader = getRequestHeader(e, "content-length");
  const contentLength = Number(contentLengthHeader || 0);

  console.log(contentLength, 'contentLength');
  

  if (!contentLengthHeader) {
    throw createError({
      statusCode: 400,
      statusMessage: "Content-Length header missing"
    });
  }

  if (contentLength > MAX_SIZE) {
    throw createError({
      statusCode: 413,
      statusMessage: "Payload too large"
    });
  }

});
