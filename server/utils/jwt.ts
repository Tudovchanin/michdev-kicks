
import jwt from 'jsonwebtoken';


export type MagicTokenPayload = { sub: number; iat: number; exp: number };

export function generateMagicToken(payload: { userId: number }): string {
  const config = useRuntimeConfig();
  const secret = config.jwtMagicTokenSecret;
  return jwt.sign(
    { sub: payload.userId },
    secret,
    { expiresIn: '5m' }
  );
}

export function verifyMagicToken(token: string):  MagicTokenPayload  {
  const config = useRuntimeConfig();
  return jwt.verify(token, config.jwtMagicTokenSecret) as  MagicTokenPayload; 
}