import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogController } from './blog.controller';
import { BlogService } from './blog.service';
import { BlogPost } from './entities/blog-post.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BlogPost])],
  controllers: [BlogController],
  providers: [BlogService],
})
export class BlogModule {}
