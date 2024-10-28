import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class NotificationPreferencesRepository {
  constructor(private readonly prismaService: PrismaService) {}

  create(createDto: Prisma.NotificationPreferencesCreateArgs) {
    return this.prismaService.notificationPreferences.create(createDto);
  }

  findUnique(findUniqueDto: Prisma.NotificationPreferencesFindUniqueArgs) {
    return this.prismaService.notificationPreferences.findUnique(findUniqueDto);
  }

  update(updateDto: Prisma.NotificationPreferencesUpdateArgs) {
    return this.prismaService.notificationPreferences.update(updateDto);
  }

  upsert(upsertDto: Prisma.NotificationPreferencesUpsertArgs) {
    return this.prismaService.notificationPreferences.upsert(upsertDto);
  }
}
