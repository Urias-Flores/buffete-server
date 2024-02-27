import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  UploadedFile,
  UseInterceptors,
  Res,
  HttpException,
} from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { InternalDocumentService } from './internaldocument.service';
import { InternalDocumentEntity } from './internaldocument.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import * as uuid from 'uuid';
import * as path from 'path';
import * as fs from 'fs';

@Controller('internal-documents')
export class InternalDocumentController {
  constructor(
    private readonly internalDocumentService: InternalDocumentService,
  ) {}

  @Get()
  async getAllInternalDocuments(): Promise<InternalDocumentEntity[]> {
    return await this.internalDocumentService.findAll();
  }

  @Get(':id')
  async getInternalDocumentByID(
    @Param() params: any,
  ): Promise<InternalDocumentEntity> {
    const id = params.id;
    return await this.internalDocumentService.findByID(id);
  }

  @Get('/download/:filename')
  getFileDocument(@Param('filename') filename: string, @Res() res: Response) {
    const filePath = path.join(
      __dirname,
      '..',
      '..',
      'internal-files',
      filename,
    );
    res.setHeader('Content-Disposition', `attachment; filename=file.pdf`);
    res.sendFile(filePath);
  }

  @Post()
  @UseInterceptors(FileInterceptor('File'))
  async addInternalDocument(
    @Body('Name') name: string,
    @Body('User') user: number,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<InternalDocumentEntity> {
    const uniqueFileName = uuid.v4();
    const originalExtension: string = path.extname(file.originalname);
    const savedFileName = `${uniqueFileName}${originalExtension}`;
    const destinationPath: string = path.join(
      './internal-files',
      savedFileName,
    );
    fs.renameSync(file.path, destinationPath);

    const internalDocument = new InternalDocumentEntity();
    internalDocument.Name = name;
    internalDocument.User = user;
    internalDocument.URL = savedFileName;

    try {
      return await this.internalDocumentService.save(internalDocument);
    } catch (exception) {
      fs.unlink(destinationPath, (error) => {
        if (error) {
          throw new HttpException(
            'El documento no pudo eliminarse de la carpeta',
            500,
          );
        }
      });
      throw new HttpException('El documento no pudo ser almacenado', 500);
    }
  }

  @Delete(':id')
  async deleteInternalDocument(@Param() param: any): Promise<DeleteResult> {
    const internalDocument = await this.internalDocumentService.findByID(
      param.id,
    );

    const filePath = path.join(
      __dirname,
      '..',
      '..',
      'internal-files',
      internalDocument.URL,
    );

    if (Object.keys(internalDocument).length > 0) {
      const result = await this.internalDocumentService.delete(param.id);
      if (result.affected > 0) {
        fs.unlink(filePath, (error) => {
            if (error) {
              throw new HttpException(
                'El documento no pudo eliminarse de la carpeta',
                500,
              );
            }
          },
        );
        return result;
      }
    }
    const id = param.id;
    return await this.internalDocumentService.delete(id);
  }
}
