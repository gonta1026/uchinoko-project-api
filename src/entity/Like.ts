import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";

import { User } from "./User";
import { Post } from "./Post";

@Entity({ name: "like" })
export class Like {
    @PrimaryGeneratedColumn()
    readonly id?: number;

    @Column()
    readonly userId: number;

    @Column()
    readonly postId: number;

    @CreateDateColumn()
    readonly createdAt?: Date;

    @UpdateDateColumn()
    readonly updatedAt?: Date;

    @ManyToOne(type => User, user => user.likes)
    @JoinColumn({ name: "userId" })
    readonly user?: User;

    @ManyToOne(type => Post, post => post.likes)
    @JoinColumn({ name: "postId" })
    readonly post?: Post;

    constructor(userId: number, postId: number) {
        this.userId = userId;
        this.postId = postId;
    }
}
