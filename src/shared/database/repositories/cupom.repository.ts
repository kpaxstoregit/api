import { Injectable } from '@nestjs/common';
import { Coupon, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class CouponRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createDto: Prisma.CouponCreateInput): Promise<Coupon> {
    return this.prismaService.coupon.create({ data: createDto });
  }

  async findAll(): Promise<Coupon[]> {
    return this.prismaService.coupon.findMany();
  }

  async findById(id: string): Promise<Coupon | null> {
    return this.prismaService.coupon.findUnique({ where: { id } });
  }

  async findByCode(code: string): Promise<Coupon | null> {
    return this.prismaService.coupon.findUnique({ where: { code } });
  }

  async update(
    id: string,
    updateDto: Prisma.CouponUpdateInput,
  ): Promise<Coupon> {
    return this.prismaService.coupon.update({ where: { id }, data: updateDto });
  }

  async delete(id: string): Promise<Coupon> {
    return this.prismaService.coupon.delete({ where: { id } });
  }
}
