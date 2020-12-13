// TypeORM
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";
// Entity
import { Pet } from "./Pet";
import { User } from "./User";

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    readonly id?: number;

    @Column()
    imagePath: string;

    @Column()
    description: string;

    @Column()
    isPublished: boolean;

    @Column()
    userId: number;

    @ManyToOne(type => User, user => user.posts)
    @JoinColumn({ name: "userId" })
    user?: User;

    @Column()
    petId: number;

    @ManyToOne(type => Pet, pet => pet.posts)
    @JoinColumn({ name: "petId" })
    pet?: Pet;

    @CreateDateColumn()
    readonly createdAt?: Date;

    @UpdateDateColumn()
    readonly updatedAt?: Date;

    constructor(
        imagePath: string,
        description: string,
        isPublished: boolean,
        userId: number,
        petId: number
    ) {
        this.imagePath = imagePath;
        this.description = description;
        this.isPublished = isPublished;
        this.userId = userId;
        this.petId = petId;
    }
}
