import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DateEntity } from './date.entity';
import {
  DeleteResult,
  QueryFailedError,
  Repository,
  UpdateResult,
} from 'typeorm';

@Injectable()
export class DateService {
  constructor(
    @InjectRepository(DateEntity)
    private readonly dateRepository: Repository<DateEntity>,
  ) {}

  async findAll(): Promise<DateEntity[]> {
    try {
      return await this.dateRepository.find({
        relations: ['User', 'Client'],
      });
    } catch (error) {
      throw new HttpException('Las citas no pudieron ser recuperadas', 500);
    }
  }

  async findByID(dateID: any): Promise<DateEntity> {
    try {
      const dates = await this.dateRepository.find({
        relations: ['User', 'Client'],
        where: { DateID: dateID },
      });
      return dates[0];
    } catch (error) {
      if (error instanceof QueryFailedError) {
        throw new HttpException(
          'El id recibido no es valido o no es un numero',
          400,
        );
      }
      throw new HttpException('Error al obtener la cita', 500);
    }
  }

  async createDate(date: DateEntity): Promise<DateEntity> {
    try {
      return await this.dateRepository.save(date);
    } catch (error) {
      throw new HttpException('La cita no pudo ser almacenada', 500);
    }
  }

  async updateDate(date: DateEntity): Promise<UpdateResult> {
    if (!date.DateID) {
      throw new HttpException('Debe incluir el id de la cita', 400);
    }
    try {
      return await this.dateRepository.update(
        {
          DateID: date.DateID,
        },
        date,
      );
    } catch (error) {
      throw new HttpException('La cita no pudo ser actualizada', 500);
    }
  }

  async deleteDate(DateID: any): Promise<DeleteResult> {
    try {
      return await this.dateRepository.delete({ DateID: DateID });
    } catch (error) {
      if (error instanceof QueryFailedError) {
        throw new HttpException(
          'El id de la cita no es valido o no es un numero',
          400,
        );
      }
      throw new HttpException('La cita no pudo ser eliminada', 500);
    }
  }
}
