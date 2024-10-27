// src/modules/coupon/coupon.module.ts
import { Module } from '@nestjs/common';

import { PrismaService } from 'src/shared/database/prisma.service';
import { CouponController } from './coupon.controller';

import { CouponRepository } from 'src/shared/database/repositories/cupom.repository';
import { CouponService } from './coupon.service';

@Module({
  controllers: [CouponController],
  providers: [CouponService, CouponRepository, PrismaService],
})
export class CouponModule {}
