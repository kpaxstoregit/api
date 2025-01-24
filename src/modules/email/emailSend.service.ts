import { HttpException, Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { env } from 'src/shared/config/env';
import { EmailTemplatesService } from './entities/email.templates.service';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor(private emailTemplatesService: EmailTemplatesService) {
    this.transporter = nodemailer.createTransport({
      host: env.emailHost,
      port: env.emailPort,
      secure: false,
      auth: {
        user: env.emailUser,
        pass: env.emailPassword,
      },
      connectionTimeout: 5000,
    } as nodemailer.TransportOptions);
  }

  async sendContactEmail(
    from: string,
    subject: string,
    body: string,
    name: string,
  ): Promise<void> {
    const to = 'rafael.ddsociety@gmail.com';
    const html = this.emailTemplatesService.getContactFormTemplate({
      from,
      subject,
      body,
      name,
    });

    await this.transporter.sendMail({
      from,
      to,
      subject: `${subject}`,
      html,
    });
  }

  async sendPasswordResetEmail(to: string, resetLink: string): Promise<void> {
    const subject = 'Redefinição de senha';
    const name = to.split('@')[0];

    const html = this.emailTemplatesService.getResetPasswordTemplate({
      name,
      resetLink,
    });

    try {
      await this.transporter.sendMail({
        from: `"Kpax Store" <${env.emailUser}>`,
        to,
        subject,
        html,
      });
    } catch {
      throw new HttpException('Falha no envio do email', 500);
    }
  }
}
