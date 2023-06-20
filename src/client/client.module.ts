import { Module } from '@nestjs/common';
import { ClientController } from './client.controller';
import { ClientService } from './client.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from './client.entity';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/user.entity';

@Module({
  imports: [ TypeOrmModule.forFeature([Client, User]) ],
  controllers: [ClientController],
  providers: [ClientService]
})
export class ClientModule {}
