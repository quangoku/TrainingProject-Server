import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { PostsService } from './posts.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreatePostDto } from './dto/create-post.dto';
import { CurrentUser } from 'src/common/decorators/user.decoratos';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get('')
  async findAll() {
    return await this.postsService.findAll();
  }
  @Post('')
  @UseGuards(JwtAuthGuard)
  create(@Body() createPostDto: CreatePostDto, @CurrentUser() CurrentUser) {
    return this.postsService.create(createPostDto.content, CurrentUser.id);
  }
}
