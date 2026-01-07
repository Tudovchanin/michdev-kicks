import { randomBytes } from 'node:crypto';
import type { SessionRepository } from "../types/repositories";
import type { CreateSession } from '@@/server/types/auth';




class SessionService {
  constructor(private sessionRepository: SessionRepository) { }


  async createSession(userId: number) {
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    const id = randomBytes(32).toString('hex');
    const data: CreateSession = {
      id,
      userId, expiresAt
    }
    await this.deleteByUserId(userId);
    return this.sessionRepository.createSession(data);
  }

  async getSession(id: string) {
    return this.sessionRepository.findById(id);
  }
  async deleteSession(id: string) {
    return this.sessionRepository.deleteSession(id);
  }
  async deleteByUserId(userId:number) {
    return this.sessionRepository.deleteByUserId(userId);
  }
  async deleteAll(){
    return this.sessionRepository.deleteAll();
  }
}



export default SessionService;