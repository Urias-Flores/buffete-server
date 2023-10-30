import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
  Res,
  Delete,
} from '@nestjs/common';
import { Document } from './document.entity';
import { DocumentService } from './document.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import * as fs from 'fs';
import * as path from 'path';
import * as uuid from 'uuid';
import { User } from "../user/user.entity";

@Controller('document')
export class DocumentController {
  constructor(private readonly documentRepository: DocumentService) {}

  @Get()
  getDocuments(): Promise<Document[]> {
    return this.documentRepository.findAll();
  }

  @Get(':id')
  getDocumentByID(@Param() params: any): Promise<Document> {
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
  async addDocument(
    @Body('Name') name: string,
    @Body('Subject') subject: string,
    @Body('Client') client: string,
    @Body('User') user: string,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<Document> {
    const uniqueFileName = uuid.v4();
    const originalExtension: string = path.extname(file.originalname);
    const savedFileName = `${uniqueFileName}${originalExtension}`;
    const destinationPath: string = path.join('./files', savedFileName);
    fs.renameSync(file.path, destinationPath);

    const document: Document = new Document();
    document.Subject = parseInt(subject);
    document.Client = parseInt(client);
    document.User = parseInt(user);
    document.Name = name;
    document.URL = savedFileName;

    try {
      return await this.documentRepository.save(document);
    } catch (exception) {
      fs.unlink(destinationPath, (error) => {
        if (error) {
          console.log('Error al eliminar el archivo');
        }
      });
      return exception;
    }
  }

  @Delete(':id')
  async deleteDocument(@Param() params: any) {
    try {
      const document = await this.documentRepository.findByID(params.id);
      if (Object.keys(document).length > 0) {
        const result = await this.documentRepository.delete(params.id);
        if (result.affected > 0) {
          fs.unlink(path.join('./files', document.URL), (error) => {
            if (error) {
              console.log('Error al eliminar el archivo');
            }
          });
          return result;
        }
      }
    } catch (exception) {
      console.log(exception);
      return { affected: 0, raw: 0 };
    }
  }
}
