import type { SessionBase } from "./auth";

export type SessionRepository = {
  findById(id: number): Promise<SessionBase | null>;
  deleteSession(id: number): Promise<{ count: number }>;

}