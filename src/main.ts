import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import * as fs from 'fs';

async function bootstrap() {
  dotenv.config();

  /*
  const httpsOptions = {
    key: fs.readFileSync('/home/buffete/certificates/grupo-sosamorales/private.key'),
    cert: fs.readFileSync('/home/buffete/certificates/grupo-sosamorales/certificate.crt'),
    ca: fs.readFileSync('/home/buffete/certificates/grupo-sosamorales/ca_bundle.crt'),
  }
  */

  const app = await NestFactory.create(AppModule /*, { httpsOptions }*/);
  app.setGlobalPrefix('/api');
  app.enableCors();
  await app.listen(process.env.PORT || 8000);
}
bootstrap();
