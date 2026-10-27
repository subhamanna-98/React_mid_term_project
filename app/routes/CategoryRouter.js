import express from "express";

import { upload } from "../config/cloudinary.js";
import { verifyToken, isAdmin } from "../middlewire/authMiddleware.js";
import CategoryController from "../controller/CategoryController.js";

const CategoryRouter = express.Router();

// Public Routes (Jekono user gari dekhonor shomoy category dekhte parbe)
CategoryRouter.get("/", CategoryController.getAllCategories);
CategoryRouter.get("/:identifier", CategoryController.getCategoryByIdOrSlug);

// 🔒 Admin Only Protected Routes (Shudhu Admin create, update, delete korte parbe)
CategoryRouter.post(
  "/admin/create",
  verifyToken,
  isAdmin,
  upload.single("image"),
  CategoryController.createCategory
);

CategoryRouter.put(
  "/admin/update/:id",
  verifyToken,
  isAdmin,
  upload.single("image"),
  CategoryController.updateCategory
);

CategoryRouter.delete(
  "/admin/delete/:id",
  verifyToken,
  isAdmin,
  CategoryController.deleteCategory
);

export default CategoryRouter;