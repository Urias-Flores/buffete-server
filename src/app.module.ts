import { Module, MiddlewareConsumer } from '@nestjs/common';
import { CorsMiddleware } from './cors.middleware';
import { UserModule } from './user/user.module';
import { ClientModule } from './client/client.module';
import { SubjectModule } from './subject/subject.module';
import { DocumentModule } from './document/document.module';
import { UserEntity } from './user/user.entity';
import { SubjectEntity } from './subject/subject.entity';
import { ClientEntity } from './client/client.entity';
import { DocumentEntity } from './document/document.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { InternalDocumentModule } from './internaldocument/internaldocument.module';
import { InternalDocumentEntity } from './internaldocument/internaldocument.entity';
import { AuthModule } from './auth/auth.module';
import { DateModule } from './date/date.module';
import { DateEntity } from './date/date.entity';

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
        entities: [UserEntity, ClientEntity, SubjectEntity, DocumentEntity, InternalDocumentEntity, DateEntity],
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
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CorsMiddleware).forRoutes('*');
  }
}
