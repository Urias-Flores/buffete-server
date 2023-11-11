import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { DateEntity } from './date.entity';
import { DateService } from './date.service';
import { DeleteResult, UpdateResult } from 'typeorm';

@Controller('dates')
export class DateController {
  constructor(private readonly dateServices: DateService) {}

  @Get()
  getAllDates(): Promise<DateEntity[]> {
    return this.dateServices.findAll();
  }

  @Get(':id')
  getDateByID(@Param() params: any): Promise<DateEntity> {
    return this.dateServices.findByID(params.id);
  }

  @Post()
  createDate(@Body() body: any): Promise<DateEntity> {
    return this.dateServices.createDate(body);
  }

  @Put()
  updateDate(@Body() body: any): Promise<UpdateResult> {
    return this.dateServices.updateDate(body);
  }

  @Delete(':id')
  deleteDate(@Param() params: any): Promise<DeleteResult> {
    const DateID = params.id;
    return this.dateServices.deleteDate(DateID);
  }
}
