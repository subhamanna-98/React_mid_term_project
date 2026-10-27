export {};
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import DbCon from "./app/config/db.js";
import authRoutes from "./app/routes/Authrouter.js";
import CategoryRouter from "./app/routes/CategoryRouter.js"
import carRoutes from "./app/routes/CarRouter.js";
import bookingRoutes from "./app/routes/BookingRouter.js";
const app = express();
const PORT = process.env.PORT || 5000;

// Connect Database
DbCon();

// Middlewares
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());
// router
app.use("/api/auth", authRoutes);
app.use("/api/categories",CategoryRouter)
app.use("/api/cars",carRoutes)
app.use("/api/bookings", bookingRoutes);
// Test Route
app.get("/api/health", (req, res) => {
  res.json({ status: "success", message: "Car-Hunt API is running!" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;