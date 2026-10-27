import * as Yup from "yup";

const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png", "image/webp"];
const FILE_SIZE = 2 * 1024 * 1024; // 2 MB

export const categoryValidationSchema = Yup.object().shape({
  name: Yup.string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name cannot exceed 50 characters")
    .required("Category name is required"),

  status: Yup.string()
    .oneOf(["Active", "Inactive"], "Status must be Active or Inactive")
    .required("Status is required")
    .default("Active"),

  description: Yup.string()
    .trim()
    .max(300, "Description cannot exceed 300 characters")
    .optional(),

  image: Yup.mixed<File>()
    .nullable()
    .test("required", "Category banner image is required", function (value) {
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

export type CategoryFormInputs = Yup.InferType<typeof categoryValidationSchema>;