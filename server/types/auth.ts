import type { Base } from "~~/shared/types/base"

export type SessionBase = Base<string> & {
  userId: number
  expiresAt: Date
}

export type CreateSession = {
  id:string,
  userId:number,
  expiresAt: Date
}