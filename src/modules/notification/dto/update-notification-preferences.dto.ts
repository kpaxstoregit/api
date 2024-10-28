import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateNotificationPreferencesDto {
  @IsOptional()
  @IsBoolean()
  emailNotification?: boolean;

  @IsOptional()
  @IsBoolean()
  smsNotification?: boolean;

  @IsOptional()
  @IsBoolean()
  lightMode?: boolean;
}
