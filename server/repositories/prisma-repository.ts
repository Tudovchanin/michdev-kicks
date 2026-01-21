import prisma from '@@/server/lib/prisma';
import type { SessionRepository, UserRepository, UpdateUserRepository } from '@@/server/types/repositories';
import type { CreateSession } from '@@/server/types/auth';
import type { CreateUser } from '~~/shared/types/user';



export const prismaSessionRepository: SessionRepository = {
  async upsertSession(data: CreateSession) {
    const { userId, expiresAt } = data
    return await prisma.session.upsert({
      where: { userId },
      update: { expiresAt },
      create: { userId, expiresAt },
    });
  },

  async findById(id: string) {
    const session = await prisma.session.findUnique({
      where: { id }
    });


    if (!session || session.expiresAt < new Date()) {
      return null;
    }

    return session;
  },

  async deleteSession(id: string) {
    const result = await prisma.session.deleteMany({ where: { id } });

    return result.count > 0;
  },

  async deleteByUserId(userId: string) {
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

  async findById(id: string) {
    return await prisma.user.findFirst({
      where: {
        id,
        deletedAt: null
      }
    });
  },

  async findByEmail(email: string) {
    return await prisma.user.findFirst({
      where: {
        email,
        deletedAt: null
      }
    });
  },

  async updateById(
    id: string,
    data: UpdateUserRepository
  ) {
    try {
      return await prisma.user.update({ where: { id }, data });
    } catch (e: unknown) {
      if (typeof e === 'object' && e !== null && 'code' in e && e.code === 'P2025') {
        return null;
      }
      throw e;
    }
  },

  async deleteById(id: string) {
    // $transaction возвращает массив результатов в том же порядке: [результат1, результат2]
    const results = await prisma.$transaction([
      
      prisma.user.updateMany({ 
         where: { id, deletedAt: null },
         data: { 
          deletedAt: new Date(),
          isBlocked: true,
          email: `deleted_${id}@deleted.com` 
          } 
      }),
     
      prisma.session.deleteMany({ 
         where: { userId: id } 
      })
    ]);
    return results[0].count > 0;
  },
};