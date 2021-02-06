// package
import { Request, Response } from "express";
import { check, validationResult } from "express-validator";
import { Connection } from "typeorm";
// entity
import { Pet } from "../../entity/Pet";
// response
import { sendError } from "../../response";

// validation setting
export const validatePetCreate = [
    check("name").not().isEmpty(),
    check("sex").not().isEmpty(),
    // check("imagePath").not().isEmpty(),
    check("userId").not().isEmpty(),
    // check("attractiveFeature").not().isEmpty(),
    check("birthday").not().isEmpty(),
    check("pickupDate").not().isEmpty(),
];

export const petCreate = (db: Connection) => {
    return async (req: Request, res: Response) => {
        try {
            // validation check
            const errors = validationResult(req);
            console.log(errors);

            if (errors.isEmpty()) {
                // リクエストを取得
                const name = req.body.name || "";
                const sex = req.body.sex || "";
                const imagePath = req.body.imagePath || "";
                const attractiveFeature = req.body.attractiveFeature || "";
                const userId = req.body.userId || "";
                const birthday = req.body.birthday || "";
                const pickupDate = req.body.pickupDate || "";

                // リポジトリ作成
                const petRepository = db.getRepository(Pet);

                // Petオブジェクト作成
                const pet = petRepository.create({
                    name,
                    sex,
                    imagePath,
                    attractiveFeature,
                    userId,
                    birthday,
                    pickupDate,
                });

                // save
                await petRepository.save(pet);

                return res.status(201).send({
                    status: 201,
                    message: "success!",
                });
            }

            return res.status(400).send({
                status: 400,
                message: "Invalid parameters.",
            });
        } catch (error) {
            return sendError(res, 500, error);
        }
    };
};
