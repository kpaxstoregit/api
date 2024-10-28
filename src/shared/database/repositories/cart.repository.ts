// src/shared/database/repositories/cart.repository.ts
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class CartRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getCartByUserId(userId: string) {
    return this.prisma.cart.findUnique({
      where: { userId },
      include: {
        cartItems: {
          include: {
            product: true,
          },
        },
      },
    });
  }

  async createCart(userId: string) {
    return this.prisma.cart.create({
      data: { userId },
    });
  }

  async addItemToCart(
    cartId: string,
    productId: string,
    quantity: number,
    price: number,
  ) {
    return this.prisma.$transaction(async (prisma) => {
      const cartItem = await prisma.cartItem.upsert({
        where: {
          cartId_productId: { cartId, productId },
        },
        update: {
          quantity: { increment: quantity },
        },
        create: {
          cartId,
          productId,
          quantity,
          price,
        },
      });

      await this.updateCartTotal(prisma, cartId);

      return cartItem;
    });
  }

  async updateCartItem(cartId: string, productId: string, quantity: number) {
    return this.prisma.$transaction(async (prisma) => {
      const updatedItem = await prisma.cartItem.update({
        where: {
          cartId_productId: { cartId, productId },
        },
        data: { quantity },
      });

      await this.updateCartTotal(prisma, cartId);

      return updatedItem;
    });
  }

  async removeItemFromCart(cartId: string, productId: string) {
    return this.prisma.$transaction(async (prisma) => {
      await prisma.cartItem.delete({
        where: {
          cartId_productId: { cartId, productId },
        },
      });

      await this.updateCartTotal(prisma, cartId);
    });
  }

  async clearCart(cartId: string) {
    return this.prisma.$transaction(async (prisma) => {
      await prisma.cartItem.deleteMany({
        where: { cartId },
      });

      await prisma.cart.update({
        where: { id: cartId },
        data: { totalPrice: 0 },
      });
    });
  }

  private async updateCartTotal(
    prisma: Prisma.TransactionClient,
    cartId: string,
  ) {
    const cartItems = await prisma.cartItem.findMany({
      where: { cartId },
      select: { quantity: true, price: true },
    });

    const totalPrice = cartItems.reduce(
      (total, item) => total + item.quantity * item.price,
      0,
    );

    await prisma.cart.update({
      where: { id: cartId },
      data: { totalPrice },
    });
  }
}
