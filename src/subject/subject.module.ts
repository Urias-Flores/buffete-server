import { Module } from '@nestjs/common';
import { SubjectService } from './subject.service';
import { SubjectController } from './subject.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubjectEntity } from './subject.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SubjectEntity])],
  providers: [SubjectService],
  controllers: [SubjectController],
  exports: [SubjectService],
})
export class SubjectModule {}
