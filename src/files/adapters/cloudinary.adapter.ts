import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class CloudinaryAdapter {
  constructor(@Inject('CLOUDINARY') private cloudinary) {}

  async upload(file: Express.Multer.File) {
    return new Promise((res, rej) => {
      const upload = this.cloudinary.uploader.upload_stream((err, result) => {
        if (err) rej(err);
        else res(result);
      });
      upload.end(file.buffer);
    });
  }
}
