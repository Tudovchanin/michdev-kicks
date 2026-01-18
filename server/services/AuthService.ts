import SessionService from "./SessionService";
import UserService from "./UserService";
import { generateMagicToken, verifyMagicToken } from "../utils/jwt";
import type { IEmailProvider } from "./EmailService";
import type { CreateUser } from "~~/shared/types/user";


type AuthDependencies = {
  userService: UserService;
  emailProvider?: IEmailProvider;
  sessionService?: SessionService;
};

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

  private async sendLoginLink({ userId, email }: { userId: number; email: string }) {
    if (!this.emailProvider) {
      console.error("[AuthService.register] EmailProvider не передан!");
      throw createError({
        statusCode: 500,
        message: "Не удалось отправить письмо",
      });
    }
    try {
      const config = useRuntimeConfig();
      const magicToken = generateMagicToken({ userId });
      const magicLink = `${config.magicLink}?token=${magicToken}`;

      await this.emailProvider.sendMagicLink(email, magicLink);
    } catch (error) {
      console.error("[AuthService.register] Ошибка отправки письма:", error);
      throw createError({
        statusCode: 500,
        message: "Не удалось отправить письмо",
      });
    }
  }

  async register(data: CreateUser) {
 
    const userExisting = await this.userService.findByEmail(data.email);

    if (userExisting?.isEmailVerified) {
      throw createError({
        statusCode: 409,
        message: "Пользователь с таким email уже существует",
      });
    }

    const user = userExisting
      ? await this.userService.updateProfile(userExisting.id, {
          name: data.name,
        })
      : await this.userService.createUser(data);

    await this.sendLoginLink({ userId: user.id, email: user.email });

    return user;
  }

  async login(email: string) {
    const userExisting = await this.userService.findByEmail(email);

    if (!userExisting) {
      console.warn(
        `[AuthService.login] Попытка входа на незарегистрированный email: ${email}`
      );
      return;
    }

    await this.sendLoginLink({
      userId: userExisting.id,
      email: userExisting.email,
    });
  }

  async resendVerification(email: string) {
    
    const user = await this.userService.findByEmail(email);

    if (!user) {
      console.warn(`[AuthService.resend] Попытка повтора для: ${email}`);
      return;
    }

    await this.sendLoginLink({ userId: user.id, email: user.email });
  }

  async verify(token: string) {

      const payload = verifyMagicToken(token);
  }
}

export default AuthService;
