import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class NewsletterRepository {
  constructor(private readonly prismaService: PrismaService) {}

  create(createDto: Prisma.NewsletterCreateArgs) {
    return this.prismaService.newsletter.create(createDto);
  }

  findMany() {
    return this.prismaService.newsletter.findMany();
  }
}
