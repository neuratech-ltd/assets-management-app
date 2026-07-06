import express from "express";
import * as vendorController from "./vendor.controller.js";

const router: express.Router = express.Router();

router.get("/", vendorController.getAllVendors);
router.get("/:id", vendorController.getVendorById);
router.post("/", vendorController.createVendor);
router.put("/:id", vendorController.updateVendor);
router.delete("/:id", vendorController.deleteVendor);

export default router;
