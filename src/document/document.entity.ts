import { Client } from 'src/client/client.entity';
import { Subcategory } from 'src/subcategory/subcategory.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity('document')
export class Document {
    @PrimaryGeneratedColumn({ type: 'int' })
    DocumentID: number;

    @ManyToOne(type => Subcategory, subcategory => subcategory.Documents)
    @Column({ type: 'int' })
    Subcategory: Subcategory;

    @ManyToOne(type => Client, client => client.Documents)
    @Column({ type: 'int' })
    Client: Client;

    @Column({ type: 'varchar', length: 30 })
    Name: string;

    @Column({ type: 'text'})
    URL: string;

    @Column({ type: 'datetime' })
    CreatedDate: Date

    @Column({ type: 'datetime' })
    UpdatedDate: Date
}