// package
import { Request, Response } from "express";
import { Connection } from "typeorm";
// entity
import { Like } from "../../entity";
// response
import { sendError, sendOK } from "../../response";

export const likeDelete = (db: Connection) => {
    return async (req: Request, res: Response) => {
        try {
            // Get request parameters
            const userId = req.body.userId as number;
            const postId = req.body.postId as number;

            // Get liks from DB
            const likeRepository = db.getRepository(Like);
            const like = await likeRepository.findOne({
                where: {
                    userId: userId,
                    postId: postId,
                },
            });

            // Not found
            if (!like) {
                return res.status(404).send({
                    status: 404,
                    message: "Not found.",
                });
            }

            // Delete a like
            await likeRepository.remove(like);

            // Response
            return sendOK(res, "Successfully deleted.");
        } catch (error) {
            return sendError(res, 500, error);
        }
    };
};
