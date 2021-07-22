import express from "express";

import UsersController from "../controllers/users.controller.js";

const usersRouter = express.Router();

const usersController = new UsersController();

usersRouter.get("/", usersController.greetUser);

usersRouter.post("/signup", usersController.signup);

export default usersRouter;
