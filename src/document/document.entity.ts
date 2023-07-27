import { Client } from 'src/client/client.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Subject } from '../subject/subject.entity';

@Entity('document')
export class Document {
  @PrimaryGeneratedColumn({ type: 'int' })
  DocumentID: number;

  @ManyToOne(() => Subject, (subject: Subject) => subject.Documents)
  @Column({ type: 'int' })
  Subject: number;

  @ManyToOne(() => Client, (client: Client) => client.Documents)
  @Column({ type: 'int' })
  Client: number;

  @Column({ type: 'varchar', length: 30 })
  Name: string;

  @Column({ type: 'text' })
  URL: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  CreatedDate: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  UpdatedDate: Date;
}
