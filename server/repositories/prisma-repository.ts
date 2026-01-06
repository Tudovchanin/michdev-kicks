import prisma from '@@/server/lib/prisma';
import type {SessionRepository} from '../types/repositories';



export const prismaSessionRepository: SessionRepository = {
  async findById(id: number) {
    return prisma.session.findUnique({ where: { id } });
  },

  async deleteSession(id:number) {
    return prisma.session.deleteMany({ where: { id } }); 
  },
};