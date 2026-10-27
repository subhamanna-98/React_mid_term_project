import Category from "../models/Category.js";
import cloudinary from "../config/cloudinary.js";

class CategoryController {
  // 1. Create Category with Cloudinary Image (Admin)
  async createCategory(req, res) {
    try {
      const { name, description, status } = req.body;

      if (!name) {
        return res.status(400).json({
          success: false,
          message: "Category name is required",
        });
      }

      const existingCategory = await Category.findOne({ name: name.trim() });
      if (existingCategory) {
        return res.status(400).json({
          success: false,
          message: "A category with this name already exists",
        });
      }

      const image = req.file ? req.file.path : "";
      const imagePublicId = req.file ? req.file.filename : "";

      const category = await Category.create({
        name: name.trim(),
        description,
        image,
        imagePublicId,
        status: status || "Active",
      });

      return res.status(201).json({
        success: true,
        message: "Category created successfully",
        category,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message || "Failed to create category",
      });
    }
  }

  // 2. Get All Categories (Public / User)
  async getAllCategories(req, res) {
    try {
      const { status } = req.query;
      const query = {};

      if (status) query.status = status;

      const categories = await Category.find(query).sort({ createdAt: -1 });

      return res.status(200).json({
        success: true,
        count: categories.length,
        categories,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message || "Failed to fetch categories",
      });
    }
  }

  // 3. Get Single Category by ID or Slug (Public / User)
  async getCategoryByIdOrSlug(req, res) {
    try {
      const { identifier } = req.params;

      // Jodi 24-character hex ID hoy tobe ID diye, noile slug diye query korbe
      const isObjectId = identifier.match(/^[0-9a-fA-F]{24}$/);
      const query = isObjectId ? { _id: identifier } : { slug: identifier };

      const category = await Category.findOne(query);

      if (!category) {
        return res.status(404).json({
          success: false,
          message: "Category not found",
        });
      }

      return res.status(200).json({
        success: true,
        category,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message || "Failed to fetch category",
      });
    }
  }

  // 4. Update Category (Admin)
  async updateCategory(req, res) {
    try {
      const { id } = req.params;
      const { name, description, status } = req.body;

      const category = await Category.findById(id);
      if (!category) {
        return res.status(404).json({
          success: false,
          message: "Category not found",
        });
      }

      if (name) category.name = name.trim();
      if (description !== undefined) category.description = description;
      if (status !== undefined) category.status = status;

      // Notun image upload hole purono Cloudinary image delete kore update kora
      if (req.file) {
        if (category.imagePublicId) {
          await cloudinary.uploader.destroy(category.imagePublicId);
        }
        category.image = req.file.path;
        category.imagePublicId = req.file.filename;
      }

      await category.save();

      return res.status(200).json({
        success: true,
        message: "Category updated successfully",
        category,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message || "Failed to update category",
      });
    }
  }

  // 5. Delete Category (Admin)
  async deleteCategory(req, res) {
    try {
      const { id } = req.params;

      const category = await Category.findById(id);
      if (!category) {
        return res.status(404).json({
          success: false,
          message: "Category not found",
        });
      }

      // Cloudinary theke image delete kora
      if (category.imagePublicId) {
        await cloudinary.uploader.destroy(category.imagePublicId);
      }

      await Category.findByIdAndDelete(id);

      return res.status(200).json({
        success: true,
        message: "Category and image deleted successfully",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message || "Failed to delete category",
      });
    }
  }
}

export default new CategoryController();

