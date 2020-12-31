import { Response, Request, NextFunction } from "express";
import { initializeApp } from "./config/initializer";
import cors from "cors";
import { hogeIndex } from "./controller/sample/hoge";
// Users
import { usersIndex } from "./controller/users";
import { userShow } from "./controller/users/find";
import { userLogin, validateUserLogin } from "./controller/users/login";
import { userEmailChange, userAllChange } from "./controller/users/update";
import { userCreate, validateStoreCreate } from "./controller/users/create";
// Pets
import {
    petsIndex,
    petCreate,
    petDelete,
    petShow,
    petUpdate,
    validatePetCreate,
} from "./controller/pets";
// Posts
import {
    postCreate,
    postDelete,
    postsIndex,
    postShow,
    postUpdate,
    validatePostCreate,
} from "./controller/posts";
// Likes
import {
    likeCreate,
    likeDelete,
    likesIndex,
    validateLikeCreate,
} from "./controller/likes";
// Auth
import { auth } from "./modules/auth";
import "./lib/env";

const env = process.env;
const port: string | number = env.APP_PORT || 5000;

(async (): Promise<void> => {
    const { app, db } = await initializeApp();

    app.use(
        cors({
            origin: true,
            credentials: true,
        })
    );

    app.get("/", (_, res: Response<string>): void => {
        res.send(
            `<h1 style="text-align: center; line-height: 100vh;">Hello Uchinoko!! hosting @${port}</h1>`
        );
    });

    // Users Resource
    app.post("/api/user/login", userLogin(db));
    app.get("/api/user/hoge", hogeIndex());
    // fetch all users
    // curl -X GET 'http://localhost:8080/api/users'
    app.get("/api/v1/users", usersIndex(db));
    app.get("/api/v1/users/:id", userShow(db));
    app.put("/api/v1/users/:id", auth, userEmailChange(db));
    app.put("/api/v1/users/all/:id", auth, userAllChange(db));
    // curl -X POST -H "Content-Type: application/json" -d '{"name":"my shop name", "lastName":"Fast Food", "age":25}' "http://localhost:8080/api/users"
    app.post("/api/v1/users", auth, validateStoreCreate, userCreate(db));

    // Pets Resource
    app.get("/api/v1/pets", petsIndex(db));
    app.get("/api/v1/pets/:id", petShow(db));
    app.post("/api/v1/pets", auth, validatePetCreate, petCreate(db));
    app.put("/api/v1/pets/:id", auth, petUpdate(db));
    app.delete("/api/v1/pets/:id", auth, petDelete(db));

    // Posts Resource
    app.get("/api/v1/posts", postsIndex(db));
    app.get("/api/v1/posts/:id", postShow(db));
    app.post("/api/v1/posts", auth, validatePostCreate, postCreate(db));
    app.put("/api/v1/posts/:id", auth, postUpdate(db));
    app.delete("/api/v1/posts/:id", auth, postDelete(db));

    // Likes Resource
    app.get("/api/v1/likes", likesIndex(db));
    app.post("/api/v1/likes", auth, validateLikeCreate, likeCreate(db));
    app.delete("/api/v1/likes", auth, likeDelete(db));

    // Login
    app.post("/api/v1/auth", validateUserLogin, userLogin(db));

    app.listen(port, () => console.log(`hosting @${port}`));
    // ➅エラーハンドリング
    app.use((err: Error, _req: any, res: any, next: any) => {
        res.send(500, err);
    });
})();
