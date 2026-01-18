import SessionService from "./SessionService";
import UserService from "./UserService";
import { generateMagicToken, verifyMagicToken } from "../utils/jwt";
import type { IEmailProvider } from "./EmailService";
import type { CreateUser } from "~~/shared/types/user";


type AuthDependencies = {
  userService: UserService;
  emailProvider?: IEmailProvider;
  sessionService?: SessionService;
}

class AuthService {
  private userService: UserService;
  private emailProvider?: IEmailProvider;
  private sessionService?: SessionService;

  constructor(deps: AuthDependencies) {
    this.userService = deps.userService;
    this.emailProvider = deps.emailProvider;
    this.sessionService = deps.sessionService;

    if (!this.emailProvider) {
      console.warn(
        "[AuthService] EmailProvider не передан, методы, использующие email, не будут работать"
      );
    }
    if (!this.sessionService) {
      console.warn(
        "[AuthService] SessionService не передан, методы, использующие сессии, не будут работать"
      );
    }
  }

  async register(data: CreateUser) {
    
    if (!this.emailProvider) {
      console.error("[AuthService.register] EmailProvider не передан!");
      throw createError({
        statusCode: 500,
        message: "Не удалось отправить письмо",
      });
    }

    const userExisting = await this.userService.findByEmail(data.email);

    if ( userExisting?.isEmailVerified) {
      throw createError({
        statusCode: 409,
        message: "Пользователь с таким email уже существует",
      });
    }

    const user =  userExisting ? await this.userService.updateProfile( userExisting.id, { name: data.name })
    : await this.userService.createUser(data);


    try {
      const config = useRuntimeConfig();
      const magicToken = generateMagicToken({ userId: user.id });
      const magicLink = `${config.magicLink}?token=${magicToken}`;
  
      await this.emailProvider.sendMagicLink(user.email, magicLink);
    } catch (error) {
      console.error("[AuthService.register] Ошибка отправки письма:", error);
      throw createError({
        statusCode: 500,
        message: "Не удалось отправить письмо",
      });
    }

    return user;
  }

  async login() {}

  async verify(token: string) {}
}

export default AuthService;
