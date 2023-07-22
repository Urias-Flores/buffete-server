import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Subject } from './subject.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SubjectService {
  constructor(
    @InjectRepository(Subject)
    private readonly subjectRepository: Repository<Subject>,
  ) {}

  async findAll(): Promise<Subject[]> {
    return await this.subjectRepository.find({
      relations: ['Documents', 'User'],
      order: { SubjectID: 'ASC' },
    });
  }

  async findByID(SubjectID: number): Promise<Subject> {
    return await this.subjectRepository.findOneBy({ SubjectID });
  }

  async save(subject: Subject): Promise<Subject> {
    subject.CreatedDate = new Date();
    subject.UpdatedDate = new Date();
    return await this.subjectRepository.save(subject);
  }

  async update(SubjectID: number, subject: Subject) {
    subject.UpdatedDate = new Date();
    return await this.subjectRepository.update({ SubjectID }, subject);
  }

  async delete(SubjectID: number) {
    return await this.subjectRepository.delete(SubjectID);
  }
}
