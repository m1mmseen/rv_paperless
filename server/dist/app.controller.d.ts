/// <reference types="multer" />
import { StreamableFile } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';
export declare class AppController {
    private readonly appService;
    private readonly uploadDirectory;
    constructor(appService: AppService);
    uploadFile(file: Express.Multer.File): {
        name: string;
    };
    getFile(filename: string, res: Response): StreamableFile;
}
