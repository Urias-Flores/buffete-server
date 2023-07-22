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
import { Subject } from './subject.entity';
import { DeleteResult, UpdateResult } from 'typeorm';

@Controller('subject')
export class SubjectController {
  constructor(private readonly subjectService: SubjectService) {}

  @Get()
  async findAll(): Promise<Subject[]> {
    return await this.subjectService.findAll();
  }

  @Get(':id')
  async findByID(@Param('id') id: number): Promise<Subject> {
    return await this.subjectService.findByID(id);
  }

  @Post()
  async save(@Body() subject: Subject): Promise<Subject> {
    return await this.subjectService.save(subject);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() subject: any,
  ): Promise<UpdateResult> {
    return await this.subjectService.update(id, subject);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<DeleteResult> {
    return await this.subjectService.delete(id);
  }
}
