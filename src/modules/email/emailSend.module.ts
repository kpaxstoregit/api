import { Module } from '@nestjs/common';

import { EmailController } from './emailSend.controller';
import { EmailService } from './emailSend.service';
import { EmailTemplatesService } from './entities/email.templates.service';

@Module({
  controllers: [EmailController],
  exports: [EmailService],
  providers: [EmailService, EmailTemplatesService],
})
export class EmailSendModule {}
