import { Injectable } from '@nestjs/common';
import { Prisma, Product } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ProductRepository {
  constructor(private readonly prismaService: PrismaService) {}

  create(createDto: Prisma.ProductCreateArgs): Promise<Product> {
    return this.prismaService.product.create(createDto);
  }

  findUnique(
    findUniqueDto: Prisma.ProductFindUniqueArgs,
  ): Promise<Product | null> {
    return this.prismaService.product.findUnique(findUniqueDto);
  }

  update(updateDto: Prisma.ProductUpdateArgs): Promise<Product> {
    return this.prismaService.product.update(updateDto);
  }
}
