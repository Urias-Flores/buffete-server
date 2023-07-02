import { Subcategory } from 'src/subcategory/subcategory.entity';
import { User } from 'src/user/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity('category')
export class Category {
  @PrimaryGeneratedColumn({ type: 'int' })
  CategoryID: number;

  @ManyToOne(() => User, (user) => user.Categories)
  @Column({ type: 'int' })
  User: User;

  @Column({ type: 'varchar', length: 30 })
  Name: string;

  @Column({ type: 'datetime' })
  CreatedDate: Date;

  @Column({ type: 'datetime' })
  UpdatedDate: Date;

  @OneToMany(() => Subcategory, (subcategory) => subcategory.Category)
  Subcategories: Subcategory[];
}
