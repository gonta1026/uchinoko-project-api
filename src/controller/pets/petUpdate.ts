// package
import { Request, Response } from "express";
import { Connection } from "typeorm";
// entity
import { Pet } from "../../entity/Pet";
// response
import { sendError, sendOK } from "../../response";

export const petUpdate = (db: Connection) => {
    return async (req: Request, res: Response) => {
        try {
            // パスパラメータを取得します
            const id = req.params.id;

            // Petオブジェクトを取得します
            const petRepository = db.getRepository(Pet);
            const pet = await petRepository.findOne({
                where: {
                    id: id,
                },
            });

            // 見つからなかった場合
            if (!pet) {
                return res.status(404).send({
                    status: 404,
                    message: "Not found.",
                });
            }

            // リクエストパラメータを取得します
            const name = req.body.name || pet.name;
            const sex = req.body.sex || pet.sex;
            const imagePath = req.body.imagePath || pet.imagePath;
            const attractiveFeature =
                req.body.attractiveFeature || pet.attractiveFeature;
            const userId = req.body.userId || pet.userId;
            const birthday = req.body.birthday || pet.birthday;
            const pickupDate = req.body.pickupDate || pet.pickupDate;

            // オブジェクトに代入します
            pet.name = name;
            pet.sex = sex;
            pet.imagePath = imagePath;
            pet.attractiveFeature = attractiveFeature;
            pet.userId = userId;
            pet.birthday = birthday;
            pet.pickupDate = pickupDate;

            // リポジトリに保存します
            await petRepository.save(pet);

            return sendOK(res, pet);
        } catch (error) {
            return sendError(res, 500, error);
        }
    };
};
