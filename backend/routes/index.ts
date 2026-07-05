import express from "express";
import userRoutes from "../modules/users/user.routes.js";
import assetRoutes from "../modules/assets/assets.routes.js";
import vendorRoutes from "../modules/vendors/vendor.routes.js";
import categoryRoutes from "../modules/category/category.routes.js";

const router : express.Router = express.Router();

router.use("/users", userRoutes);
router.use("/assets", assetRoutes);
router.use("/vendors", vendorRoutes);
router.use("/categories", categoryRoutes);

export default router;