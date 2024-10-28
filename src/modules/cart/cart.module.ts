// src/modules/cart/cart.module.ts
import { Module } from '@nestjs/common';
import { PrismaService } from 'src/shared/database/prisma.service';
import { CartRepository } from 'src/shared/database/repositories/cart.repository';
import { ProductRepository } from 'src/shared/database/repositories/product.repository';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';

@Module({
  controllers: [CartController],
  providers: [CartService, CartRepository, ProductRepository, PrismaService],
})
export class CartModule {}
