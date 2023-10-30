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

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.userService.findByID(id);
  }

  @Post()
  create(@Body() user: any) {
    return this.userService.createUser(user);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() user: any) {
    return this.userService.updateUser(id, user);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.userService.deleteUser(id);
  }
}
