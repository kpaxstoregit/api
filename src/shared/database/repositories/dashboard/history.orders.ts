import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma.service';

@Injectable()
export class HistoryOrdersRepository {
  constructor(private readonly prismaService: PrismaService) {}

  create(createDto: Prisma.HistoryOrderCreateInput) {
    return this.prismaService.historyOrder.create({
      data: createDto,
    });
  }

  async findAll(findAllDto: Prisma.HistoryOrderFindManyArgs) {
    return this.prismaService.historyOrder.findMany(findAllDto);
  }
}
