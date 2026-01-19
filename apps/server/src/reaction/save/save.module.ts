import { Module } from '@nestjs/common';
import { SaveService } from './save.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SavedPost } from './entities/save.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SavedPost])],
  providers: [SaveService],
  exports: [SaveService],
})
export class SaveModule {}
