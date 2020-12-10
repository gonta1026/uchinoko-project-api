import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
} from "typeorm";

import { Pet } from "./Pet";
import { Like } from "./Like";

@Entity({ name: "user" })
export class User {
    @PrimaryGeneratedColumn()
    private readonly id?: number;

    @Column()
    public name: string;

    @Column()
    public password: string;

    @Column()
    public email: string;

    @CreateDateColumn()
    readonly createdAt?: Date;

    @UpdateDateColumn()
    readonly updatedAt?: Date;

    @OneToMany(type => Pet, pet => pet.user)
    pets?: Pet[];

    @OneToMany(type => Like, like => like.user)
    likes?: Like[];

    constructor(name: string, password: string, email: string, age: number) {
        this.name = name;
        this.password = password;
        this.email = email;
    }
}
