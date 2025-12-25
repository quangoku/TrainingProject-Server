import { ConfigService } from '@nestjs/config';
import { S3Client } from '@aws-sdk/client-s3';
export const awsProvider = {
  provide: 'AWS_PROVIDER',
  useFactory: (configService: ConfigService) => {
    return new S3Client({
      region: configService.get<string>('AWS_REGION'),
      credentials: {
        accessKeyId: configService.get<string>('AWS_ACCESS_KEY_ID')!,
        secretAccessKey: configService.get<string>('AWS_SECRET_ACCESS_KEY')!,
      },
    });
  },
  inject: [ConfigService],
};
