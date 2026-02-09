import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { FilesModule } from '../files/files.module';
import { ReactionModule } from '../reaction/reaction.module';
import { BullModule } from '@nestjs/bullmq';
import { QUEUES } from 'apps/constants';
import { PostRanking } from './tasks/post-ranking.task';

@Module({
  controllers: [PostsController],
  providers: [PostsService, PostRanking],
  imports: [
    TypeOrmModule.forFeature([Post]),
    FilesModule,
    ReactionModule,
    BullModule.registerQueue(
      {
        name: QUEUES.NOTIFICATION_QUEUE,
      },
      {
        name: QUEUES.MEDIA_QUEUE,
      },
    ),
  ],
})
export class PostsModule {}
