import { Module } from '@nestjs/common';
import { ClientController } from './client.controller';
import { ClientService } from './client.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from './client.entity';
import { Subject } from '../subject/subject.entity';
import { User } from 'src/user/user.entity';
import { Document } from '../document/document.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Client, Subject, User, Document])],
  controllers: [ClientController],
  providers: [ClientService],
})
export class ClientModule {}
