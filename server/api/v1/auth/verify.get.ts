


import UserService from "~~/server/services/UserService";
import AuthService from "~~/server/services/AuthService";
import { NodemailerProvider } from "~~/server/services/EmailService";

import {
  prismaUserRepository,
} from "~~/server/repositories/prisma-repository";

import { validateBody } from "~~/server/utils/validate";
import { registerSchema } from "~~/server/validations/auth";

import type { CreateUser, UserBase } from "~~/shared/types/user";

const userService = new UserService(prismaUserRepository);
const nodemailerProvider = new NodemailerProvider();
const authService = new AuthService({
  userService,
  emailProvider: nodemailerProvider,
});

export default defineEventHandler(async (e) => {
  const { token } = getQuery(e);
});
