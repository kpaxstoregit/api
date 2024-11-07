// src/posts/posts.service.ts
import { Injectable } from '@nestjs/common';

import { Post, Prisma } from '@prisma/client';
import { BlogRepository } from 'src/shared/database/repositories/blog/blog.repositories';

@Injectable()
export class BlogService {
  constructor(private readonly postsRepository: BlogRepository) {}

  async post(
    postWhereUniqueInput: Prisma.PostWhereUniqueInput,
  ): Promise<Post | null> {
    return this.postsRepository.findUnique(postWhereUniqueInput);
  }

  async posts(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.PostWhereUniqueInput;
    where?: Prisma.PostWhereInput;
    orderBy?: Prisma.PostOrderByWithRelationInput;
  }): Promise<Post[]> {
    return this.postsRepository.findMany(params);
  }

  async createPost(data: Prisma.PostCreateInput): Promise<Post> {
    return this.postsRepository.create(data);
  }

  async updatePost(params: {
    where: Prisma.PostWhereUniqueInput;
    data: Prisma.PostUpdateInput;
  }): Promise<Post> {
    return this.postsRepository.update(params);
  }

  async deletePost(where: Prisma.PostWhereUniqueInput): Promise<Post> {
    return this.postsRepository.delete(where);
  }
}
