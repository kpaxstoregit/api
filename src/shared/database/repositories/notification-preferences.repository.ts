import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class NotificationPreferencesRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createDto: Prisma.NotificationPreferencesCreateArgs) {
    return this.prismaService.notificationPreferences.create(createDto);
  }

  async findUniqueByUserId(userId: string) {
    if (!userId) {
      throw new BadRequestException('User ID is required');
    }
    return this.prismaService.notificationPreferences.findUnique({
      where: { userId },
    });
  }

  async update(
    userId: string,
    data: Prisma.NotificationPreferencesUpdateInput,
  ) {
    if (!userId) {
      throw new BadRequestException('User ID is required for updating');
    }
    return this.prismaService.notificationPreferences.update({
      where: { userId },
      data,
    });
  }

  async upsert(upsertDto: Prisma.NotificationPreferencesUpsertArgs) {
    return this.prismaService.notificationPreferences.upsert(upsertDto);
  }
}
