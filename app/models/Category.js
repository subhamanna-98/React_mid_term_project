import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Category name is required"],
      trim: true,
      unique: true,
      maxlength: [50, "Category name cannot exceed 50 characters"],
    },
    slug: {
      type: String,
      lowercase: true,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      default: "",
    },
    image: {
      type: String,
      default: "", 
    },
    imagePublicId: {
      type: String,
      default: "", 
    },
    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },
  },
  {
    timestamps: true,
  }
);

categorySchema.pre("save", function () {
  if (this.isModified("name")) {
    this.slug = this.name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
  }
});

const Category = mongoose.model("Category", categorySchema);
export default Category;