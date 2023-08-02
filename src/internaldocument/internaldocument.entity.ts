import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../user/user.entity';

@Entity('internal-document')
export class InternalDocument {
  @PrimaryGeneratedColumn({ type: 'int' })
  InternalDocumentID: number;

  @ManyToOne(() => User, (user: User) => user.InternalDocuments)
  @Column({ type: 'int' })
  User: number;

  @Column({ type: 'varchar', length: 80 })
  Name: string;

  @Column({ type: 'text' })
  URL: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  CreatedDate: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  UpdatedDate: Date;
}
