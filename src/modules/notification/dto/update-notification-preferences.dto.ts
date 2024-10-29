// src/notification-preferences/dto/update-notification-preferences.dto.ts

import { IsBoolean, IsIn, IsOptional } from 'class-validator';

export class UpdateNotificationPreferencesDto {
  @IsOptional()
  @IsBoolean()
  emailNotification?: boolean;

  @IsOptional()
  @IsBoolean()
  smsNotification?: boolean;

  @IsOptional()
  @IsIn(['Light', 'Dark'], {
    message: 'Theme must be either "Light" or "Dark"',
  })
  theme?: string;
}
