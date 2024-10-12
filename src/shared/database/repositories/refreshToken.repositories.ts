import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class RefreshTokenRepository {
  constructor(private readonly prismaService: PrismaService) {}

  create(createDto: Prisma.RefreshTokenCreateArgs) {
    return this.prismaService.refreshToken.create(createDto);
  }

  findFirst(findFirstDto: Prisma.RefreshTokenFindFirstArgs) {
    return this.prismaService.refreshToken.findFirst(findFirstDto);
  }

  update(updateDto: Prisma.RefreshTokenUpdateArgs) {
    return this.prismaService.refreshToken.update(updateDto);
  }

  delete(deleteDto: Prisma.RefreshTokenWhereUniqueInput) {
    return this.prismaService.refreshToken.delete({
      where: deleteDto,
    });
  }
}
