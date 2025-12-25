import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post) private postRepository: Repository<Post>,
    private readonly userService: UsersService,
  ) {}
  async findAll(): Promise<Post[]> {
    return await this.postRepository.find({
      take: 10,
      relations: {
        author: true,
      },
    });
  }

  async findOneById(id: number): Promise<Post | null> {
    return await this.postRepository.findOneBy({ id });
  }
  async create(content: string, userId: number): Promise<Post> {
    try {
      const author = await this.userService.findOne(userId);
      if (!author) {
        throw new HttpException('author not found', HttpStatus.NOT_FOUND);
      }
      const createdPost = this.postRepository.create({
        content: content,
        author_id: userId,
        author: author,
      });
      return await this.postRepository.save(createdPost);
    } catch (error) {
      console.log(error);
      throw new HttpException('failed to create post', 500);
    }
  }
}
