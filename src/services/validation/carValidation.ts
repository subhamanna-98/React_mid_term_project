import * as Yup from "yup";

const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png", "image/webp"];
const FILE_SIZE = 2 * 1024 * 1024; // 2 MB

export const carValidationSchema = Yup.object().shape({
  name: Yup.string()
    .trim()
    .min(2, "Car name must be at least 2 characters")
    .max(100, "Car name cannot exceed 100 characters")
    .required("Car name is required"),

  category: Yup.string()
    .trim()
    .required("Category is required"),

  registrationNo: Yup.string()
    .trim()
    .matches(
      /^[A-Z0-9\s-]+$/i,
      "Invalid registration number format"
    )
    .required("Registration number is required"),

  fuelType: Yup.string()
    .oneOf(["Petrol", "Diesel", "CNG", "EV"], "Invalid fuel type")
    .required("Fuel type is required"),

  transmission: Yup.string()
    .oneOf(["Manual", "Automatic"], "Invalid transmission")
    .default("Manual"),

  seats: Yup.number()
    .typeError("Seats must be a valid number")
    .min(2, "Minimum 2 seats required")
    .max(15, "Maximum 15 seats allowed")
    .required("Seats count is required"),

  pricePerDay: Yup.number()
    .typeError("Price per day must be a valid number")
    .positive("Price must be greater than 0")
    .required("Price per day is required"),

  status: Yup.string()
    .oneOf(["Available", "Rented", "Maintenance"], "Invalid status")
    .default("Available"),

  description: Yup.string()
    .trim()
    .max(1000, "Description cannot exceed 1000 characters")
    .optional(),

  image: Yup.mixed<File>()
    .nullable()
    .test("required", "Car image is required", function (value) {
      const isEdit = this.options.context?.isEdit;
      if (isEdit) return true;
      return !!value;
    })
    .test("fileSize", "File size is too large (max 2MB)", (value) => {
      if (!value || !(value instanceof File)) return true;
      return value.size <= FILE_SIZE;
    })
    .test("fileType", "Unsupported file format (JPEG, PNG, WEBP only)", (value) => {
      if (!value || !(value instanceof File)) return true;
      return SUPPORTED_FORMATS.includes(value.type);
    }),
});

export type CarFormInputs = Yup.InferType<typeof carValidationSchema>;