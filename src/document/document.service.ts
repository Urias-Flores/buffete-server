import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  DeleteResult,
  QueryFailedError,
  Repository,
  UpdateResult,
} from 'typeorm';
import { DocumentEntity } from './document.entity';

@Injectable()
export class DocumentService {
  constructor(
    @InjectRepository(DocumentEntity)
    private readonly documentService: Repository<DocumentEntity>,
  ) {}

  async findAll(): Promise<DocumentEntity[]> {
    try {
      return await this.documentService.find({
        relations: ['Subject', 'Client'],
      });
    } catch (error) {
      throw new HttpException('No se pudieron obtener los clientes', 500);
    }
  }

  async findByID(DocumentID: any): Promise<DocumentEntity> {
    try {
      const documents = await this.documentService.find({
        where: { DocumentID },
        relations: ['Subject'],
      });
      return documents[0];
    } catch (error) {
      if (error instanceof QueryFailedError) {
        throw new HttpException(
          'El id del documento no es valido o no es un numero',
          400,
        );
      }
      throw new HttpException('No se pudo obtener el cliente', 500);
    }
  }

  async save(document: DocumentEntity): Promise<DocumentEntity> {
    try {
      document.CreatedDate = new Date();
      document.UpdatedDate = new Date();
      return await this.documentService.save(document);
    } catch (error) {
      throw new HttpException('El documento no pudo ser almacenado', 500);
    }
  }

  async update(document: DocumentEntity): Promise<UpdateResult> {
    if (!document.DocumentID) {
      throw new HttpException('Debe incluir el id del documento', 400);
    }
    try {
      document.UpdatedDate = new Date();
      return await this.documentService.update(
        { DocumentID: document.DocumentID },
        document,
      );
    } catch (error) {
      throw new HttpException('El documento no pudo ser actualizado', 500);
    }
  }

  async delete(DocumentID: any): Promise<DeleteResult> {
    try {
      return await this.documentService.delete(DocumentID);
    } catch (error) {
      if (error instanceof QueryFailedError) {
        throw new HttpException(
          'El id del documento no es valido o no es un numero',
          400,
        );
      }
      throw new HttpException('El documento no pudo ser eliminado', 500);
    }
  }
}
