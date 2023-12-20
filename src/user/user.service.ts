import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userRepository.find({
      relations: ['Clients'],
    });
  }

  async findByID(UserID: number): Promise<User> {
    return await this.userRepository.findOneBy({ UserID: UserID });
  }

  async save(user: User): Promise<User> {
    return await this.userRepository.save(user);
  }

  async update(UserID: number, user: User): Promise<UpdateResult> {
    return await this.userRepository.update({ UserID }, user);
  }

  async delete(UserID: number): Promise<DeleteResult> {
    return await this.userRepository.delete(UserID);
  }
}
