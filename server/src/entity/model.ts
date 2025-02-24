import { Entity, Column, PrimaryGeneratedColumn,PrimaryColumn } from "typeorm"

@Entity()
export class model {

    @PrimaryColumn("integer")
    id: number;

    @Column("text")
    name: string

    @Column("text")
    type: string

    @Column("text")
    description: string

    @Column("text")
    data: string

    @Column("text")
    hash: string
}
