import { Category } from 'src/category/category.entity';
import { Document } from 'src/document/document.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity('subcategory')
export class Subcategory {
  @PrimaryGeneratedColumn({ type: 'int' })
  SubcategoryID: number;

  @ManyToOne((type) => Category, (category) => category.Subcategories)
  @Column({ type: 'int' })
  Category: Category;

  @Column({ type: 'varchar', length: 30 })
  Name: string;

  @Column({ type: 'timestamp' })
  CreatedDate: Date;

  @Column({ type: 'timestamp' })
  UpdatedDate: Date;

  @OneToMany((type) => Document, (document) => document.Subcategory)
  Documents: Document[];
}
