import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageService } from './image.service';
const { v4: uuidv4 } = require('uuid');

@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
    return this.imageService.addFileToBucket(
      file.originalname,
      'images/' + uuidv4(),
      file.buffer,
      [{ mediaId: file.originalname }],
    );
  }
}
