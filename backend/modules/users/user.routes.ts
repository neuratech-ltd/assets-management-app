import express from "express";
import * as userController from "./user.controller.js";

const router: express.Router = express.Router();

router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);
router.post("/", userController.createUser);

export default router;