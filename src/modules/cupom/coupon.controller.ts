// src/modules/coupon/coupon.controller.ts
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { IsPublic } from 'src/shared/decorators/IsPublic';
import { CouponService } from './coupon.service';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';

@Controller('coupons')
export class CouponController {
  constructor(private readonly couponService: CouponService) {}

  @Post()
  @IsPublic()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createCouponDto: CreateCouponDto) {
    return this.couponService.create(createCouponDto);
  }

  @Get()
  @IsPublic()
  @HttpCode(HttpStatus.OK)
  findAll() {
    return this.couponService.findAll();
  }

  @Get(':id')
  @IsPublic()
  @HttpCode(HttpStatus.OK)
  findById(@Param('id') id: string) {
    return this.couponService.findById(id);
  }

  @Get('code/:code')
  @IsPublic()
  @HttpCode(HttpStatus.OK)
  findByCode(@Param('code') code: string) {
    return this.couponService.findByCode(code);
  }

  @Patch(':id')
  @IsPublic()
  @HttpCode(HttpStatus.OK)
  update(@Param('id') id: string, @Body() updateCouponDto: UpdateCouponDto) {
    return this.couponService.update(id, updateCouponDto);
  }

  @Delete(':id')
  @IsPublic()
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id') id: string) {
    return this.couponService.delete(id);
  }
}
