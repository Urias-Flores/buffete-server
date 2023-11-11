import { UserEntity } from '../user/user.entity';

export class AuthDto {
  Email_Name: string;
  Password: string;
}

export class ResponseDto {
  Result: number;
  Message: string;
  User: UserEntity;

  constructor(Result: number, Message: string, User: UserEntity) {
    this.Result = Result;
    this.Message = Message;
    this.User = User;
  }
}
