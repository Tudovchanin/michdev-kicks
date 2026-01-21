import type { SessionRepository } from "../types/repositories";




class SessionService {
  
  constructor(private sessionRepository: SessionRepository) { }


  async createSession(userId: string) {
    // 7 дней
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    return this.sessionRepository.upsertSession({ userId, expiresAt });
   
  }

  async getSession(id: string) {
    return this.sessionRepository.findById(id);
  }

  async deleteSession(id: string) {
    return this.sessionRepository.deleteSession(id);
  }

  async deleteByUserId(userId:string) {
    return this.sessionRepository.deleteByUserId(userId);
  }

  async deleteAll(){
    return this.sessionRepository.deleteAll();
  }
}



export default SessionService;