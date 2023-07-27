import { Controller, Get } from '@nestjs/common';

@Controller('app')
export class AppController {
  @Get()
  Home(): string {
    return 'Hello word!';
  }
}
