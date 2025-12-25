import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary } from 'cloudinary';

export const cloudinaryProvider = {
  provide: 'CLOUDINARY',
  useFactory: (config: ConfigService) => {
    cloudinary.config({
      cloud_name: config.get<string>('CLOUDINARY_CLOUD_NAME'),
      api_key: config.get<string>('CLOUDINARY_API_KEY'),
      api_secret: config.get<string>('CLOUDINARY_SECRET_KEY'),
    });

    return cloudinary;
  },
  inject: [ConfigService],
};
