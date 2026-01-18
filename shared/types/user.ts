import type { Base } from '@@/shared/types/base'

export type Role = 'ADMIN' | 'USER';

export type UserBase = Base & {
  email: string
  name: string
  gender?: string | null
  role: Role
  isBlocked: boolean
  isEmailVerified: boolean
}


export type CreateUser = {
  name: string,
  email: string
}

export type LoginUser = {
  email: string;
};

export type UpdateProfile = {
  name?: string;
  gender?: string | null;
};
