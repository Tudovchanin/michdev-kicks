import type { CreateSession, SessionBase } from '@@/server/types/auth';
import type { UserBase, CreateUser } from '~~/shared/types/user';

export type SessionRepository = {
  createSession(data: CreateSession): Promise<SessionBase>;
  findById(id: string): Promise<SessionBase | null>;
  deleteSession(id: string): Promise<{ count: number }>;
  deleteByUserId(userId: number): Promise<{ count: number }>;
  deleteAll(): Promise<{ count: number }>;
}


export type UserRepository = {
  findById(id: number): Promise<UserBase | null>;
  createUser(data: CreateUser): Promise<UserBase>;
  findByEmail(email: string): Promise<UserBase | null>;
  updateById(id: number, data: Partial<UserBase>): Promise<UserBase>

  deleteById(id: number): Promise<{ count: number }>;
  deleteByEmail(email:string): Promise<{ count: number }>;
}

export type UpdateUserRepository =
  Partial<Omit<UserBase, 'id' | 'createdAt' | 'updatedAt'>>
