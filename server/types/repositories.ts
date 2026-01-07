import type { CreateSession, SessionBase } from '@@/server/types/auth';

export type SessionRepository = {
  createSession(data:CreateSession):Promise<SessionBase>;
  findById(id: string): Promise<SessionBase | null>;
  deleteSession(id: string): Promise<{ count: number }>;
  deleteByUserId(userId: number): Promise<{ count: number }>;
  deleteAll(): Promise<{ count: number }>;
}