import { Entity, Column, PrimaryGeneratedColumn,PrimaryColumn } from "typeorm"

@Entity()
export class model {

    @PrimaryGeneratedColumn()
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

    @Column("text")
    owner: string

    @Column("text")
    owner_password
}

@Entity()
export class user_datas {
        
    @PrimaryGeneratedColumn()
    id: number;

    @Column("text")
    username: string

    @Column("text")
    password: string
}