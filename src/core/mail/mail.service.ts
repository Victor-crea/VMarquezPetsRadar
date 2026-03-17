import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);
  private transporter: nodemailer.Transporter;

  constructor(private readonly config: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.config.get<string>('SMTP_HOST'),
      port: this.config.get<number>('SMTP_PORT', 587),
      secure: false,
      auth: {
        user: this.config.get<string>('SMTP_USER'),
        pass: this.config.get<string>('SMTP_PASS'),
      },
    });
  }

  async sendMail(params: {
    to: string;
    subject: string;
    html: string;
  }): Promise<void> {
    const from = this.config.get<string>('MAIL_FROM', 'PetRadar <no-reply@local>');
    try {
      await this.transporter.sendMail({ from, ...params });
    } catch (err) {
      this.logger.error('Error enviando correo', err as Error);
      throw err;
    }
  }
}

