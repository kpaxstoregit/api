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
import { CartService } from './cart.service';
import { AddItemDto } from './dto/add-item.dto';
import { UpdateItemQuantityDto } from './dto/update-item-quantity.dto';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post(':userId/add-item')
  @IsPublic()
  @HttpCode(HttpStatus.CREATED)
  async addItemToCart(
    @Param('userId') userId: string,
    @Body() addItemDto: AddItemDto,
  ) {
    return this.cartService.addItem(
      userId,
      addItemDto.productId,
      addItemDto.quantity,
    );
  }

  @Get(':userId')
  @IsPublic()
  async getCartItems(@Param('userId') userId: string) {
    return this.cartService.getCartItems(userId);
  }

  @Patch(':userId/update-item/:productId')
  @IsPublic()
  async updateItemQuantity(
    @Param('userId') userId: string,
    @Param('productId') productId: string,
    @Body() updateItemQuantityDto: UpdateItemQuantityDto,
  ) {
    return this.cartService.updateItemQuantity(
      userId,
      productId,
      updateItemQuantityDto.quantity,
    );
  }

  @Delete(':userId/remove-item/:productId')
  @IsPublic()
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeItemFromCart(
    @Param('userId') userId: string,
    @Param('productId') productId: string,
  ) {
    await this.cartService.removeItem(userId, productId);
  }

  @Delete(':userId/clear')
  @IsPublic()
  @HttpCode(HttpStatus.NO_CONTENT)
  async clearCart(@Param('userId') userId: string) {
    await this.cartService.clearCart(userId);
  }
}
