import { Body, Controller, Get, Param, Put, UseGuards } from '@nestjs/common';

import { AuthGuard } from 'src/modules/auth/auth.guard';
import { IsPublic } from 'src/shared/decorators/IsPublic';
import { UpdateNotificationPreferencesDto } from './dto/update-notification-preferences.dto';
import { NotificationPreferencesService } from './notification-preferences.service';

@Controller('notification-preferences')
@UseGuards(AuthGuard)
export class NotificationPreferencesController {
  constructor(
    private readonly preferencesService: NotificationPreferencesService,
  ) {}

  @Get(':userId')
  @IsPublic()
  async getPreferences(@Param('userId') userId: string) {
    return this.preferencesService.getPreferences(userId);
  }

  @Put(':userId')
  @IsPublic()
  async updatePreferences(
    @Param('userId') userId: string,
    @Body() updateDto: UpdateNotificationPreferencesDto,
  ) {
    return this.preferencesService.updatePreferences(userId, updateDto);
  }
}
