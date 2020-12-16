// package
import { Request, Response } from "express";
import { Connection } from "typeorm";
// entity
import { Post } from "../../entity";
// resoponse
import { sendError, sendOK } from "../../response";

export const postShow = (db: Connection) => {
    return async (req: Request, res: Response) => {
        try {
            // リクエストパラメータを取得
            const id = req.params.id;

            // DB接続
            const postRepository = db.getRepository(Post);
            const post = await postRepository.findOneOrFail({
                where: {
                    id: id,
                },
            });

            // 存在しない場合
            if (!post) {
                return res.status(404).send({
                    status: 404,
                    message: "Not Found.",
                });
            }

            // 正常系
            return sendOK(res, post);
        } catch (error) {
            return sendError(res, 500, error);
        }
    };
};
