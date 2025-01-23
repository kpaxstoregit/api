import { Injectable } from '@nestjs/common';
import { HistoryOrder, Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma.service';

@Injectable()
export class HistoryOrdersRepository {
  constructor(private readonly prismaService: PrismaService) {}

  create(createDto: Prisma.HistoryOrderCreateInput): Promise<HistoryOrder> {
    return this.prismaService.historyOrder.create({
      data: createDto,
    });
  }

  async findAll(
    findAllDto: Prisma.HistoryOrderFindManyArgs,
  ): Promise<HistoryOrder[]> {
    return this.prismaService.historyOrder.findMany(findAllDto);
  }
}
