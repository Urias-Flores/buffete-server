import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Document } from './document.entity';

@Injectable()
export class DocumentService {
  constructor(
    @InjectRepository(Document)
    private readonly documentService: Repository<Document>,
  ) {}

  async findAll(): Promise<Document[]> {
    return await this.documentService.find({
      relations: ['Subcategory'],
      order: { DocumentID: 'ASC' },
    });
  }

  async findByID(DocumentID: number) {
    return await this.documentService.findOneBy({ DocumentID });
  }

  async save(document: Document): Promise<Document> {
    document.CreatedDate = new Date();
    document.UpdatedDate = new Date();
    return await this.documentService.save(document);
  }

  async update(DocumentID: number, document: Document) {
    document.UpdatedDate = new Date();
    return await this.documentService.update({ DocumentID }, document);
  }

  async delete(DocumentID: number) {
    return await this.documentService.delete(DocumentID);
  }
}
