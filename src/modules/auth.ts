import jwt from "jsonwebtoken";
import { Response, NextFunction } from "express";
import "../lib/env";
const env = process.env;
const KEY = env.SECRET_KEY as string;

export const auth = (req: any, res: Response, next: NextFunction) => {
    // リクエストヘッダーからトークンの取得
    let token = "";
    if (
        req.headers.authorization &&
        req.headers.authorization.split(" ")[0] === "Bearer"
    ) {
        token = req.headers.authorization.split(" ")[1];
    } else {
        // return next("token none");
        return res.status(400).send({
            status: 401,
            message: "Unauthorized",
        });
    }
    // トークンの検証
    jwt.verify(token, KEY, function (err, decoded) {
        if (err) {
            // 認証NGの場合
            // next(err.message);
            return res.status(403).send({
                status: 403,
                message: "Forbidden",
            });
        } else {
            // 認証OKの場合
            req.decoded = decoded;
            next();
        }
    });
};
