// packages
import { Request, Response } from "express";
import { check, validationResult } from "express-validator";
import { Connection } from "typeorm";
// entity
import { Post } from "../../entity";
// response
import { sendError } from "../../response";

export const validatePostCreate = [
    check("imagePath").not().isEmpty(),
    check("description").not().isEmpty(),
    check("isPublished").not().isEmpty(),
    check("userId").not().isEmpty(),
    check("petId").not().isEmpty(),
];

export const postCreate = (db: Connection) => {
    return async (req: Request, res: Response) => {
        try {
            // Validation check
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).send({
                    status: 400,
                    message: "Invalid parameters.",
                });
            }

            // Get requert body
            const imagePath: string = req.body.imagePath || "";
            const description: string = req.body.description || "";
            const isPublished: boolean = req.body.isPublished || false;
            const userId: number = req.body.userId || 0;
            const petId: number = req.body.petId || 0;

            // Create repository
            const postRepository = db.getRepository(Post);

            // Create post object
            const post = postRepository.create({
                imagePath,
                description,
                isPublished,
                userId,
                petId,
            });

            // Save
            await postRepository.save(post);

            // Return
            return res.status(201).send({
                status: 201,
                message: "success!",
            });
        } catch (error) {
            return sendError(res, 500, error);
        }
    };
};
