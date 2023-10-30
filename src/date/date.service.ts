import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Date } from './date.entity';
import { DeleteResult, Repository, UpdateResult } from "typeorm";

@Injectable()
export class DateService {
  constructor(
    @InjectRepository(Date)
    private readonly dateRepository: Repository<Date>,
  ) {}

  async getAllDates(): Promise<Date[]> {
    return await this.dateRepository.find({
      relations: ['User', 'Client'],
    });
  }

  async getDateByID(dateID: number): Promise<Date> {
    const dates = await this.dateRepository.find({
      relations: ['User', 'Client'],
      where: { DateID: dateID },
    });
    return dates[0];
  }

  async createDate(date: Date): Promise<Date> {
    return await this.dateRepository.save(date);
  }

  async updateDate(DateID: number, date: Date): Promise<UpdateResult> {
    return await this.dateRepository.update(
      {
        DateID: date.DateID,
      },
      date,
    );
  }

  async deleteDate(DateID: number): Promise<DeleteResult> {
    return await this.dateRepository.delete({ DateID: DateID });
  }
}
