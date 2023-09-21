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
    return this.userService.save(user);
  }

  @Put(':id')
  update(@Param('id') id, @Body() user) {
    return this.userService.update(id, user);
  }

  @Delete(':id')
  delete(@Param('id') id) {
    return this.userService.delete(id);
  }
}
