import type { Base } from "~~/shared/types/base"

export type SessionBase = Base<string> & {
  userId: string;
  expiresAt: Date;
}

export type CreateSession = {
  userId:string;
  expiresAt: Date;
}
