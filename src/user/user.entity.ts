import { Subject } from 'src/subject/subject.entity';
import { Client } from 'src/client/client.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { InternalDocument } from '../internaldocument/internaldocument.entity';
import { Document } from '../document/document.entity';
import { Date } from '../date/date.entity';

@Entity('user')
export class User {
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

  @OneToMany(() => Client, (client) => client.User)
  Clients: Client[];

  @OneToMany(() => Subject, (subject) => subject.User)
  Subjects: Subject[];

  @OneToMany(
    () => InternalDocument,
    (internalDocument) => internalDocument.User,
  )
  InternalDocuments: InternalDocument[];

  @OneToMany(() => Document, (document: Document) => document.User)
  Documents: Document[];

  @OneToMany(() => Date, (date: Date) => date.User)
  Dates: Date[];
}
