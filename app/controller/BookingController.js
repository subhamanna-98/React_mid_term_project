import Booking from "../models/BookingModel.js";
import Car from "../models/CarModel.js";

export class BookingController {
  // 1. Create Booking (Logged-in Customer)
  async createBooking(req, res) {
    try {
      const userId = req.user._id || req.user.id;
      const {
        carId,
        pickupDate,
        dropoffDate,
        fullName,
        phone,
        drivingLicense,
        address,
      } = req.body;

      // Basic validation
      if (!carId || !pickupDate || !dropoffDate || !phone || !drivingLicense) {
        return res.status(400).json({
          success: false,
          message: "Please provide all required booking details",
        });
      }

      const car = await Car.findById(carId);
      if (!car) {
        return res.status(404).json({
          success: false,
          message: "Car not found",
        });
      }

      if (car.status !== "Available") {
        return res.status(400).json({
          success: false,
          message: "This car is currently not available for booking",
        });
      }

      const start = new Date(pickupDate);
      const end = new Date(dropoffDate);

      if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        return res.status(400).json({
          success: false,
          message: "Invalid pickup or drop-off date format",
        });
      }

      const diffTime = end.getTime() - start.getTime();
      const totalDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (totalDays < 1) {
        return res.status(400).json({
          success: false,
          message: "Drop-off date must be at least 1 day after pickup date",
        });
      }

      const totalPrice = totalDays * car.pricePerDay;

      const newBooking = await Booking.create({
        user: userId,
        car: carId,
        pickupDate: start,
        dropoffDate: end,
        totalDays,
        totalPrice,
        status: "Pending",
        customerDetails: {
          fullName: fullName || req.user.name,
          phone,
          drivingLicense,
          address: address || "",
        },
      });

      const populatedBooking = await newBooking.populate([
        { path: "car", select: "name image pricePerDay registrationNo category" },
        { path: "user", select: "name email" },
      ]);

      return res.status(201).json({
        success: true,
        message: "Booking request submitted successfully. Awaiting admin approval.",
        booking: populatedBooking,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message || "Failed to create booking",
      });
    }
  }

  // 2. Get My Bookings (Customer Dashboard/History)
  async getMyBookings(req, res) {
    try {
      const userId = req.user._id || req.user.id;

      const bookings = await Booking.find({ user: userId })
        .populate("car", "name image pricePerDay fuelType transmission")
        .sort({ createdAt: -1 });

      return res.status(200).json({
        success: true,
        count: bookings.length,
        bookings,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message || "Failed to retrieve your bookings",
      });
    }
  }

  // 3. Get All Bookings (Admin Dashboard)
  async getAllBookings(req, res) {
    try {
      const { status } = req.query;
      const filter = {};
      if (status && status !== "All") filter.status = status;

      const bookings = await Booking.find(filter)
        .populate("user", "name email")
        .populate("car", "name registrationNo image pricePerDay")
        .sort({ createdAt: -1 });

      return res.status(200).json({
        success: true,
        count: bookings.length,
        bookings,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message || "Failed to fetch bookings",
      });
    }
  }

  // 4. Update Booking Status (Admin Approve / Reject)
  async updateBookingStatus(req, res) {
    try {
      const { id } = req.params;
      const { status, adminNote } = req.body;

      if (!["Approved", "Rejected", "Completed", "Cancelled"].includes(status)) {
        return res.status(400).json({
          success: false,
          message: "Invalid booking status value",
        });
      }

      const booking = await Booking.findById(id);
      if (!booking) {
        return res.status(404).json({
          success: false,
          message: "Booking not found",
        });
      }

      booking.status = status;
      if (adminNote !== undefined) booking.adminNote = adminNote;
      await booking.save();

      // Car status auto-update
      if (status === "Approved") {
        // Approve hole car status Rented hoye jabe
        await Car.findByIdAndUpdate(booking.car, { status: "Rented" });
      } else if (["Rejected", "Completed", "Cancelled"].includes(status)) {
        // Booking cancel ba complete hole car abr Available hoye jabe
        await Car.findByIdAndUpdate(booking.car, { status: "Available" });
      }

      const updatedBooking = await booking.populate([
        { path: "car", select: "name image registrationNo status" },
        { path: "user", select: "name email" },
      ]);

      return res.status(200).json({
        success: true,
        message: `Booking has been ${status.toLowerCase()} successfully`,
        booking: updatedBooking,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message || "Failed to update booking status",
      });
    }
  }
}

export const bookingController = new BookingController();