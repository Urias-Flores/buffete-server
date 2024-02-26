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
  HttpException,
} from '@nestjs/common';
import { DocumentEntity } from './document.entity';
import { DocumentService } from './document.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import * as fs from 'fs';
import * as path from 'path';
import * as uuid from 'uuid';
import { ClientService } from '../client/client.service';
import { ClientEntity } from '../client/client.entity';

@Controller('documents')
export class DocumentController {
  constructor(
    private readonly documentRepository: DocumentService,
    private readonly clientService: ClientService,
  ) {}

  @Get()
  findDocuments(): Promise<DocumentEntity[]> {
    return this.documentRepository.findAll();
  }

  @Get(':id')
  findDocumentByID(@Param() params: any): Promise<DocumentEntity> {
    return this.documentRepository.findByID(params.id);
  }

  @Get('/download/:folderName/:documentName')
  findFileDocument(
    @Param('folderName') folderName: string,
    @Param('documentName') documentName: string,
    @Res() res: Response,
  ) {


    const filePath = path.join(
      __dirname,
      '..',
      '..',
      'files',
      folderName,
      documentName,
    );
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=${folderName.replace('-', ' ')}.pdf`,
    );
    res.sendFile(filePath);
  }

  @Post()
  @UseInterceptors(FileInterceptor('File'))
  async createDocument(
    @Body('Name') name: string,
    @Body('Subject') subject: string,
    @Body('Client') client: string,
    @Body('User') user: string,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<DocumentEntity> {
    const document: DocumentEntity = new DocumentEntity();
    document.Subject = parseInt(subject);
    document.Client = parseInt(client);
    document.User = parseInt(user);
    document.Name = name;

    const clientObject: ClientEntity = await this.clientService.findByID(
      document.Client,
    );

    const clientFolderPath: string = path.join('./files', clientObject.URL);
    if (!fs.existsSync(clientFolderPath)) {
      fs.mkdirSync(clientFolderPath, { recursive: true });
    }

    const uniqueFileName = uuid.v4();
    const originalExtension: string = path.extname(file.originalname);
    const savedFileName = `${uniqueFileName}${originalExtension}`;
    const destinationPath: string = path.join(
      clientFolderPath,
      savedFileName,
    );

    fs.renameSync(file.path, destinationPath);

    document.URL = destinationPath;

    try {
      return await this.documentRepository.save(document);
    } catch (exception) {
      fs.unlink(destinationPath, (error) => {
        console.log(error);
        if (error) {
          throw new HttpException(
            `El documento no pudo ser almacenado la carpeta.\nDocumento: ${destinationPath}`,
            500,
          );
        }
      });
      throw new HttpException('El documento no pudo ser almacenado', 500);
    }
  }

  @Delete(':id')
  async deleteDocument(@Param() params: any) {
    const document = await this.documentRepository.findByID(params.id);
    if (Object.keys(document).length > 0) {
      const result = await this.documentRepository.delete(params.id);

      if (result.affected > 0) {
        fs.unlink(path.join(document.URL), (error) => {
          if (error) {
            throw new HttpException(
              `El documento no pudo ser eliminado de la carpeta.\nDocumento: ${document.URL}`,
              500,
            );
          }
        });
        return result;
      }
    }
  }
}
