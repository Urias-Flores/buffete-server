import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from './client.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/user.entity';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<Client[]> {
    return await this.clientRepository.find({ relations: ['User'] });
  }

  async findByID(ClientID: number) {
    return await this.clientRepository.findBy({ ClientID });
  }

  async findByURL(URL: string) {
    return await this.clientRepository.findOneBy({ URL: URL });
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
