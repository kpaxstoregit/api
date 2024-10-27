import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { IsPublic } from 'src/shared/decorators/IsPublic';
import { CreateProductDto } from './dto/createProductDto';
import { UpdateProductDto } from './dto/updateProductDto';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @IsPublic()
  @HttpCode(HttpStatus.CREATED)
  async createProduct(@Body() createProductDto: CreateProductDto) {
    const product = await this.productService.createProduct(createProductDto);
    return { data: product };
  }

  @Get()
  @IsPublic()
  async getAllProducts() {
    const products = await this.productService.getAllProducts();
    return products;
  }

  @Get(':slug')
  @IsPublic()
  @HttpCode(HttpStatus.OK)
  async findBySlug(@Param('slug') slug: string) {
    const product = await this.productService.getProduct(slug);
    return product;
  }

  @Delete(':slug')
  @IsPublic()
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteProduct(@Param('slug') slug: string) {
    const produtctId = await this.productService.deleteProduct(slug);
    return produtctId;
  }

  @Put(':slug')
  @IsPublic()
  @HttpCode(HttpStatus.OK)
  async updateProduct(
    @Param('slug') slug: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    const updatedProduct = await this.productService.updateProduct({
      ...updateProductDto,
      slug,
    });
    return updatedProduct;
  }
}
