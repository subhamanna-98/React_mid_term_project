import Car from "../models/CarModel.js";
import cloudinary from "../config/cloudinary.js";
import slugify from "slugify";

export class CarController {
  // 1. Get all cars
  async getAllCars(req, res) {
    try {
      const { status, category, search } = req.query;
      const filter = {};

      if (status && status !== "All") filter.status = status;
      if (category) filter.category = category;
      if (search) filter.name = { $regex: search, $options: "i" };

      const cars = await Car.find(filter)
        .populate("category", "name slug")
        .sort({ createdAt: -1 });

      return res.status(200).json({
        success: true,
        count: cars.length,
        cars,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message || "Failed to fetch cars",
      });
    }
  }

  // 2. Get single car details (ID ba Slug)
  async getCarDetails(req, res) {
    try {
      const { identifier } = req.params;
      const isMongoId = identifier.match(/^[0-9a-fA-F]{24}$/);
      const query = isMongoId ? { _id: identifier } : { slug: identifier };

      const car = await Car.findOne(query).populate("category", "name slug image");
      if (!car) {
        return res.status(404).json({
          success: false,
          message: "Car not found",
        });
      }

      return res.status(200).json({
        success: true,
        car,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message || "Failed to get car details",
      });
    }
  }

  // 3. Create new car (Admin)
  async createCar(req, res) {
    try {
      const {
        name,
        category,
        registrationNo,
        fuelType,
        transmission,
        seats,
        pricePerDay,
        status,
        description,
      } = req.body;

      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "Car image is required",
        });
      }

      const existingCar = await Car.findOne({
        registrationNo: registrationNo.toUpperCase(),
      });
      if (existingCar) {
        return res.status(400).json({
          success: false,
          message: "A vehicle with this registration number already exists",
        });
      }

      const newCar = await Car.create({
        name,
        category,
        registrationNo: registrationNo.toUpperCase(),
        fuelType,
        transmission: transmission || "Manual",
        seats: Number(seats),
        pricePerDay: Number(pricePerDay),
        status: status || "Available",
        description,
        image: req.file.path,
        imagePublicId: req.file.filename,
      });

      const populatedCar = await newCar.populate("category", "name slug");

      return res.status(201).json({
        success: true,
        message: "Car created successfully",
        car: populatedCar,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message || "Failed to create car",
      });
    }
  }

  // 4. Update car (Admin)
  async updateCar(req, res) {
    try {
      const { id } = req.params;
      const car = await Car.findById(id);

      if (!car) {
        return res.status(404).json({
          success: false,
          message: "Car not found",
        });
      }

      const {
        name,
        category,
        registrationNo,
        fuelType,
        transmission,
        seats,
        pricePerDay,
        status,
        description,
      } = req.body;

      if (name && name !== car.name) {
        car.name = name;
        car.slug =
          slugify(name, { lower: true, strict: true }) +
          "-" +
          Date.now().toString().slice(-4);
      }

      if (registrationNo) car.registrationNo = registrationNo.toUpperCase();
      if (category) car.category = category;
      if (fuelType) car.fuelType = fuelType;
      if (transmission) car.transmission = transmission;
      if (seats) car.seats = Number(seats);
      if (pricePerDay) car.pricePerDay = Number(pricePerDay);
      if (status) car.status = status;
      if (description !== undefined) car.description = description;

      // New image upload hole Cloudinary cleanup
      if (req.file) {
        if (car.imagePublicId) {
          await cloudinary.uploader.destroy(car.imagePublicId);
        }
        car.image = req.file.path;
        car.imagePublicId = req.file.filename;
      }

      await car.save();
      const updatedCar = await car.populate("category", "name slug");

      return res.status(200).json({
        success: true,
        message: "Car updated successfully",
        car: updatedCar,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message || "Failed to update car",
      });
    }
  }

  // 5. Delete car (Admin)
  async deleteCar(req, res) {
    try {
      const { id } = req.params;
      const car = await Car.findById(id);

      if (!car) {
        return res.status(404).json({
          success: false,
          message: "Car not found",
        });
      }

      if (car.imagePublicId) {
        await cloudinary.uploader.destroy(car.imagePublicId);
      }

      await Car.findByIdAndDelete(id);

      return res.status(200).json({
        success: true,
        message: "Car deleted successfully",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message || "Failed to delete car",
      });
    }
  }
}

export const carController = new CarController();