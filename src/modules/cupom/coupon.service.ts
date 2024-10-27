import { Injectable, NotFoundException } from '@nestjs/common';
import { CouponRepository } from 'src/shared/database/repositories/cupom.repository';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';

@Injectable()
export class CouponService {
  constructor(private readonly couponRepository: CouponRepository) {}

  async create(createCouponDto: CreateCouponDto) {
    return this.couponRepository.create(createCouponDto);
  }

  async findAll() {
    return this.couponRepository.findAll();
  }

  async findById(id: string) {
    const coupon = await this.couponRepository.findById(id);
    if (!coupon) {
      throw new NotFoundException('Coupon not found');
    }
    return coupon;
  }

  async findByCode(code: string) {
    const coupon = await this.couponRepository.findByCode(code);
    if (!coupon) {
      throw new NotFoundException('Coupon not found');
    }
    return coupon;
  }

  async update(id: string, updateCouponDto: UpdateCouponDto) {
    await this.findById(id);
    return this.couponRepository.update(id, updateCouponDto);
  }

  async delete(id: string) {
    await this.findById(id);
    return this.couponRepository.delete(id);
  }
}
