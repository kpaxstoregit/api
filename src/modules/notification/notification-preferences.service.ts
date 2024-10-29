// src/notification-preferences/notification-preferences.service.ts

import { BadRequestException, Injectable } from '@nestjs/common';
import { NotificationPreferencesRepository } from 'src/shared/database/repositories/notification-preferences.repository';

@Injectable()
export class NotificationPreferencesService {
  constructor(
    private readonly preferencesRepository: NotificationPreferencesRepository,
  ) {}

  async getUserPreferences(userId: string) {
    const preferences = await this.preferencesRepository.upsert({
      where: { userId },
      create: {
        userId,
        emailNotification: false,
        smsNotification: false,
        theme: 'Light',
      },
      update: {},
    });

    return preferences;
  }

  async updateEmailNotification(userId: string, emailNotification: boolean) {
    if (emailNotification === undefined) {
      throw new BadRequestException('Email notification status is required');
    }
    return this.preferencesRepository.update(userId, { emailNotification });
  }

  async updateSmsNotification(userId: string, smsNotification: boolean) {
    if (smsNotification === undefined) {
      throw new BadRequestException('SMS notification status is required');
    }
    return this.preferencesRepository.update(userId, { smsNotification });
  }

  async updateTheme(userId: string, theme: string) {
    if (theme !== 'Light' && theme !== 'Dark') {
      throw new BadRequestException('Theme must be either "Light" or "Dark"');
    }
    return this.preferencesRepository.update(userId, { theme });
  }
}
