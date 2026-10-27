import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

class AuthController {
    generateToken(userId, role) {
    return jwt.sign(
      { id: userId, role },
      process.env.JWT_SECRET || "your_jwt_secret_key",
      { expiresIn: process.env.JWT_EXPIRE || "7d" }
    );
  }

  register = async (req, res) => {
    try {
      const { name, email, phone, password } = req.body;

      if (!name || !email || !password) {
        return res.status(400).json({
          success: false,
          message: "Please fill all required fields",
        });
      }

      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: "Email already registered. Please login.",
        });
      }

      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Create new user
      const user = await User.create({
        name,
        email,
        phone,
        password: hashedPassword,
      });

      // Generate token
      const token = this.generateToken(user._id, user.role);

      return res.status(201).json({
        success: true,
        message: "User registered successfully!",
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          role: user.role,
        },
      });
    } catch (error) {
      console.error("Register Error:", error.message);
      return res.status(500).json({
        success: false,
        message: "Server Error during registration",
        error: error.message,
      });
    }
  };

  // ================= LOGIN USER =================
  login = async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({
          success: false,
          message: "Please provide email and password",
        });
      }

      // Check if user exists
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({
          success: false,
          message: "Invalid email or password",
        });
      }

      // Compare password
      const isPasswordMatched = await bcrypt.compare(password, user.password);
      if (!isPasswordMatched) {
        return res.status(401).json({
          success: false,
          message: "Invalid email or password",
        });
      }

      // Generate token
      const token = this.generateToken(user._id, user.role);

      return res.status(200).json({
        success: true,
        message: "Logged in successfully!",
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          role: user.role,
        },
      });
    } catch (error) {
      console.error("Login Error:", error.message);
      return res.status(500).json({
        success: false,
        message: "Server Error during login",
        error: error.message,
      });
    }
  };
}

export default new AuthController()