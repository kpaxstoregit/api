// src/posts/posts.controller.ts
import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  Query,
} from '@nestjs/common';

import { Post as PostModel, Prisma } from '@prisma/client';
import { BlogService } from './blog.service';
import { IsPublic } from 'src/shared/decorators/IsPublic';

@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Get()
  @IsPublic()
  async getPosts(
    @Query('skip') skip?: string,
    @Query('take') take?: string,
    @Query('orderBy') orderBy?: string,
  ): Promise<PostModel[]> {
    return this.blogService.posts({
      skip: skip ? parseInt(skip) : undefined,
      take: take ? parseInt(take) : undefined,
      orderBy: orderBy ? { [orderBy]: 'desc' } : undefined,
    });
  }

  @Get(':id')
  @IsPublic()
  async getPostById(@Param('id') id: string): Promise<PostModel> {
    return this.blogService.post({ id });
  }

  @Post()
  @IsPublic()
  async createPost(
    @Body() postData: Prisma.PostCreateInput,
  ): Promise<PostModel> {
    return this.blogService.createPost(postData);
  }

  @Put(':id')
  @IsPublic()
  async updatePost(
    @Param('id') id: string,
    @Body() postData: Prisma.PostUpdateInput,
  ): Promise<PostModel> {
    return this.blogService.updatePost({
      where: { id },
      data: postData,
    });
  }

  @Delete(':id')
  @IsPublic()
  async deletePost(@Param('id') id: string): Promise<PostModel> {
    return this.blogService.deletePost({ id });
  }
}
