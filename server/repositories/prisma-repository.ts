import prisma from '@@/server/lib/prisma';
import type { SessionRepository, UserRepository, UpdateUserRepository } from '@@/server/types/repositories';
import type { CreateSession } from '@@/server/types/auth';
import type { UserBase, CreateUser } from '~~/shared/types/user';



export const prismaSessionRepository: SessionRepository = {

  async createSession(data: CreateSession) {
    return await prisma.session.create({ data });
  },

  async findById(id: string) {
    return prisma.session.findUnique({ where: { id } });
  },

  async deleteSession(id: string) {
    return prisma.session.deleteMany({ where: { id } });
  },

  async deleteByUserId(userId: number) {
    return prisma.session.deleteMany({ where: { userId } });
  },

  async deleteAll() {
    return prisma.session.deleteMany();
  }
};



export const prismaUserRepository: UserRepository = {

  async createUser(data: CreateUser) {
    return await prisma.user.create({ data })
  },

  async findById(id: number) {
    return await prisma.user.findUnique({ where: { id } });
  },

  async findByEmail(email: string) {
    return await prisma.user.findUnique({ where: { email } });
  },

  async updateById(
    id: number,
    data: UpdateUserRepository
  ) {
    return prisma.user.update({
      where: { id },
      data
    });
  },
  
  deleteById(id: number) {
    return prisma.user.deleteMany({ where: { id } });
  },
  
  deleteByEmail(email:string) {
    return prisma.user.deleteMany({ where: { email } });
  }
};