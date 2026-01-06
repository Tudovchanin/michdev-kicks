export type Role = 'ADMIN' | 'USER';

export type UserBase = {
  id: number;
  email: string;
  name: string;
  gender?: string | null;
  role: Role;
  isBlocked: boolean;
  isEmailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
};
