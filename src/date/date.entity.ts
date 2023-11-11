import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ClientEntity } from '../client/client.entity';
import { UserEntity } from '../user/user.entity';

@Entity('date')
export class DateEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  DateID: number;

  @Column({ type: 'varchar', length: 300})
  Issue: string;

  @ManyToOne(() => ClientEntity, (client: ClientEntity) => client.Dates)
  @Column({ type: 'int' })
  Client: number;

  @ManyToOne(() => UserEntity, (user: UserEntity) => user.Dates)
  @Column({ type: 'int' })
  User: number;

  @Column({ type: 'timestamp' })
  DateTime: Date;

  @Column({ type: 'varchar', length: 1 })
  State: string;
}
