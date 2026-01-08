import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';

import { UsersModule } from '../users/users.module';
import { LikesModule } from '../likes/likes.module';
import { FilesModule } from '../files/files.module';
import { MediaModule } from '../media/media.module';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  controllers: [PostsController],
  providers: [PostsService],
  imports: [
    TypeOrmModule.forFeature([Post]),
    UsersModule,
    LikesModule,
    FilesModule,
    MediaModule,
    ClientsModule.register([
      {
        name: 'POST_CLIENT',
        transport: Transport.REDIS,
        options: { host: 'localhost', port: 6379 },
      },
    ]),
  ],
})
export class PostsModule {}
