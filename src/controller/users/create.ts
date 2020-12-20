// package
import { Request, Response } from "express";
import { check, validationResult } from "express-validator";
import { Connection } from "typeorm";
import jwt from "jsonwebtoken";
/* entity */
import { User } from "../../entity/User";
/* response */
import { sendError } from "../../response";

export const validateStoreCreate = [
    check("name").not().isEmpty(),
    check("email").not().isEmpty(),
    check("password").not().isEmpty(),
];

const KEY = process.env.SECRET_KEY as string;

export const userCreate = (db: Connection) => {
    return async (req: Request, res: Response) => {
        try {
            // Validation
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return sendError(res, 400, "Invalid Parameters.");
            }

            // Get request parameters
            const name = req.body.name || "";
            const email = req.body.email || "";
            const password = req.body.password || "";

            // Create user object
            const userRepository = db.getRepository(User);
            const user = userRepository.create({
                name,
                email,
                password,
            });

            // Save
            const generatedUser = await userRepository.save(user);
            const uid = generatedUser.id;

            // Create token
            const payload = { id: uid };
            const option = { expiresIn: "10d" };
            const token = jwt.sign(payload, KEY, option);

            // Response
            return res.status(200).send({
                status: 200,
                message: "success!!!",
                token: token,
            });
        } catch (e) {
            console.error(e);
            return sendError(res, 500, "error");
        }
    };
};
