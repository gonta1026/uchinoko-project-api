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
            const pets = await petRepository.find();
            return sendOK(res, pets);
        } catch (error) {
            return sendError(res, 500, error);
        }
    };
};
