import jwt from "jsonwebtoken";
import User from "../models/User.js";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

// Middleware to verify JWT and extract user information
export const authenticateToken = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token)
    return res.status(401).json({ error: "Access denied. No token provided." });
  // console.log(token);

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.log("error occured inside authentication", error.message);
    res.status(400).json({ error: "Invalid token." });
  }
};

// Middleware to check if the user has the required role
export const authorizeRole = (role) => {
  return async (req, res, next) => {
    try {
      const user = await User.findById(req.user.userId);
      if (!user) {
        console.log("user not found");
        return res.status(404).json({ error: "User not found." });
      }

      if (user.role !== role)
        return res.status(403).json({ error: "Access denied." });

      next();
    } catch (error) {
      res.status(500).json({ error: "Server error." });
    }
  };
};

// Middleware to authorize host role
export const authorizeHost = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.userId);
    if (user.userRole !== 'host') {
      return res.status(403).json({ error: 'Access denied. Host role required.' });
    }
    next();
  } catch (error) {
    console.log('Error occurred inside authorization:', error.message);
    res.status(500).json({ error: 'Server error.' });
  }
};
