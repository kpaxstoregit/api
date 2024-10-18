import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/shared/database/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class BlogRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.post.findMany({
      include: {
        author: {
          select: {
            email: true,
            name: true,
          },
        },
        comments: true,
      },
    });
  }
  async findById(postId: string) {
    return this.prisma.post.findUnique({
      where: { id: postId },
      include: {
        author: true,
        comments: true,
      },
    });
  }

  async create(data: CreatePostDto) {
    return this.prisma.post.create({
      data: {
        title: data.title,
        content: data.content,
        author: {
          connect: { id: data.authorId },
        },
      },
    });
  }

  async update(postId: string, data: UpdatePostDto) {
    return this.prisma.post.update({
      where: { id: postId },
      data,
    });
  }

  async delete(postId: string) {
    return this.prisma.post.delete({
      where: { id: postId },
    });
  }
}
