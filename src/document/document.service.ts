import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Document } from './document.entity';

@Injectable()
export class DocumentService {
  constructor(
    @InjectRepository(Document)
    private readonly documentService: Repository<Document>,
  ) {}

  async findAll(): Promise<Document[]> {
    return await this.documentService.find({
      relations: ['Subject', 'Client'],
    });
  }

  async findByID(DocumentID: number): Promise<Document> {
    const documents = await this.documentService.find({
      where: { DocumentID },
      relations: ['Subject'],
    });
    return documents[0];
  }

  async save(document: Document): Promise<Document> {
    document.CreatedDate = new Date();
    document.UpdatedDate = new Date();
    return await this.documentService.save(document);
  }

  async update(DocumentID: number, document: Document): Promise<UpdateResult> {
    document.UpdatedDate = new Date();
    return await this.documentService.update({ DocumentID }, document);
  }

  async delete(DocumentID: number): Promise<DeleteResult> {
    return await this.documentService.delete(DocumentID);
  }
}
