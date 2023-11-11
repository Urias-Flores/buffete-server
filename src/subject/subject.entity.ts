import { DocumentEntity } from '../document/document.entity';
import { UserEntity } from '../user/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity('subject')
export class SubjectEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  SubjectID: number;

  @ManyToOne(() => UserEntity, (user) => user.Subjects)
  @Column({ type: 'int' })
  User: UserEntity;

  @Column({ type: 'varchar', length: 30 })
  Name: string;

  @Column({ type: 'timestamp' })
  CreatedDate: Date;

  @Column({ type: 'timestamp' })
  UpdatedDate: Date;

  @OneToMany(() => DocumentEntity, (document) => document.Subject)
  Documents: DocumentEntity[];
}
