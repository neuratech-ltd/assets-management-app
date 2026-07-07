import express from "express";
import userRoutes from "../modules/users/user.routes.js";
import assetRoutes from "../modules/assets/assets.routes.js";
import vendorRoutes from "../modules/vendors/vendor.routes.js";
import categoryRoutes from "../modules/category/category.routes.js";
import authRoutes from "../modules/auth/auth.routes.js";
import requireAuth from "../middleware/auth.middleware.js";

const router: express.Router = express.Router();

router.use("/auth", authRoutes);
router.use("/users", requireAuth, userRoutes);
router.use("/assets", requireAuth, assetRoutes);
router.use("/vendors", requireAuth, vendorRoutes);
router.use("/categories", requireAuth, categoryRoutes);

export default router;
