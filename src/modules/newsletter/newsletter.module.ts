import { Module } from '@nestjs/common';
import { PrismaService } from 'src/shared/database/prisma.service';

import { NewsletterRepository } from 'src/shared/database/repositories/newsletter.repositories';
import { NewsletterController } from './newsletter.controller';
import { NewsletterService } from './newsletter.service';

@Module({
  providers: [NewsletterService, NewsletterRepository, PrismaService],
  controllers: [NewsletterController],
})
export class NewsletterModule {}
