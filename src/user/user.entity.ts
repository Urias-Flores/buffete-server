import { SubjectEntity } from '../subject/subject.entity';
import { ClientEntity } from '../client/client.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { InternalDocumentEntity } from '../internaldocument/internaldocument.entity';
import { DocumentEntity } from '../document/document.entity';
import { DateEntity } from '../date/date.entity';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  UserID: number;

  @Column({ type: 'varchar', length: 80 })
  Name: string;

  @Column({ type: 'varchar', length: 80 })
  Email: string;

  @Column({ type: 'varchar', length: 8 })
  Phone: string;

  @Column({ type: 'varchar', length: 166 })
  Password: string;

  @Column({ type: 'varchar', length: 6, nullable: true })
  Token: string;

  @Column({ type: 'int' })
  State: number;

  @Column({ type: 'varchar', length: 1 })
  AccessLevel: string;

  @Column({ type: 'varchar', length: 80 })
  URL: string;

  @OneToMany(() => ClientEntity, (client) => client.User)
  Clients: ClientEntity[];

  @OneToMany(() => SubjectEntity, (subject) => subject.User)
  Subjects: SubjectEntity[];

  @OneToMany(
    () => InternalDocumentEntity,
    (internalDocument) => internalDocument.User,
  )
  InternalDocuments: InternalDocumentEntity[];

  @OneToMany(() => DocumentEntity, (document: DocumentEntity) => document.User)
  Documents: DocumentEntity[];

  @OneToMany(() => DateEntity, (date: DateEntity) => date.User)
  Dates: DateEntity[];
}
