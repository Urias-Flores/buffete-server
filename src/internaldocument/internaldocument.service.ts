import { Injectable } from '@nestjs/common';
import { DeleteResult, Repository, UpdateResult } from "typeorm";
import { InternalDocument } from './internaldocument.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class InternalDocumentService {
  constructor(
    @InjectRepository(InternalDocument)
    private readonly serviceInternalDocument: Repository<InternalDocument>,
  ) {}

  async getAll(): Promise<InternalDocument[]> {
    return await this.serviceInternalDocument.find({ relations: ['User'] });
  }

  async getByInternalDocumentByID(
    InternalDocumentID: number,
  ): Promise<InternalDocument> {
    const document = await this.serviceInternalDocument.find({
      relations: ['User'],
      where: { InternalDocumentID: InternalDocumentID },
    });
    return document[0];
  }

  async getInternalDocumentByURL(URL: string): Promise<InternalDocument> {
    const document = await this.serviceInternalDocument.find({
      relations: ['User'],
      where: { URL: URL },
    });
    return document[0];
  }

  async addInternalDocument(
    InternalDocument: InternalDocument,
  ): Promise<InternalDocument> {
    InternalDocument.CreatedDate = new Date();
    InternalDocument.UpdatedDate = new Date();
    return await this.serviceInternalDocument.save(InternalDocument);
  }

  async updateInternalDocument(
    InternalDocument: InternalDocument,
  ): Promise<UpdateResult> {
    InternalDocument.UpdatedDate = new Date();
    return await this.serviceInternalDocument.update(
      { InternalDocumentID: InternalDocument.InternalDocumentID },
      InternalDocument,
    );
  }

  async deleteInternalDocument(
    InternalDocumentID: number,
  ): Promise<DeleteResult> {
    return await this.serviceInternalDocument.delete(InternalDocumentID);
  }
}
