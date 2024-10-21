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
    return { data: products };
  }

  @Get(':id')
  @IsPublic()
  @HttpCode(HttpStatus.OK)
  async findById(@Param('id') id: string) {
    const product = await this.productService.findById(id);
    return { data: product };
  }

  @Delete(':id')
  @IsPublic()
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteProduct(@Param('id') id: string) {
    await this.productService.deleteProduct(id);
    return { data: null };
  }

  @Put(':id')
  @IsPublic()
  @HttpCode(HttpStatus.OK)
  async updateProduct(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    const updatedProduct = await this.productService.updateProduct(
      id,
      updateProductDto,
    );
    return { data: updatedProduct };
  }
}
