import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ){}

    async findAll(): Promise<User[]> {
        return await this.userRepository.find({relations: ['Clients', 'Categories']});
    }

    async findByID(UserID: number) {
        return await this.userRepository.findBy({ UserID });
    }

    async save(user: User): Promise<User>{
        return await this.userRepository.save(user);
    }

    async update(UserID: number, user: User){
        return await this.userRepository.update({UserID}, user);
    }

    async delete(UserID: number){
        return await this.userRepository.delete(UserID);
    }
}
