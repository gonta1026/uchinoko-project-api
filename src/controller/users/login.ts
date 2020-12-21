/* package */
import { Request, Response } from "express";
import { check, validationResult } from "express-validator";
import { Connection } from "typeorm";
import jwt from "jsonwebtoken";
/* entity */
import { User } from "../../entity/User";
/* response */
import { sendError, sendOKAtToken } from "../../response";
/* env */
import "../../lib/env";

const KEY = process.env.SECRET_KEY as string;

// Validation settings
export const validateUserLogin = [
    check("email").not().isEmpty(),
    check("password").not().isEmpty(),
];

export const userLogin = (db: Connection) => {
    return async (req: Request, res: Response) => {
        try {
            // Validation
            const errors = validationResult(req);

            // Invalid parameters
            if (!errors.isEmpty()) {
                return sendError(res, 400, "Invalid parameters.");
            }

            // Get request parameters
            const email = req.body.email as string;
            const password = req.body.password as string;

            // Get user from DB
            const userRepository = db.getRepository(User);
            const user = await userRepository.findOne({
                where: {
                    email: email,
                    password: password,
                },
            });

            // Unauthorized
            if (!user) {
                return res.status(401).send({
                    status: 401,
                    message: "Unauthorized",
                });
            }

            // Get user id
            const uid = user.id;

            // Generate token
            const payload = { id: uid };
            const option = { expiresIn: "10d" }; /* 10日にしてみた */
            const token = jwt.sign(payload, KEY, option);

            // Response
            return sendOKAtToken(res, "create token", token);
        } catch (e) {
            console.error(e);
            return sendError(res, 500, "error");
        }
    };
};
