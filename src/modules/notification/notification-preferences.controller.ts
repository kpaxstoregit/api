// src/notification-preferences/notification-preferences.controller.ts

import { Body, Controller, Get, Patch } from '@nestjs/common';
import { ActiveUserId } from 'src/shared/decorators/ActiveUserId';
import { UpdateNotificationPreferencesDto } from './dto/update-notification-preferences.dto';
import { NotificationPreferencesService } from './notification-preferences.service';

@Controller('notification-preferences')
export class NotificationPreferencesController {
  constructor(
    private readonly preferencesService: NotificationPreferencesService,
  ) {}

  @Get()
  async getUserPreferences(@ActiveUserId() userId: string) {
    return this.preferencesService.getUserPreferences(userId);
  }

  // Atualiza notificação por e-mail
  @Patch('email-notification')
  async updateEmailNotification(
    @ActiveUserId() userId: string,
    @Body() { emailNotification }: UpdateNotificationPreferencesDto,
  ) {
    return this.preferencesService.updateEmailNotification(
      userId,
      emailNotification,
    );
  }

  // Atualiza notificação por SMS
  @Patch('sms-notification')
  async updateSmsNotification(
    @ActiveUserId() userId: string,
    @Body() { smsNotification }: UpdateNotificationPreferencesDto,
  ) {
    return this.preferencesService.updateSmsNotification(
      userId,
      smsNotification,
    );
  }

  // Atualiza o tema
  @Patch('theme')
  async updateTheme(
    @ActiveUserId() userId: string,
    @Body() { theme }: UpdateNotificationPreferencesDto,
  ) {
    return this.preferencesService.updateTheme(userId, theme);
  }
}
