import express from "express";
import * as categoryController from "./category.controller.js";


const router: express.Router = express.Router();

router.get("/", categoryController.getAllCategories);
router.get("/:id", categoryController.getCategoryById);
router.post("/", categoryController.createCategory);

export default router; 