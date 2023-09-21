export class AuthDto {
  Email_Name: string;
  Password: string;
}

export class ResponseDto {
  Result: number;
  Message: string;

  constructor(Result: number, Message: string) {
    this.Result = Result;
    this.Message = Message;
  }
}
