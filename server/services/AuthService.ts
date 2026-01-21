import type SessionService from "./SessionService";
import type UserService from "./UserService";
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

  private async sendLoginLink({
    userId,
    email,
  }: {
    userId: string;
    email: string;
  }) {
    if (!this.emailProvider) {
      console.error("[AuthService.sendLoginLink] EmailProvider не передан!");
      throw createError({
        statusCode: 500,
        statusMessage: "Internal Server Error",
        message: "Не удалось отправить письмо",
      });
    }
    try {
      const config = useRuntimeConfig();
      const magicToken = generateMagicToken({ userId });
      const magicLink = `${config.magicLink}?token=${magicToken}`;

      await this.emailProvider.sendMagicLink(email, magicLink);
    } catch (error) {
      console.error("[AuthService.sendLoginLink] Ошибка отправки письма:", error);
      throw createError({
        statusCode: 500,
        statusMessage: "Internal Server Error",
        message: "Не удалось отправить письмо",
      });
    }
  }

  async register(data: CreateUser) {
    const userExisting = await this.userService.findByEmail(data.email);

    if (userExisting?.isEmailVerified) {
      throw createError({
        statusCode: 409,
        statusMessage: "Conflict",
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
      throw createError({
        statusCode: 404,
        statusMessage: "Not Found",
        message: 'Пользователь не зарегистрирован. Перейдите на страницу регистрации.'
      });
    }

    await this.sendLoginLink({
      userId: userExisting.id,
      email: userExisting.email,
    });
  }

  async logout(session: string) {
    if (!this.sessionService) {
      console.error("[AuthService.logout] SessionProvider не передан!");
      throw createError({
        statusCode: 500,
        statusMessage: "Internal Server Error",
        message: "Ошибка на стороне сервера",
      });
    }
    const result = await this.sessionService.deleteSession(session);
    return result ;
  }

  async resendVerification(email: string) {
    const user = await this.userService.findByEmail(email);

    if (!user) {
      console.warn(`[AuthService.resendVerification] Попытка повтора для: ${email}`);
      return;
    }

    await this.sendLoginLink({ userId: user.id, email: user.email });
  }

  async verify(token: string) {
    if (!this.sessionService) {
      console.error("[AuthService.verify] SessionProvider не передан!");
      throw createError({
        statusCode: 500,
        statusMessage: "Internal Server Error",
        message: "Не удалось пройти верификацию",
      });
    }

    try {
      const payload = verifyMagicToken(token);
      const user = await this.userService.findById(payload.sub);
      if (!user) {
        throw createError({
          statusCode: 401,
          statusMessage: "Unauthorized",
          message: "Пользователь не найден",
        });
      };

      if (!user.isEmailVerified) {
        await this.userService.verifyEmail(user.id);
      }
      const session = await this.sessionService.createSession(user.id);

      return {
        session,
        user,
      };
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      console.error("[AuthService.verify] Ошибка:", errorMessage);
      throw createError({
        statusCode: 401,
        statusMessage: "Unauthorized",
        message: "Ссылка просрочена или недействительна",
      });
    }
  }

  async getMe(session: string) {
    if (!this.sessionService) {
      console.error("[AuthService.getMe] SessionProvider не передан!");
      throw createError({
        statusCode: 500,
        statusMessage: "Internal Server Error",
        message: "Ошибка на стороне сервера",
      });
    }

    const sessionData  = await this.sessionService.getSession(session);

    if (!sessionData ) {
      throw createError({
        statusCode: 401,
        statusMessage: "Unauthorized",
        message: "Пожалуйста, войдите в аккаунт",
      });
    }

    const user = await this.userService.findById(sessionData .userId);
    if (!user) {
      throw createError({
        statusCode: 401,
        statusMessage: "Unauthorized",
        message: "Пожалуйста, войдите в аккаунт",
      });
    }

    return {
      user
    }

  }

  async deleteSelf(session:string) {
    if (!this.sessionService) {
      console.error("[AuthService.deleteSelf] SessionProvider не передан!");
      throw createError({
        statusCode: 500,
        statusMessage: "Internal Server Error",
        message: "Ошибка на стороне сервера",
      });
    }
    const sessionData  = await this.sessionService.getSession(session);
    if (!sessionData ) {
      throw createError({
        statusCode: 401,
        statusMessage: "Unauthorized",
        message: "Пожалуйста, войдите в аккаунт",
      });
    }

    const result = await this.userService.deleteById(sessionData.userId);


    return result;
  }
}

export default AuthService;
