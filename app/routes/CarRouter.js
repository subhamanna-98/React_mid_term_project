import express from "express";

import { verifyToken, isAdmin } from "../middlewire/authMiddleware.js";
import {upload} from "../config/cloudinary.js";
import { carController } from "../controller/CarController.js";

const router = express.Router();

// --- Public Endpoints ---
router.get("/", carController.getAllCars);
router.get("/:identifier", carController.getCarDetails);

// --- Admin Endpoints ---
router.post(
  "/admin/create",
  verifyToken,
  isAdmin,
  upload.single("image"),
  carController.createCar
);

router.put(
  "/admin/update/:id",
  verifyToken,
  isAdmin,
  upload.single("image"),
  carController.updateCar
);

router.delete(
  "/admin/delete/:id",
  verifyToken,
  isAdmin,
  carController.deleteCar
);

export default router;