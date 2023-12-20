import { DocumentEntity } from '../document/document.entity';
import { UserEntity } from '../user/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { DateEntity } from '../date/date.entity';

@Entity('client')
export class ClientEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  ClientID: number;

  @ManyToOne(() => UserEntity, (user) => user.Clients)
  @Column({ type: 'int' })
  User: UserEntity;

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

  @OneToMany(() => DocumentEntity, (document) => document.Client)
  Documents: DocumentEntity[];

  @OneToMany(() => DateEntity, (date: DateEntity) => date.Client)
  Dates: DateEntity[];
}
