// package
import { Request, Response } from "express";
import { Connection } from "typeorm";
// entity
import { Pet } from "../../entity/Pet";
// response
import { sendError, sendOK } from "../../response";

export const petDelete = (db: Connection) => {
    return async (req: Request, res: Response) => {
        try {
            // パスパラメータを取得します
            const id = req.params.id;

            // DBからPetを取得します
            const petRepository = db.getRepository(Pet);
            const pet = await petRepository.findOne({
                where: {
                    id: id,
                },
            });

            // うちの子が見つからなかった場合
            if (!pet) {
                return res.status(404).send({
                    status: 404,
                    message: "Not found.",
                });
            }

            await petRepository.remove(pet);

            return sendOK(res, "success!");
        } catch (error) {
            return sendError(res, 500, error);
        }
    };
};
