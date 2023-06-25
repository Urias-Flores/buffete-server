import { Category } from 'src/category/category.entity';
import { Client } from 'src/client/client.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
@Entity('user')
export class User {
  @PrimaryGeneratedColumn({ type: 'int' })
  UserID: number;

  @Column({ type: 'varchar', length: 80 })
  Name: string;

  @Column({ type: 'varchar', length: 166 })
  Password: string;

  @Column({ type: 'varchar', length: 6, nullable: true })
  Token: string;

  @Column({ type: 'int' })
  State: number;

  @OneToMany((type) => Client, (client) => client.User)
  Clients: Client[];

  @OneToMany((type) => Category, (category) => category.User)
  Categories: Category[];
}
