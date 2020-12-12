// package
import { Request, Response } from "express";
import { Connection } from "typeorm";
// entity
import { Pet } from "../../entity/Pet";
// response
import { sendError, sendOK } from "../../response";

export const petShow = (db: Connection) => {
    return async (req: Request, res: Response) => {
        try {
            const petRepository = db.getRepository(Pet);
            const id = req.params.id;
            const pet = await petRepository.findOne({
                where: {
                    id: id,
                },
            });

            // うちの子が存在しない場合
            if (!pet) {
                return res.status(404).send({
                    status: 404,
                    message: "Not found.",
                });
            }

            return sendOK(res, pet);
        } catch (error) {
            return sendError(res, 500, error);
        }
    };
};
