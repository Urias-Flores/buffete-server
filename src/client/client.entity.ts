import { Document } from 'src/document/document.entity';
import { User } from 'src/user/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity('client')
export class Client {
  @PrimaryGeneratedColumn({ type: 'int' })
  ClientID: number;

  @ManyToOne(() => User, (user) => user.Clients)
  @Column({ type: 'int' })
  User: User;

  @Column({ type: 'varchar', length: 80 })
  Name: string;

  @Column({ type: 'varchar', length: 13 })
  Identity: string;

  @Column({ type: 'varchar', length: 80 })
  Email: string;

  @Column({ type: 'varchar', length: 15 })
  Phone: string;

  @Column({ type: 'text' })
  Address: string;

  @Column({ type: 'varchar', length: 84 })
  URL: string;

  @OneToMany(() => Document, (document) => document.Client)
  Documents: Document[];
}
