
import type { H3Event } from 'h3';


export function clearSessionCookie(e: H3Event) {
  const isProd = process.env.NODE_ENV === 'production';

  setCookie(e, 'session', '', {
    httpOnly: true,
    secure: isProd,
    sameSite: 'lax',
    path: '/',
    expires: new Date(0),
    maxAge: 0 
  });
}

export function setSessionCookie(e: H3Event, token: string, expiresAt: Date) {
  const isProd = process.env.NODE_ENV === 'production';

  setCookie(e, 'session', token, {
    httpOnly: true,
    secure: isProd,
    sameSite: 'lax',
    path: '/',
    expires: expiresAt
  });
}
