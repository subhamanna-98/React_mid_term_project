import express from "express";

import { verifyToken, isAdmin } from "../middlewire/authMiddleware.js";
import { bookingController } from "../controller/BookingController.js";


const router = express.Router();

// --- Customer Authenticated Routes ---
router.post("/create", verifyToken, bookingController.createBooking);
router.get("/my-bookings", verifyToken, bookingController.getMyBookings);

// --- Admin Protected Routes ---
router.get("/admin/all", verifyToken, isAdmin, bookingController.getAllBookings);
router.put(
  "/admin/status/:id",
  verifyToken,
  isAdmin,
  bookingController.updateBookingStatus
);

export default router;