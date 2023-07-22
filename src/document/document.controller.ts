import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
  Res,
} from '@nestjs/common';
import { Document } from './document.entity';
import { DocumentService } from './document.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import * as fs from 'fs';
import * as path from 'path';
import * as uuid from 'uuid';

@Controller('document')
export class DocumentController {
  constructor(private readonly documentRepository: DocumentService) {}

  @Get()
  getDocuments(): Promise<Document[]> {
    return this.documentRepository.findAll();
  }

  @Get(':id')
  getDocumentByID(@Param() params): Promise<Document> {
    return this.documentRepository.findByID(params.id);
  }

  @Get('/download/:filename')
  getFileDocument(@Param('filename') filename: string, @Res() res: Response) {
    const filePath = path.join(__dirname, '..', '..', 'files', filename);
    res.setHeader('Content-Disposition', `attachment; filename=file.pdf`);
    res.sendFile(filePath);
  }

  @Post()
  @UseInterceptors(FileInterceptor('File'))
  addDocument(
    @Body('Name') name,
    @UploadedFile() file: Express.Multer.File,
  ): string {
    console.log('Todo OK');
    console.log(name);

    const uniqueFileName = uuid.v4();
    const originalExtension: string = path.extname(file.originalname);
    const savedFileName = `${uniqueFileName}${originalExtension}`;
    const destinationPath: string = path.join('./files', savedFileName);
    fs.renameSync(file.path, destinationPath);
    console.log(file);
    return 'OK';
  }
}
