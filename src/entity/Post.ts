// TypeORM
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";
// Entity
import { Like } from "./Like";
import { Pet } from "./Pet";
import { User } from "./User";

@Entity({ name: "post" })
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

    @OneToMany(type => Like, like => like.post)
    likes?: Like[];

    @CreateDateColumn()
    readonly createdAt?: Date;

    @UpdateDateColumn()
    readonly updatedAt?: Date;

    constructor(
        imagePath: string,
        description: string,
        isPublished: boolean,
        petId: number,
        userId: number
    ) {
        this.imagePath = imagePath;
        this.description = description;
        this.isPublished = isPublished;
        this.petId = petId;
        this.userId = userId;
    }
}
