import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { UserEntity } from '../user/user.entity';

@Entity('internal-document')
export class InternalDocumentEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  InternalDocumentID: number;

  @ManyToOne(() => UserEntity, (user: UserEntity) => user.InternalDocuments)
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
