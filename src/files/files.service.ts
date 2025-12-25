import { Injectable } from '@nestjs/common';
import { CloudinaryAdapter } from './adapters/cloudinary.adapter';
import { AWSAdapter } from './adapters/aws.adapter';
@Injectable()
export class FilesService {
  constructor(
    private readonly cloudinaryAdapter: CloudinaryAdapter,
    private readonly awsAdapter: AWSAdapter,
  ) {}

  async uploadToCloudinary(file: Express.Multer.File) {
    return this.cloudinaryAdapter.upload(file);
  }
  async uploadToS3(file: Express.Multer.File) {
    return this.awsAdapter.upload(file, 'avatars');
  }
}
