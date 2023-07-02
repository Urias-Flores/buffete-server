import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { ClientService } from './client.service';

@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Get()
  findAll() {
    return this.clientService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.clientService.findByID(id);
  }

  @Get('/URL/:URL')
  findByURL(@Param('URL') URL: string) {
    return this.clientService.findByURL(URL);
  }

  @Post()
  create(@Body() client) {
    return this.clientService.save(client);
  }

  @Put(':id')
  update(@Param('id') id, @Body() client) {
    return this.clientService.update(id, client);
  }

  @Delete(':id')
  delete(@Param('id') id) {
    return this.clientService.delete(id);
  }
}
