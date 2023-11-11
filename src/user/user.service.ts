import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import {
  DeleteResult,
  QueryFailedError,
  Repository,
  UpdateResult,
} from 'typeorm';
import { HashService } from './hash.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly hashServices: HashService,
  ) {}

  async findAll(): Promise<UserEntity[]> {
    try {
      return await this.userRepository.find({
        relations: ['Clients', 'Documents'],
      });
    } catch (error) {
      throw new HttpException('El usuario no pudieron ser recuperadas', 500);
    }
  }

  async findByID(UserID: any): Promise<UserEntity> {
    try {
      const users = await this.userRepository.find({
        relations: ['Clients', 'Documents'],
        where: { UserID: UserID },
      });
      return users[0];
    } catch (error) {
      if (error instanceof QueryFailedError) {
        throw new HttpException(
          'El id recibido no es valido o no es un numero',
          400,
        );
      }
      throw new HttpException('Error al obtener el usuario', 500);
    }
  }

  async save(user: UserEntity): Promise<UserEntity> {
    try {
      user.URL = user.Name.replace(/ /g, '-');
      user.Password = await this.hashServices.hashPassword(user.Password);
      return await this.userRepository.save(user);
    } catch (error) {
      throw new HttpException('El usuario no pudo ser almacenado', 500);
    }
  }

  async update(user: UserEntity): Promise<UpdateResult> {
    if (!user.UserID) {
      throw new HttpException('Debe incluir el id del usuario', 400);
    }
    try {
      if (user?.Name) {
        user.URL = user.Name.replace(/ /g, '-');
      }
      if (user?.Password) {
        user.Password = await this.hashServices.hashPassword(user.Password);
      }
      return await this.userRepository.update({ UserID: user.UserID }, user);
    } catch (error) {
      throw new HttpException('El usuario no pudo ser actualizado', 500);
    }
  }

  async delete(UserID: any): Promise<DeleteResult> {
    try {
      return await this.userRepository.delete(UserID);
    } catch (error) {
      if (error instanceof QueryFailedError) {
        throw new HttpException(
          'El id del usuario no es valido o no es un numero',
          400,
        );
      }
      throw new HttpException('El usuario no pudo ser eliminado', 500);
    }
  }
}
