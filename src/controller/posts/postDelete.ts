// package
import { Request, Response } from "express";
import { Connection } from "typeorm";
// entity
import { Post } from "../../entity";
// resopnse
import { sendError, sendOK } from "../../response";

export const postDelete = (db: Connection) => {
    return async (req: Request, res: Response) => {
        try {
            // Get path parameter
            const id = req.params.id;

            // Get post from DB
            const postRepository = db.getRepository(Post);
            const post = await postRepository.findOne({
                where: {
                    id: id,
                },
            });

            // Not found
            if (!post) {
                return res.status(404).send({
                    status: 404,
                    message: "Not found.",
                });
            }

            // Delete post
            await postRepository.remove(post);

            // Response
            return sendOK(res, "success!");
        } catch (error) {
            // Internal Server Error
            return sendError(res, 500, error);
        }
    };
};
