import { Request, Response } from "express";
import { check, validationResult } from "express-validator";
import { Connection } from "typeorm";
/* entiry */
import { User } from "../../entity/User";
/* response */
import { sendError } from "../../response";

export const validateStoreCreate = [
    check("name").not().isEmpty(),
    check("email").not().isEmpty(),
    check("password").not().isEmpty(),
];

export const userCreate = (db: Connection) => {
    return async (req: Request, res: Response) => {
        try {
            const errors = validationResult(req);

            if (errors.isEmpty()) {
                const name = req.body.name || "";
                const email = req.body.email || "";
                const password = req.body.password || "";
                const userRepository = db.getRepository(User);
                const user = userRepository.create({
                    name,
                    email,
                    password,
                });

                await userRepository.save(user);
                return res.status(200).send({
                    status: 200,
                    message: "success!!!",
                });
            }

            return sendError(res, 400, "Invalid Parameters.");
        } catch (e) {
            console.error(e);
            return sendError(res, 500, "error");
        }
    };
};
