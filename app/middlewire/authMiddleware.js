import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

// Step 1: Token verify middleware
export const verifyToken = async (req, res, next) => {
  try {
    let token = null;

    // Header theke Bearer token newa
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
      token = req.headers.authorization.split(" ")[1];
    } 
    // Cookies theke token newa (jodi thake)
    else if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Access denied. No token provided.",
      });
    }

    // Token verify kora
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Database theke user khuje req.user-e set kora
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found or invalid token.",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token.",
    });
  }
};

// Step 2: Admin role verify middleware
export const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    return res.status(403).json({
      success: false,
      message: "Access forbidden. Admin access required.",
    });
  }
};