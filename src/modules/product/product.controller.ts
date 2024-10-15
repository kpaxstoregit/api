import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';

import { IsPublic } from 'src/shared/decorators/IsPublic';
import { ProductAlreadyExists } from 'src/shared/errors/product/ProductAlreadyExists ';
import { CreateProductDto } from './dto/createProductDto';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @IsPublic()
  @HttpCode(HttpStatus.NO_CONTENT)
  async createProduct(@Body() createProductDto: CreateProductDto) {
    try {
      await this.productService.createProduct(createProductDto);
    } catch (error) {
      if (error instanceof ProductAlreadyExists) {
        return {
          statusCode: 409,
          message: 'Product already exists',
        };
      }

      throw error;
    }
  }

  @Get()
  @IsPublic()
  async getAllProducts() {
    return this.productService.getAllProducts();
  }

  @Delete(':id')
  @IsPublic()
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteProduct(@Param('id') id: string) {
    try {
      await this.productService.deleteProduct(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException('Product not found');
      }
      throw error;
    }
  }
}
