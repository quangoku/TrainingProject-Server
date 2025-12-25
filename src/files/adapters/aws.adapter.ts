import { Inject, Injectable } from '@nestjs/common';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AWSAdapter {
  constructor(
    @Inject('AWS_PROVIDER') private s3: S3Client,
    private readonly configService: ConfigService,
  ) {}

  async upload(file: Express.Multer.File, folder: string) {
    const bucket = this.configService.get<string>('AWS_BUCKET');
    const key = `${folder}/${file.originalname}`;

    const command = new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
    });
    await this.s3.send(command);
    return {
      key,
    };
  }
}
