import { Injectable } from '@nestjs/common';
import * as sgMail from '@sendgrid/mail';
import { env } from 'src/shared/config/env';

@Injectable()
export class EmailService {
  constructor() {
    sgMail.setApiKey(env.sendGridApiKey);
  }

  async sendPasswordResetEmail(email: string, resetLink: string) {
    const msg = {
      to: email,
      from: env.sendGridEmailFrom,
      subject: 'Password Reset Request',
      html: `
        <h1>Password Reset</h1>
        <p>You requested a password reset. Click the link below to reset your password:</p>
        <a href="${resetLink}">Reset Password</a>
      `,
    };

    try {
      await sgMail.send(msg);
      console.log(`Password reset email sent to ${email}`);
    } catch (error) {
      console.error(`Error sending email: ${error.message}`);
      throw new Error('Failed to send password reset email');
    }
  }
}
