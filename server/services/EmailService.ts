import nodemailer from "nodemailer";

export interface IEmailProvider {
  sendMagicLink(to: string, link: string): Promise<void>;
}

export class NodemailerProvider implements IEmailProvider {
  
  private transporter: nodemailer.Transporter | null = null;

 
  private getTransporter() {
  
    if (this.transporter) {
      return this.transporter;
    }


    const config = useRuntimeConfig();
    
    this.transporter = nodemailer.createTransport({
      host: config.smtpHost,
      port: config.smtpPort,
      secure: true,
      auth: {
        user: config.smtpUser,
        pass: config.smtpPass,
      },
    });

    return this.transporter;
  }

  async sendMagicLink(to: string, link: string) {
    const config = useRuntimeConfig(); // Берем конфиг для отправителя (from)
    const transporter = this.getTransporter(); // Получаем готовый транспорт

    await transporter.sendMail({
      from: config.smtpUser,
      to,
      subject: "Ссылка для входа на сайт (Название магазина)",
      text: `Чтобы войти на сайт, перейдите по ссылке: ${link}`,
      html: `
        <div style="font-family: sans-serif; line-height: 1.5;">
          <h2>Добро пожаловать в наш магазин!</h2>
          <p>Чтобы войти в свой аккаунт, пожалуйста, перейдите по ссылке ниже:</p>
          <a href="${link}" style="display:inline-block; padding:10px 20px; background:#FF6B00; color:white; text-decoration:none; border-radius:5px;">Войти</a>
          <p>Ссылка действительна 5 минут.</p>
        </div>
      `,
      headers: {
        "Content-Language": "ru-RU"
      }
    });
  }
}
