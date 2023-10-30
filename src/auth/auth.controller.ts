import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ResponseDto } from './auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  login(@Body() body: any): Promise<ResponseDto> {
    return this.authService.login(body);
  }
}
