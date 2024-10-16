import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PasswordResetRepository {
  constructor(private readonly prismaService: PrismaService) {}

  create(createDto: Prisma.PasswordResetCreateArgs) {
    return this.prismaService.passwordReset.create(createDto);
  }

  findUnique(findUniqueDto: Prisma.PasswordResetFindUniqueArgs) {
    return this.prismaService.passwordReset.findUnique(findUniqueDto);
  }

  delete(deleteDto: Prisma.PasswordResetDeleteArgs) {
    return this.prismaService.passwordReset.delete(deleteDto);
  }
}
