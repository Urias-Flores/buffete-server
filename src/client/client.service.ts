import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from './client.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/user.entity';
import { Document } from '../document/document.entity';
import { Subject } from '../subject/subject.entity';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
    @InjectRepository(Subject)
    private readonly subjectRepository: Repository<Subject>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Document)
    private readonly documentRepository: Repository<Document>,
  ) {}

  async findAll(): Promise<Client[]> {
    return await this.clientRepository.find({
      relations: ['User', 'Documents'],
    });
  }

  async findByID(ClientID: number) {
    return await this.clientRepository.find({
      where: { ClientID: ClientID },
      relations: ['User', 'Documents'],
    });
  }

  async findByURL(URL: string) {
    return await this.clientRepository.find({
      where: { URL: URL },
      relations: ['User', 'Documents'],
    });
  }

  async save(client: Client): Promise<Client> {
    client.URL = client.Name.replace(/ /g, '-');
    return await this.clientRepository.save(client);
  }

  async update(ClientID: number, client: Client) {
    return await this.clientRepository.update({ ClientID }, client);
  }

  async delete(ClientID: number) {
    return await this.clientRepository.delete(ClientID);
  }
}
