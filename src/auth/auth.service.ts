import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../user/user.entity';
import { Repository } from 'typeorm';
import { HashService } from '../user/hash.service';
import { AuthDto, ResponseDto } from './auth.dto';
import { response } from "express";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userService: Repository<UserEntity>,
    private readonly hashService: HashService,
  ) {}

  async login(user: AuthDto): Promise<ResponseDto> {
    const users: UserEntity[] = await this.userService
      .createQueryBuilder('user')
      .where('user.Email = :Email_Name', {
        Email_Name: user.Email_Name,
      })
      .getMany();

    if (users.length === 0) {
      return new ResponseDto(-2, 'Email or name not found', null);
    }

    const passwordMatch = await this.hashService.comparePasswords(
      user.Password,
      users[0].Password,
    );

    if (!passwordMatch) {
      return new ResponseDto(-1, 'Incorrect Password', null);
    } else {
      if (users[0].State === 0) {
        return new ResponseDto(0, 'Inactive user', null);
      }
      return new ResponseDto(1, 'Success', users[0]);
    }
  }
}
