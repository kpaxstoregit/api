import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CartRepository } from 'src/shared/database/repositories/cart.repository';
import { ProductRepository } from 'src/shared/database/repositories/product.repository';

@Injectable()
export class CartService {
  constructor(
    private readonly cartRepository: CartRepository,
    private readonly productRepository: ProductRepository,
  ) {}

  async getOrCreateCart(userId: string) {
    let cart = await this.cartRepository.getCartByUserId(userId);

    if (!cart) {
      await this.cartRepository.createCart(userId);
      cart = await this.cartRepository.getCartByUserId(userId);
    }

    return cart;
  }

  async addItem(userId: string, productId: string, quantity: number) {
    if (quantity <= 0) {
      throw new BadRequestException('Quantity must be greater than zero');
    }

    const product = await this.productRepository.findUnique({
      where: { id: productId },
    });
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    if (product.stock < quantity) {
      throw new BadRequestException('Not enough stock available');
    }

    const cart = await this.getOrCreateCart(userId);
    return this.cartRepository.addItemToCart(
      cart.id,
      productId,
      quantity,
      product.price,
    );
  }

  async getCartItems(userId: string) {
    const cart = await this.cartRepository.getCartByUserId(userId);
    if (!cart) {
      throw new NotFoundException('Cart not found');
    }
    return {
      items: cart.cartItems,
      totalPrice: cart.totalPrice,
    };
  }

  async updateItemQuantity(
    userId: string,
    productId: string,
    quantity: number,
  ) {
    if (quantity <= 0) {
      throw new BadRequestException('Quantity must be greater than zero');
    }

    const cart = await this.getOrCreateCart(userId);
    const product = await this.productRepository.findUnique({
      where: { id: productId },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    if (product.stock < quantity) {
      throw new BadRequestException('Not enough stock available');
    }

    return this.cartRepository.updateCartItem(cart.id, productId, quantity);
  }

  async removeItem(userId: string, productId: string) {
    const cart = await this.cartRepository.getCartByUserId(userId);
    if (!cart) {
      throw new NotFoundException('Cart not found');
    }
    await this.cartRepository.removeItemFromCart(cart.id, productId);
  }

  async clearCart(userId: string) {
    const cart = await this.cartRepository.getCartByUserId(userId);
    if (!cart) {
      throw new NotFoundException('Cart not found');
    }
    await this.cartRepository.clearCart(cart.id);
  }

  async getCartTotal(userId: string) {
    const cart = await this.cartRepository.getCartByUserId(userId);
    if (!cart) {
      throw new NotFoundException('Cart not found');
    }
    return cart.totalPrice;
  }
}
