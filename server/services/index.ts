import UserService from "~~/server/services/UserService";
import AuthService from "~~/server/services/AuthService";
import { NodemailerProvider } from "~~/server/services/EmailService";

import {
  prismaUserRepository, prismaSessionRepository
} from "~~/server/repositories/prisma-repository";
import SessionService from "./SessionService";


const nodemailerProvider = new NodemailerProvider();

export const userService = new UserService(prismaUserRepository);
const sessionService = new SessionService(prismaSessionRepository);

export const authService = new AuthService({
  userService,
  emailProvider: nodemailerProvider,
  sessionService
});