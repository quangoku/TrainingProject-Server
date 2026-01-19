import { Module } from '@nestjs/common';
import { SaveModule } from './save/save.module';
import { LikesModule } from './likes/likes.module';

@Module({
  imports: [SaveModule, LikesModule],
  exports: [SaveModule, LikesModule],
})
export class ReactionModule {}
