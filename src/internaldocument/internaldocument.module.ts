import { Module } from '@nestjs/common';
import { InternalDocumentController } from './internaldocument.controller';
import { InternalDocumentService } from './internaldocument.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InternalDocument } from './internaldocument.entity';

@Module({
  imports: [TypeOrmModule.forFeature([InternalDocument])],
  controllers: [InternalDocumentController],
  providers: [InternalDocumentService],
})
export class InternalDocumentModule {}
