import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { SubjectService } from './subject.service';
import { SubjectEntity } from './subject.entity';
import { DeleteResult, UpdateResult } from 'typeorm';

@Controller('subjects')
export class SubjectController {
  constructor(private readonly subjectService: SubjectService) {}

  @Get()
  async findAll(): Promise<SubjectEntity[]> {
    return await this.subjectService.findAll();
  }

  @Get(':id')
  async findByID(@Param('id') id: number): Promise<SubjectEntity> {
    return await this.subjectService.findByID(id);
  }

  @Post()
  async save(@Body() subject: SubjectEntity): Promise<SubjectEntity> {
    return await this.subjectService.save(subject);
  }

  @Put()
  async update(@Body() subject: any): Promise<UpdateResult> {
    return await this.subjectService.update(subject);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<DeleteResult> {
    return await this.subjectService.delete(id);
  }
}
