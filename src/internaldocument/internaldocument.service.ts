import { HttpException, Injectable } from '@nestjs/common';
import {
  DeleteResult,
  QueryFailedError,
  Repository,
  UpdateResult,
} from 'typeorm';
import { InternalDocumentEntity } from './internaldocument.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class InternalDocumentService {
  constructor(
    @InjectRepository(InternalDocumentEntity)
    private readonly serviceInternalDocument: Repository<InternalDocumentEntity>,
  ) {}

  async findAll(): Promise<InternalDocumentEntity[]> {
    try {
      return await this.serviceInternalDocument.find({ relations: ['User'] });
    } catch (error) {
      throw new HttpException(
        'Los documentos internos no se pudieron recuperar',
        500,
      );
    }
  }

  async findByID(InternalDocumentID: number): Promise<InternalDocumentEntity> {
    try {
      const document = await this.serviceInternalDocument.find({
        relations: ['User'],
        where: { InternalDocumentID: InternalDocumentID },
      });
      return document[0];
    } catch (error) {
      if (error instanceof QueryFailedError) {
        throw new HttpException(
          'El id del documento interno no es valido o no es un numero',
          400,
        );
      }
      throw new HttpException(
        'El documento interno no pudo ser recuperado',
        500,
      );
    }
  }

  async save(
    InternalDocument: InternalDocumentEntity,
  ): Promise<InternalDocumentEntity> {
    try {
      InternalDocument.CreatedDate = new Date();
      InternalDocument.UpdatedDate = new Date();
      return await this.serviceInternalDocument.save(InternalDocument);
    } catch (error) {
      throw new HttpException(
        'El documento interno no pudo ser almacenado',
        500,
      );
    }
  }

  async delete(InternalDocumentID: any): Promise<DeleteResult> {
    try {
      return await this.serviceInternalDocument.delete(InternalDocumentID);
    } catch (error) {
      if (error instanceof QueryFailedError) {
        throw new HttpException(
          'El id del documento interno no es valido o no es un numero',
          400,
        );
      }
      throw new HttpException(
        'El documento interno no pudo ser eliminado',
        500,
      );
    }
  }
}
