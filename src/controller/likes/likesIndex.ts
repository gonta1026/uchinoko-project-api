// package
import { Request, Response } from "express";
import { send } from "process";
import { Connection } from "typeorm";
// entity
import { Like } from "../../entity";
// response
import { sendError, sendOK } from "../../response";

export const likesIndex = (db: Connection) => {
    return async (req: Request, res: Response) => {
        try {
            // Get request parameter
            const userId = req.body.userId as number;

            // Get likes from DB
            const likeRepository = db.getRepository(Like);
            const likes = await likeRepository.find({
                where: {
                    userId: userId,
                },
            });

            // Not found
            if (likes.length === 0) {
                return res.status(404).send({
                    status: 404,
                    message: "Not found.",
                });
            }

            // Response
            return sendOK(res, likes);
        } catch (error) {
            return sendError(res, 500, error);
        }
    };
};
