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

import { User } from "./User";
import { Post } from "./Post";

enum Sex {
    MALE = "male",
    FEMALE = "female",
}

@Entity({ name: "pet" })
export class Pet {
    @PrimaryGeneratedColumn()
    readonly id?: number;

    @Column()
    public name: string;

    @Column("enum", { enum: Sex })
    public sex: Sex;

    @Column()
    public imagePath: string;

    @Column()
    public attractiveFeature: string;

    @Column()
    public userId: number;

    @Column("datetime", { default: null })
    birthday: Date | null = null;

    @Column("datetime", { default: null })
    pickupDate: Date | null = null;

    @CreateDateColumn()
    readonly createdAt?: Date;

    @UpdateDateColumn()
    readonly updatedAt?: Date;

    @ManyToOne(type => User, user => user.pets)
    @JoinColumn({ name: "userId" })
    readonly user?: User;

    @OneToMany(type => Post, post => post.pet)
    posts?: Post[];

    constructor(
        name: string,
        userId: number,
        imagePath: string,
        attractiveFeature: string,
        sex: Sex,
        birthday: Date,
        pickupDate: Date
    ) {
        this.name = name;
        this.birthday = birthday;
        this.imagePath = imagePath;
        this.attractiveFeature = attractiveFeature;
        this.sex = sex;
        this.userId = userId;
        this.pickupDate = pickupDate;
    }
}
