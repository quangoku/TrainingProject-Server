import { Module } from '@nestjs/common';
import { MediaService } from './media.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Media } from './entities/media.entity';
import { FilesModule } from '../files/files.module';
import { BullModule } from '@nestjs/bullmq';
import { QUEUES } from 'apps/constants';
import { MediaProcessor } from './media.processor';

@Module({
  imports: [
    TypeOrmModule.forFeature([Media]),
    FilesModule,
    BullModule.registerQueue({
      name: QUEUES.MEDIA_QUEUE,
    }),
  ],
  providers: [MediaService, MediaProcessor],
  exports: [MediaService],
})
export class MediaModule {}
