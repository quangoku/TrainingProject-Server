import {
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiFile } from 'src/common/decorators/api-file.decotator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('upload')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('access-token')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}
  @Post('cloudinary')
  @ApiFile(true, 'file')
  @UseInterceptors(FileInterceptor('file'))
  uploadToCloudinary(@UploadedFile() file: Express.Multer.File) {
    return this.filesService.uploadToCloudinary(file);
  }

  @Post('aws')
  @ApiFile(true, 'file')
  @UseInterceptors(FileInterceptor('file'))
  uploadToS3(@UploadedFile() file: Express.Multer.File) {
    return this.filesService.uploadToS3(file);
  }
}
