import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { Repository } from 'typeorm';
import { HashService } from '../user/hash.service';
import { AuthDto, ResponseDto } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userService: Repository<User>,
    private readonly hashService: HashService,
  ) {}

  async login(user: AuthDto): Promise<ResponseDto> {
    const users: User[] = await this.userService
      .createQueryBuilder('user')
      .where('user.Email = :Email_Name', {
        Email_Name: user.Email_Name,
      })
      .getMany();

    if (users.length === 0) {
      return new ResponseDto(-1, 'Email or name not found', null);
    }

    const passwordMatch = await this.hashService.comparePasswords(
      user.Password,
      users[0].Password,
    );

    if (!passwordMatch) {
      return new ResponseDto(0, 'Incorrect Password', null);
    } else {
      return new ResponseDto(1, 'Success', users[0]);
    }
  }
}
