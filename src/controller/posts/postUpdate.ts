// package
import { Request, Response } from "express";
import { Connection } from "typeorm";
// entity
import { Post } from "../../entity";
// response
import { sendError, sendOK } from "../../response";

export const postUpdate = (db: Connection) => {
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

            // Get request parameters
            const imagePath = req.body.imagePath || post.imagePath;
            const description = req.body.description || post.description;
            const isPublished = req.body.isPublished || post.isPublished;
            const userId = req.body.userId || post.userId;
            const petId = req.body.petId || post.petId;

            // Assign parameters to post object
            post.imagePath = imagePath;
            post.description = description;
            post.isPublished = isPublished;
            post.userId = userId;
            post.petId = petId;

            // Save
            await postRepository.save(post);

            // Response
            return sendOK(res, post);
        } catch (error) {
            // Internal Server Error
            return sendError(res, 500, error);
        }
    };
};
