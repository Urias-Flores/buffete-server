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

@Module({
  imports: [ TypeOrmModule.forRoot({
    "type": "mysql",
    "host": "localhost",
    "port": 3306,
    "username": "root",
    "password": "alone2020",
    "database": "buffetedb",
    "entities": [ User, Client, Category, Subcategory, Document ],
    "synchronize": true
  }), UserModule, ClientModule, CategoryModule, SubcategoryModule, DocumentModule, CloudinaryModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
