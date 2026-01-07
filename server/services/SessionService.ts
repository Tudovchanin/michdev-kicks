import { number } from "zod/v3";
import type { SessionRepository } from "../types/repositories";



class SessionService {
  constructor(private sessionRepository: SessionRepository) { }


  async createSession(userId:number) {

    // return this.sessionRepository.createSession(){

    // }

  }

  async getSession(id: string) {
    return this.sessionRepository.findById(id);
  }
  async deleteSession(id: string) {
    return this.sessionRepository.deleteSession(id);
  }
}