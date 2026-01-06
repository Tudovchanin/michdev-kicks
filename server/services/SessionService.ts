import { number } from "zod/v3";
import type { SessionRepository } from "../types/repositories";



class SessionService {
  constructor(private sessionRepository: SessionRepository) { }

  async getSession(id: number) {
    return this.sessionRepository.findById(id);
  }
  async deleteSession(id: number) {
    return this.sessionRepository.deleteSession(id);
  }
}