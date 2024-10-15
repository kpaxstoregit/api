import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/shared/database/prisma.service';
import { CreateProductDto } from './dto/createProductDto';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  async createProduct(createProductDto: CreateProductDto) {
    const { name, price, description, weight, stock, category, imageUrl } =
      createProductDto;

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
        imageUrl,
      },
    });

    return product;
  }

  async getAllProducts() {
    return this.prisma.product.findMany();
  }

  async deleteProduct(id: string) {
    const product = await this.prisma.product.findUnique({ where: { id } });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    await this.prisma.product.delete({
      where: { id },
    });
  }
}
