import type { Base } from "~~/shared/types/base"

export type SessionBase = Base & {
  userId: number
  expiresAt: Date
}
