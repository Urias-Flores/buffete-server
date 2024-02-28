import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  DeleteResult,
  QueryFailedError,
  Repository,
  UpdateResult,
} from 'typeorm';
import { ClientEntity } from './client.entity';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(ClientEntity)
    private readonly clientRepository: Repository<ClientEntity>,
  ) {}

  async findAll(): Promise<ClientEntity[]> {
    try {
      return await this.clientRepository.find({
        relations: ['User', 'Documents', 'Dates'],
        order: { Name: 'ASC' },
      });
    } catch (error) {
      throw new HttpException('Los clientes no pudieron ser recuperados', 500);
    }
  }

  async findByID(ClientID: any): Promise<ClientEntity> {
    try {
      const clients = await this.clientRepository.find({
        where: { ClientID: ClientID },
        relations: ['User', 'Documents', 'Dates'],
      });
      return clients[0];
    } catch (error) {
      if (error instanceof QueryFailedError) {
        throw new HttpException(
          'El id recibido no es valido o no es un numero',
          400,
        );
      }
      throw new HttpException('Error al obtener cliente', 400);
    }
  }

  async save(client: ClientEntity): Promise<ClientEntity> {
    try {
      client.URL = client.Name.replace(/ /g, '-');
      return await this.clientRepository.save(client);
    } catch (error) {
      console.log(error)
      throw new HttpException('El cliente no pudo ser almacenado', 500);
    }
  }

  async update(client: ClientEntity): Promise<UpdateResult> {
    if (!client.ClientID) {
      throw new HttpException('Debe incluir el id del cliente', 400);
    }
    try {
      const currentClient: ClientEntity = await this.findByID(client.ClientID);
      const oldPath: string = path.join(__dirname, '..', '..', './files', currentClient.URL);

      client.URL = client.Name.replace(/ /g, '-');
      const newPath: string = path.join(__dirname, '..', '..', './files', client.URL);

      fs.rename(oldPath, newPath, (error) => {
        throw new HttpException('Error al renombrar carpeta de archivos del client', 500)
      });
      
  
    return await this.clientRepository.update(
        { ClientID: client.ClientID },
        client,
    );
    } catch (error) {
      throw new HttpException('El cliente no pudo ser actualizado', 500);
    }
  }

  async delete(ClientID: number): Promise<DeleteResult> {
    try {
      return await this.clientRepository.delete(ClientID);
    } catch (error) {
      if (error instanceof QueryFailedError) {
        throw new HttpException(
          'El id del cliente no es valido o no es un numero',
          400,
        );
      }
      throw new HttpException('El cliente no pudo ser eliminado', 500);
    }
  }
}
