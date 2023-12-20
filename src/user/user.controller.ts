import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserEntity } from './user.entity';
import { DeleteResult, UpdateResult } from 'typeorm';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAllUser(): Promise<UserEntity[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  findUserByID(@Param('id') id: number): Promise<UserEntity> {
    return this.userService.findByID(id);
  }

  @Post()
  createUser(@Body() user: any): Promise<UserEntity> {
    return this.userService.save(user);
  }

  @Put()
  updateUser(@Body() user: any): Promise<UpdateResult> {
    return this.userService.update(user);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: number): Promise<DeleteResult> {
    return this.userService.delete(id);
  }
}
