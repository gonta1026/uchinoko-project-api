// package
import { Request, Response } from "express";
import { send } from "process";
import { Connection } from "typeorm";
// entity
import { Post } from "../../entity";
// response
import { sendError, sendOK } from "../../response";

export const postsIndex = (db: Connection) => {
    return async (req: Request, res: Response) => {
        try {
            const postRepository = db.getRepository(Post);
            const posts = await postRepository.find();

            if (!posts) {
                return res.status(404).send({
                    status: 404,
                    message: "Not Found.",
                });
            }

            return sendOK(res, posts);
        } catch (error) {
            return sendError(res, 500, error);
        }
    };
};
