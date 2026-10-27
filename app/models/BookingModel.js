import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User reference is required"],
    },
    car: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Car",
      required: [true, "Car reference is required"],
    },
    pickupDate: {
      type: Date,
      required: [true, "Pickup date is required"],
    },
    dropoffDate: {
      type: Date,
      required: [true, "Drop-off date is required"],
    },
    totalDays: {
      type: Number,
      required: [true, "Total days count is required"],
      min: [1, "Total rental days must be at least 1"],
    },
    totalPrice: {
      type: Number,
      required: [true, "Total rental price is required"],
      min: [0, "Total price cannot be negative"],
    },
    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected", "Completed", "Cancelled"],
      default: "Pending",
    },
    customerDetails: {
      fullName: { type: String, required: true },
      phone: { type: String, required: true },
      drivingLicense: { type: String, required: true },
      address: { type: String, default: "" },
    },
    adminNote: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;