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
import { InternalDocumentModule } from './internaldocument/internaldocument.module';
import { InternalDocument } from './internaldocument/internaldocument.entity';
import { AuthModule } from './auth/auth.module';
import { DateModule } from './date/date.module';
import { Date } from './date/date.entity';

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
        entities: [User, Client, Subject, Document, InternalDocument, Date],
        synchronize: true,
        ssl: false,
      }),
      inject: [ConfigService],
    }),
    UserModule,
    ClientModule,
    SubjectModule,
    DocumentModule,
    InternalDocumentModule,
    AuthModule,
    DateModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CorsMiddleware).forRoutes('*');
  }
}
