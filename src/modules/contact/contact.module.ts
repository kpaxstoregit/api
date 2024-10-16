import { Module } from '@nestjs/common';
import { PrismaService } from 'src/shared/database/prisma.service'; // Ajuste o caminho conforme necessário
import { ContactRepository } from 'src/shared/database/repositories/contact.repository';
import { ContactController } from './contact.controller';
import { ContactService } from './contact.service';

@Module({
  providers: [ContactService, ContactRepository, PrismaService],
  controllers: [ContactController],
})
export class ContactModule {}
