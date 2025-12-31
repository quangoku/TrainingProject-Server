import { Module } from '@nestjs/common';
import { FollowService } from './follow.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Follow } from './dto/follow.entity';
import { FollowController } from './follow.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Follow])],
  providers: [FollowService],
  controllers: [FollowController],
})
export class FollowModule {}
