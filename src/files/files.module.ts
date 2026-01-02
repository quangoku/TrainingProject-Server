import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { CloudinaryAdapter } from './adapters/cloudinary.adapter';
import { cloudinaryProvider } from './providers/cloudinary.provider';
import { awsProvider } from './providers/aws.provider';
import { AWSAdapter } from './adapters/aws.adapter';

@Module({
  controllers: [FilesController],
  providers: [
    FilesService,
    CloudinaryAdapter,
    AWSAdapter,
    cloudinaryProvider,
    awsProvider,
  ],
  exports: [FilesService],
})
export class FilesModule {}
