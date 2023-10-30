import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Client } from '../client/client.entity';
import { User } from '../user/user.entity';

@Entity('date')
export class Date {
  @PrimaryGeneratedColumn({ type: 'int' })
  DateID: number;

  @Column({ type: 'varchar', length: 300})
  Issue: string;

  @ManyToOne(() => Client, (client: Client) => client.Dates)
  @Column({ type: 'int' })
  Client: number;

  @ManyToOne(() => User, (user: User) => user.Dates)
  @Column({ type: 'int' })
  User: number;

  @Column({ type: 'timestamp' })
  DateTime: Date;

  @Column({ type: 'varchar', length: 1 })
  State: string;
}
