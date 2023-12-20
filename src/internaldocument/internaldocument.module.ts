import { Module } from '@nestjs/common';
import { InternalDocumentController } from './internaldocument.controller';
import { InternalDocumentService } from './internaldocument.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InternalDocumentEntity } from './internaldocument.entity';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    TypeOrmModule.forFeature([InternalDocumentEntity]),
    MulterModule.register({ dest: './internal-files' }),
  ],
  controllers: [InternalDocumentController],
  providers: [InternalDocumentService],
})
export class InternalDocumentModule {}
