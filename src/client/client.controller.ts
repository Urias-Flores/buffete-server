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
import { ClientEntity } from './client.entity';
import { DeleteResult, UpdateResult } from 'typeorm';

@Controller('clients')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Get()
  findAllClients(): Promise<ClientEntity[]> {
    return this.clientService.findAll();
  }

  @Get(':id')
  findClientByID(@Param() params: any): Promise<ClientEntity> {
    const id = params.id;
    return this.clientService.findByID(id);
  }

  @Post()
  createClient(@Body() client: ClientEntity): Promise<ClientEntity> {
    return this.clientService.save(client);
  }

  @Put()
  updateClient(@Body() client: ClientEntity): Promise<UpdateResult> {
    return this.clientService.update(client);
  }

  @Delete(':id')
  deleteClient(@Param() params: any): Promise<DeleteResult> {
    const id = params.id;
    return this.clientService.delete(id);
  }
}
