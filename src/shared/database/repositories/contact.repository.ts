import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ContactRepository {
  constructor(private readonly prismaService: PrismaService) {}

  create(createDto: Prisma.ContactCreateArgs) {
    return this.prismaService.contact.create(createDto);
  }

  findMany() {
    return this.prismaService.contact.findMany();
  }
}
