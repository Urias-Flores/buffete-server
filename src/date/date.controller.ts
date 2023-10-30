import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { Date } from './date.entity';
import { DateService } from './date.service';
import { DeleteResult, UpdateResult } from 'typeorm';

@Controller('date')
export class DateController {
  constructor(private readonly dateServices: DateService) {}

  @Get()
  getAllDates(): Promise<Date[]> {
    return this.dateServices.getAllDates();
  }

  @Get(':id')
  getDateByID(@Param() params: any): Promise<Date> {
    return this.dateServices.getDateByID(params.id);
  }

  @Post()
  createDate(@Body() body: any): Promise<Date> {
    return this.dateServices.createDate(body);
  }

  @Put(':id')
  updateDate(@Body() body: any, @Param() params: any): Promise<UpdateResult> {
    const dateID = params.id;
    return this.dateServices.updateDate(dateID, body);
  }

  @Delete(':id')
  deleteDate(@Param() params: any): Promise<DeleteResult> {
    const DateID = params.id;
    return this.dateServices.deleteDate(DateID);
  }
}
