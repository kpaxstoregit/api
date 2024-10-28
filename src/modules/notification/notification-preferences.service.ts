import { Injectable } from '@nestjs/common';
import { NotificationPreferencesRepository } from 'src/shared/database/repositories/notification-preferences.repository';
import { UpdateNotificationPreferencesDto } from './dto/update-notification-preferences.dto';

@Injectable()
export class NotificationPreferencesService {
  constructor(
    private readonly preferencesRepository: NotificationPreferencesRepository,
  ) {}

  async getPreferences(userId: string) {
    const preferences = await this.preferencesRepository.upsert({
      where: { userId },
      update: {},
      create: {
        userId,
        emailNotification: false,
        smsNotification: false,
        lightMode: false,
      },
    });
    return preferences;
  }

  async updatePreferences(
    userId: string,
    updateDto: UpdateNotificationPreferencesDto,
  ) {
    return this.preferencesRepository.upsert({
      where: { userId },
      update: updateDto,
      create: { userId, ...updateDto },
    });
  }
}
