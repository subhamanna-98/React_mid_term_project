import mongoose from "mongoose";
import slugify from "slugify";

const carSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Car name is required"],
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Category is required"],
    },
    registrationNo: {
      type: String,
      required: [true, "Registration number is required"],
      unique: true,
      trim: true,
      uppercase: true,
    },
    fuelType: {
      type: String,
      enum: ["Petrol", "Diesel", "CNG", "EV"],
      required: [true, "Fuel type is required"],
    },
    transmission: {
      type: String,
      enum: ["Manual", "Automatic"],
      default: "Manual",
    },
    seats: {
      type: Number,
      required: [true, "Seats count is required"],
    },
    pricePerDay: {
      type: Number,
      required: [true, "Price per day is required"],
    },
    status: {
      type: String,
      enum: ["Available", "Rented", "Maintenance"],
      default: "Available",
    },
    image: {
      type: String,
      required: [true, "Car image is required"],
    },
    imagePublicId: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      trim: true,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

// Auto slug generation before save
carSchema.pre("save", function () {
  if (this.isModified("name")) {
    this.slug =
      slugify(this.name, { lower: true, strict: true }) +
      "-" +
      Date.now().toString().slice(-4);
  }
  
});

const Car = mongoose.model("Car", carSchema);
export default Car;