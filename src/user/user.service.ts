import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { HashService } from './hash.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly hashServices: HashService,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userRepository.find({
      relations: ['Clients', 'Documents'],
    });
  }

  async findByID(UserID: number): Promise<User> {
    const users = await this.userRepository.find({
      relations: ['Clients', 'Documents'],
      where: { UserID: UserID },
    });
    return users[0];
  }

  async createUser(user: User): Promise<User> {
    user.URL = user.Name.replace(/ /g, '-');
    user.Password = await this.hashServices.hashPassword(user.Password);
    return await this.userRepository.save(user);
  }

  async updateUser(UserID: number, user: User): Promise<UpdateResult> {
    if (user?.Name) {
      user.URL = user.Name.replace(/ /g, '-');
    }
    if (user?.Password) {
      user.Password = await this.hashServices.hashPassword(user.Password);
    }
    return await this.userRepository.update({ UserID: UserID }, user);
  }

  async deleteUser(UserID: number): Promise<DeleteResult> {
    return await this.userRepository.delete(UserID);
  }
}
