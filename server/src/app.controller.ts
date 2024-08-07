import {
  Controller,
  Get,
  Param,
  Post,
  Res,
  StreamableFile,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { createReadStream } from 'fs';
import { join } from 'path';
import { Response } from 'express';

@Controller()
export class AppController {
  private readonly uploadDirectory = 'public/uploads';
  constructor(private readonly appService: AppService) {}

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './public/uploads', // Adjust based on your setup
        filename: (req, file, cb) => {
          cb(null, file.originalname);
        },
      }),
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    const fileName = file.filename;
    return { name: fileName };
  }

  @Get('file/:filename')
  getFile(
    @Param('filename') filename: string,
    @Res({ passthrough: true }) res: Response,
  ): StreamableFile {
    const file = createReadStream(
      join(process.cwd(), `public/uploads/${filename}`),
    );

    res.set({
      'Content-Disposition': `attachment; filename=${filename}`,
    });
    return new StreamableFile(file);
  }
}
