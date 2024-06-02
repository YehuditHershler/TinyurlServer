import express from "express";

import UserController from "../controllers/userController.js";

const UsersRouter = express.Router();

UsersRouter.get("/", UserController.getList);
UsersRouter.get("/:id", UserController.getById);
UsersRouter.post("/", UserController.post);
UsersRouter.put("/:id", UserController.update);
UsersRouter.delete("/:id", UserController.delete);

export default UsersRouter;