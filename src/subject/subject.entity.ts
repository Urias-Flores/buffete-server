import { Document } from 'src/document/document.entity';
import { User } from 'src/user/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity('subject')
export class Subject {
  @PrimaryGeneratedColumn({ type: 'int' })
  SubjectID: number;

  @ManyToOne(() => User, (user) => user.Subjects)
  @Column({ type: 'int' })
  User: User;

  @Column({ type: 'varchar', length: 30 })
  Name: string;

  @Column({ type: 'timestamp' })
  CreatedDate: Date;

  @Column({ type: 'timestamp' })
  UpdatedDate: Date;

  @OneToMany(() => Document, (document) => document.Subject)
  Documents: Document[];
}
