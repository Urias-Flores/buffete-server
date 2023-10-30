import { User } from '../user/user.entity';

export class AuthDto {
  Email_Name: string;
  Password: string;
}

export class ResponseDto {
  Result: number;
  Message: string;
  User: User;

  constructor(Result: number, Message: string, User: User) {
    this.Result = Result;
    this.Message = Message;
    this.User = User;
  }
}
