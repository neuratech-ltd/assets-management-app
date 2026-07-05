import express from "express";
import * as assetController from "./assets.controller.js";


const router: express.Router = express.Router();

router.get("/", assetController.getAllAssets);
router.get("/:id", assetController.getAssetById);
router.post("/", assetController.createAsset);

export default router; 