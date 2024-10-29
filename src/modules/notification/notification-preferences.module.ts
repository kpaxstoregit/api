// src/modules/notification/notification-preferences.module.ts

import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/shared/database/database.module';
import { NotificationPreferencesController } from './notification-preferences.controller';
import { NotificationPreferencesService } from './notification-preferences.service';

@Module({
  imports: [DatabaseModule], // Importa DatabaseModule para acesso ao NotificationPreferencesRepository
  controllers: [NotificationPreferencesController],
  providers: [NotificationPreferencesService], // Certifique-se de incluir NotificationPreferencesService aqui
  exports: [NotificationPreferencesService], // Exporte se for necessário em outros módulos
})
export class NotificationPreferencesModule {}
