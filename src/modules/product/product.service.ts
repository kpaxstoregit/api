import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/shared/database/prisma.service';
import { ProductRepository } from 'src/shared/database/repositories/product.repository';
import { CreateProductDto } from './dto/createProductDto';
import { UpdateProductDto } from './dto/updateProductDto';

@Injectable()
export class ProductService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly productRepository: ProductRepository,
  ) {}

  async createProduct(createProductDto: CreateProductDto) {
    const {
      name,
      price,
      description,
      weight,
      stock,
      category,
      imageUrls,
      title,
      suggestionOfUse,
      benefit,
      composition,
      promotion,
      status,
      classification,
      slug,
    } = createProductDto;

    const productExists = await this.prisma.product.findFirst({
      where: { name },
    });

    if (productExists) {
      throw new ConflictException('Product already exists');
    }

    const product = await this.prisma.product.create({
      data: {
        name,
        price,
        description,
        weight,
        stock,
        category,
        imageUrls,
        title,
        suggestionOfUse,
        benefit,
        composition,
        promotion,
        status,
        classification,
        slug,
      },
    });

    return product;
  }

  async getAllProducts() {
    return this.prisma.product.findMany();
  }

  async deleteProduct(slug: string) {
    const product = await this.prisma.product.findUnique({ where: { slug } });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    await this.prisma.product.delete({
      where: { slug },
    });
  }

  async updateProduct(updateProductDto: UpdateProductDto) {
    const {
      name,
      price,
      description,
      weight,
      stock,
      category,
      imageUrls,
      title,
      suggestionOfUse,
      benefit,
      composition,
      promotion,
      status,
      classification,
      slug,
    } = updateProductDto;

    const product = await this.productRepository.findUnique({
      where: { slug },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    await this.productRepository.update({
      where: { slug },
      data: {
        name,
        price,
        description,
        weight,
        stock,
        category,
        imageUrls,
        title,
        suggestionOfUse,
        benefit,
        composition,
        promotion,
        status,
        classification,
      },
    });
  }

  async getProduct(slug: string) {
    if (!slug) {
      throw new BadRequestException('Slug is required');
    }

    const product = await this.productRepository.findUnique({
      where: { slug },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }
}
