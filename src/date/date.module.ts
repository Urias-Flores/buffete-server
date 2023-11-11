import { Module } from '@nestjs/common';
import { DateService } from './date.service';
import { DateController } from './date.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DateEntity } from './date.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DateEntity])],
  providers: [DateService],
  controllers: [DateController],
})
export class DateModule {}
