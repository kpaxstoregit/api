// src/modules/notification/notification-preferences.module.ts
import { Module } from '@nestjs/common';
import { PrismaService } from 'src/shared/database/prisma.service';
import { NotificationPreferencesRepository } from 'src/shared/database/repositories/notification-preferences.repository';
import { AuthModule } from '../auth/auth.module'; // Importe o AuthModule
import { NotificationPreferencesController } from './notification-preferences.controller';
import { NotificationPreferencesService } from './notification-preferences.service';

@Module({
  imports: [AuthModule], // Adicione AuthModule aqui
  controllers: [NotificationPreferencesController],
  providers: [
    NotificationPreferencesService,
    NotificationPreferencesRepository,
    PrismaService,
  ],
})
export class NotificationPreferencesModule {}
