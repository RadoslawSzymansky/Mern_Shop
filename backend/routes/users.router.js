import express from "express";

import UsersController from "../controllers/usersController.js";

const usersRouter = express.Router();

const usersController = new UsersController();

usersRouter.get("/", usersController.greetUser);

usersRouter.post("/signup", usersController.greetUser);

export default usersRouter;