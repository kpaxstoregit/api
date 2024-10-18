import { Module } from '@nestjs/common';
import { BlogService } from 'src/shared/database/repositories/blog/blog.repositories';
import { BlogController } from './blog.controller';
import { BlogRepository } from './blog.service';

@Module({
  controllers: [BlogController],
  providers: [BlogService, BlogRepository],
})
export class BlogModule {}
