import { Module, MiddlewareConsumer } from '@nestjs/common';
import { CorsMiddleware } from './cors.middleware';
import { UserModule } from './user/user.module';
import { ClientModule } from './client/client.module';
import { SubjectModule } from './subject/subject.module';
import { DocumentModule } from './document/document.module';
import { User } from './user/user.entity';
import { Subject } from './subject/subject.entity';
import { Client } from './client/client.entity';
import { Document } from './document/document.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USER'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [User, Client, Subject, Document],
        synchronize: true,
        ssl: true,
      }),
      inject: [ConfigService],
    }),
    UserModule,
    ClientModule,
    SubjectModule,
    DocumentModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CorsMiddleware).forRoutes('*');
  }
}
