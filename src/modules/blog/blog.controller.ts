import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { BlogService } from 'src/shared/database/repositories/blog/blog.repositories';
import { IsPublic } from 'src/shared/decorators/IsPublic';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Get()
  @IsPublic()
  async getAllPosts() {
    const posts = await this.blogService.getAllPosts();

    return {
      data: posts,
    };
  }

  @Get(':id')
  @IsPublic()
  async getPostById(@Param('id') postId: string) {
    return this.blogService.getPostById(postId);
  }

  @Post()
  @IsPublic()
  async createPost(@Body() createPostDto: CreatePostDto) {
    const post = await this.blogService.createPost(createPostDto);

    return {
      data: post,
    };
  }

  @Patch(':id')
  @IsPublic()
  async updatePost(
    @Param('id') postId: string,
    @Body() updatePostDto: UpdatePostDto,
  ) {
    return this.blogService.updatePost(postId, updatePostDto);
  }

  @Delete(':id')
  @IsPublic()
  async deletePost(@Param('id') postId: string) {
    return this.blogService.deletePost(postId);
  }
}
