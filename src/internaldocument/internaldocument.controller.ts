import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UploadedFile,
  UseInterceptors,
  Res,
} from '@nestjs/common';
import { InternalDocumentService } from './internaldocument.service';
import { InternalDocument } from './internaldocument.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import path from 'path';
import fs from 'fs';
import * as uuid from 'uuid';
import { DeleteResult } from 'typeorm';
import { Response } from "express";

@Controller('internaldocument')
export class InternalDocumentController {
  constructor(
    private readonly internalDocumentService: InternalDocumentService,
  ) {}

  @Get()
  async getAllInternalDocuments(): Promise<InternalDocument[]> {
    return await this.internalDocumentService.getAll();
  }

  @Get(':id')
  async getInternalDocumentByID(
    @Param() params: any,
  ): Promise<InternalDocument> {
    return await this.internalDocumentService.getByInternalDocumentByID(
      params.id,
    );
  }

  @Get('/URL/:URL')
  async getInternalDocumentByURL(
    @Param() params: any,
  ): Promise<InternalDocument> {
    return await this.internalDocumentService.getInternalDocumentByURL(
      params.URL,
    );
  }

  @Get('/download/:filename')
  getFileDocument(@Param('filename') filename: string, @Res() res: Response) {
    const filePath = path.join(__dirname, '..', '..', 'files', filename);
    res.setHeader('Content-Disposition', `attachment; filename=file.pdf`);
    res.sendFile(filePath);
  }

  @Post()
  @UseInterceptors(FileInterceptor('File'))
  async addInternalDocument(
    @Body('Name') name: string,
    @Body('User') user: number,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<InternalDocument> {
    const uniqueFileName = uuid.v4();
    const originalExtension: string = path.extname(file.originalname);
    const savedFileName = `${uniqueFileName}${originalExtension}`;
    const destinationPath: string = path.join(
      './internal-files',
      savedFileName,
    );
    fs.renameSync(file.path, destinationPath);

    const internalDocument = new InternalDocument();
    internalDocument.Name = name;
    internalDocument.User = user;
    internalDocument.URL = savedFileName;

    try {
      return await this.internalDocumentService.addInternalDocument(
        internalDocument,
      );
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
  async deleteInternalDocument(@Param() param: any): Promise<DeleteResult> {
    try {
      const internalDocument =
        await this.internalDocumentService.getByInternalDocumentByID(param.id);
      if (Object.keys(internalDocument).length > 0) {
        const result =
          await this.internalDocumentService.deleteInternalDocument(param.id);
        if (result.affected > 0) {
          fs.unlink(
            path.join('./internal-files', internalDocument.URL),
            (error) => {
              if (error) {
                console.log('Error al eliminar el archivo');
              }
            },
          );
          return result;
        }
      }
      return await this.internalDocumentService.deleteInternalDocument(
        param.id,
      );
    } catch (error) {
      console.log(error);
      return { affected: 0, raw: 0 };
    }
  }
}
