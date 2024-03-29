import { HttpException, HttpStatus, Inject, Injectable, forwardRef } from '@nestjs/common';
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
import { DocumentEntity } from 'src/document/document.entity';
import { DocumentService } from 'src/document/document.service';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(ClientEntity)
    private readonly clientRepository: Repository<ClientEntity>,
    private readonly documentService: DocumentService,
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

      if(fs.existsSync(oldPath)){
        client.URL = client.Name.replace(/ /g, '-');
        const newPath: string = path.join(__dirname, '..', '..', './files', client.URL);

        fs.rename(oldPath, newPath, (error) => {
          if (error) throw new HttpException('Error al renombrar carpeta de archivos', 500);
        });

        currentClient.Documents.forEach( (document: DocumentEntity) => {
          document.URL = path.join(newPath.split('/').pop(), document.URL.split('/')[1]);
          this.documentService.update(document);
        });
      }
  
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
