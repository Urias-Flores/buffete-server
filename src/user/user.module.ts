import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { HashService } from './hash.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService, HashService],
  controllers: [UserController],
  exports: [HashService],
})
export class UserModule {}
