import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { FilesModule } from '../files/files.module';
import { MediaModule } from '../media/media.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CLIENTS } from 'apps/constants';
import { ReactionModule } from '../reaction/reaction.module';

@Module({
  controllers: [PostsController],
  providers: [PostsService],
  imports: [
    TypeOrmModule.forFeature([Post]),
    FilesModule,
    MediaModule,
    ReactionModule,
    ClientsModule.register([
      {
        name: CLIENTS.NOTIFICATION_SERVICE,
        transport: Transport.REDIS,
        options: { host: 'localhost', port: 6379 },
      },
    ]),
  ],
})
export class PostsModule {}
