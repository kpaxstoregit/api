import { Body, Controller, Post } from '@nestjs/common';
import { CreateEmailSendDto } from './dto/create-email-send.dto';
import { EmailService } from './emailSend.service';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post('contact')
  async sendContactMessage(@Body() createEmailSendDto: CreateEmailSendDto) {
    const { from, subject, text, name } = createEmailSendDto;
    await this.emailService.sendContactEmail(from, subject, text, name);

    return { message: 'Email enviado com sucesso!' };
  }
}
