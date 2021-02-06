// package
import { Request, Response } from "express";
import { Connection } from "typeorm";
// entity
import { Pet } from "../../entity/Pet";
// response
import { sendError, sendOK } from "../../response";

export const petsIndex = (db: Connection) => {
    return async (_req: Request, res: Response) => {
        try {
            const petRepository = db.getRepository(Pet);
            const userId = _req.body.id;
            let pets;
            if (userId) {
                pets = await petRepository.find({
                    where: {
                        userId: userId,
                    },
                });
            } else {
                pets = await petRepository.find();
            }
            return sendOK(res, pets);
        } catch (error) {
            return sendError(res, 500, error);
        }
    };
};
