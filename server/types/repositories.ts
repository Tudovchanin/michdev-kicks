import type { CreateSession, SessionBase } from '@@/server/types/auth';
import type { UserBase, CreateUser } from '~~/shared/types/user';

export type SessionRepository = {
  upsertSession(data: CreateSession): Promise<SessionBase>;
  findById(id: string): Promise<SessionBase | null>;
  deleteSession(id: string): Promise<boolean>;
  deleteByUserId(userId: string): Promise<{ count: number }>;
  deleteAll(): Promise<{ count: number }>;
}


export type UserRepository = {
  findById(id: string): Promise<UserBase | null>;
  createUser(data: CreateUser): Promise<UserBase>;
  findByEmail(email: string): Promise<UserBase | null>;
  updateById(id: string, data: Partial<UserBase>): Promise<UserBase | null>
  deleteById(id: string): Promise<boolean>;
}

export type UpdateUserRepository =
  Partial<Omit<UserBase, 'id' | 'createdAt' | 'updatedAt'>>
