import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SubjectEntity } from './subject.entity';
import {
  DeleteResult,
  QueryFailedError,
  Repository,
  UpdateResult,
} from 'typeorm';

@Injectable()
export class SubjectService {
  constructor(
    @InjectRepository(SubjectEntity)
    private readonly subjectRepository: Repository<SubjectEntity>,
  ) {}

  async findAll(): Promise<SubjectEntity[]> {
    try {
      return await this.subjectRepository.find({
        relations: ['Documents', 'User'],
        order: { Name: 'ASC' },
      });
    } catch (error) {
      throw new HttpException('Las materias no pudieron ser recuperadas', 500);
    }
  }

  async findByID(SubjectID: any): Promise<SubjectEntity> {
    try {
      const subjects = await this.subjectRepository.find({
        relations: ['Documents', 'User'],
        where: {
          SubjectID: SubjectID,
        },
        order: { Name: 'ASC' },
      });

      return subjects[0];
    } catch (error) {
      if (error instanceof QueryFailedError) {
        throw new HttpException(
          'El id de la materia no es valido o no es un numero',
          400,
        );
      }
      throw new HttpException('Error al obtener materia', 500);
    }
  }

  async save(subject: SubjectEntity): Promise<SubjectEntity> {
    try {
      subject.CreatedDate = new Date();
      subject.UpdatedDate = new Date();
      return await this.subjectRepository.save(subject);
    } catch (error) {
      throw new HttpException('La materia no pudo ser almacenada', 500);
    }
  }

  async update(subject: SubjectEntity): Promise<UpdateResult> {
    if (!subject.SubjectID) {
      throw new HttpException('Debe incluir el id de la materia', 400);
    }
    try {
      subject.UpdatedDate = new Date();
      return await this.subjectRepository.update(
        { SubjectID: subject.SubjectID },
        subject,
      );
    } catch (error) {
      throw new HttpException('La materia no pudo ser actualizada', 500);
    }
  }

  async delete(SubjectID: number): Promise<DeleteResult> {
    try {
      return await this.subjectRepository.delete(SubjectID);
    } catch (error) {
      if (error instanceof QueryFailedError) {
        throw new HttpException(
          'El id de la materia no es valido o no es un numero',
          400,
        );
      }
      throw new HttpException('La materia no pudo ser eliminada', 500);
    }
  }
}
