import { Module, forwardRef } from '@nestjs/common';
import { DocumentService } from './document.service';
import { DocumentController } from './document.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocumentEntity } from './document.entity';
import { MulterModule } from '@nestjs/platform-express';
import { SubjectModule } from '../subject/subject.module';
import { ClientModule } from '../client/client.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([DocumentEntity]),
    MulterModule.register({ dest: './files' }),
    forwardRef(() => ClientModule),
    SubjectModule,
  ],
  providers: [DocumentService],
  controllers: [DocumentController],
  exports: [DocumentService]
})

export class DocumentModule {}
