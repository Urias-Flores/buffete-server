import { ClientEntity } from '../client/client.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { SubjectEntity } from '../subject/subject.entity';
import { UserEntity } from '../user/user.entity';

@Entity('document')
export class DocumentEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  DocumentID: number;

  @ManyToOne(() => SubjectEntity, (subject: SubjectEntity) => subject.Documents)
  @Column({ type: 'int' })
  Subject: number;

  @ManyToOne(() => ClientEntity, (client: ClientEntity) => client.Documents)
  @Column({ type: 'int' })
  Client: number;

  @ManyToOne(() => UserEntity, (user: UserEntity) => user.Documents)
  @Column({ type: 'int' })
  User: number;

  @Column({ type: 'varchar', length: 30 })
  Name: string;

  @Column({ type: 'text' })
  URL: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  CreatedDate: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  UpdatedDate: Date;
}
