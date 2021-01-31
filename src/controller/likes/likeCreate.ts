// package
import { Request, Response } from "express";
import { check, validationResult } from "express-validator";
import { Connection } from "typeorm";
// entity
import { Like, Post, User } from "../../entity";
// response
import { sendError, sendOK } from "../../response";

// Validation setting
export const validateLikeCreate = [
    check("userId").not().isEmpty(),
    check("postId").not().isEmpty(),
];

export const likeCreate = (db: Connection) => {
    return async (req: Request, res: Response) => {
        try {
            // Validation check
            const errors = validationResult(req);

            // Invalid parameters
            if (!errors.isEmpty()) {
                return res.status(400).send({
                    status: 400,
                    message: "Invalid parameters.",
                });
            }

            // Get request
            const userId = req.body.userId as number;
            const postId = req.body.postId as number;

            // Create repository
            const likeRepository = db.getRepository(Like);

            // If like exists
            const existLike = await likeRepository.find({
                where: {
                    userId: userId,
                    postId: postId,
                },
            });

            if (existLike.length !== 0) {
                return res.status(400).send({
                    status: 400,
                    message: "Already exists.",
                });
            }

            // Create like object
            const like = likeRepository.create({
                userId,
                postId,
            });

            // Save
            await likeRepository.save(like);

            // Response
            return res.status(201).send({
                status: 201,
                message: "success!",
            });
        } catch (error) {
            return sendError(res, 500, error);
        }
    };
};
