import type { CreateSession, SessionBase } from '@@/server/types/auth';

export type SessionRepository = {
  findById(id: string): Promise<SessionBase | null>;
  deleteSession(id: string): Promise<{ count: number }>;
}