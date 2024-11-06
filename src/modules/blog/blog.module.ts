import { Module } from '@nestjs/common';
import { BlogController } from './blog.controller';
import { BlogService } from './blog.service';
import { BlogRepository } from 'src/shared/database/repositories/blog/blog.repositories';

@Module({
  controllers: [BlogController],
  providers: [BlogService, BlogRepository],
})
export class BlogModule {}
