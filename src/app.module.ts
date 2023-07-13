import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ClientModule } from './client/client.module';
import { CategoryModule } from './category/category.module';
import { SubcategoryModule } from './subcategory/subcategory.module';
import { DocumentModule } from './document/document.module';
import { User } from './user/user.entity';
import { Category } from './category/category.entity';
import { Subcategory } from './subcategory/subcategory.entity';
import { Client } from './client/client.entity';
import { Document } from './document/document.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

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
        entities: [User, Client, Category, Subcategory, Document],
        synchronize: true,
        ssl: true,
      }),
      inject: [ConfigService],
    }),
    UserModule,
    ClientModule,
    CategoryModule,
    SubcategoryModule,
    DocumentModule,
    CloudinaryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
