import { Injectable } from '@nestjs/common';
import { BlogRepository } from 'src/modules/blog/blog.service';
import { CreatePostDto } from 'src/modules/blog/dto/create-post.dto';
import { UpdatePostDto } from 'src/modules/blog/dto/update-post.dto';

@Injectable()
export class BlogService {
  constructor(private readonly blogRepository: BlogRepository) {}

  async getAllPosts() {
    return this.blogRepository.findAll();
  }

  async getPostById(postId: string) {
    return this.blogRepository.findById(postId);
  }

  async createPost(createPostDto: CreatePostDto) {
    return this.blogRepository.create(createPostDto);
  }

  async updatePost(postId: string, updatePostDto: UpdatePostDto) {
    return this.blogRepository.update(postId, updatePostDto);
  }

  async deletePost(postId: string) {
    return this.blogRepository.delete(postId);
  }
}
