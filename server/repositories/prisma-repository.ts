import prisma from '@@/server/lib/prisma';
import type {SessionRepository} from '@@/server/types/repositories';
import type { CreateSession } from '@@/server/types/auth';


export const prismaSessionRepository: SessionRepository = {


  async createSession(data:CreateSession){
    return await prisma.session.create({data});
  },

  async findById(id: string) {
    return prisma.session.findUnique({ where: { id } });
  },

  async deleteSession(id:string) {
    return prisma.session.deleteMany({ where: { id } }); 
  },

  async deleteByUserId(userId: number) {
    return prisma.session.deleteMany({ where: { userId } });
  },

  async deleteAll() {
    return prisma.session.deleteMany();
  }
};