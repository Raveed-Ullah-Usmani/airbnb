import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import Booking from "./models/Booking.js";
import Property from "./models/Property.js";
import User from "./models/User.js";

dotenv.config(); // Load environment variables from .env file

const mongoURI = process.env.MONGO_URI;
const JWT_SECRET = process.env.JWT_SECRET;
const PORT = process.env.PORT;

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("MongoDB connection error:", error));

// Routes

// Fetch all listings
app.get("/api/listings", async (req, res) => {
  try {
    const properties = await Property.find();
    res.json(properties);
  } catch (error) {
    res.status(500).json({ error: "Error fetching listings" });
  }
});

// Search listings based on query
app.get("/api/listings/search", async (req, res) => {
  const { query } = req.query;
  if (!query) {
    return res.status(400).json({ error: "Query parameter is required" });
  }

  try {
    const filteredListings = await Property.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { desc: { $regex: query, $options: "i" } },
      ],
    });
    if (filteredListings.length === 0) {
      return res
        .status(404)
        .json({ message: "No listings found matching the query" });
    }
    res.json(filteredListings);
  } catch (error) {
    res.status(500).json({ error: "Error fetching listings" });
  }
});

// Fetch a single listing by ID
app.get("/api/listings/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const property = await Property.findOne({ id: id });
    if (!property) {
      return res.status(404).json({ error: "Listing not found" });
    }
    res.json(property);
  } catch (error) {
    res.status(500).json({ error: "Error fetching listing" });
  }
});

// Create a new booking
app.post("/api/bookings", async (req, res) => {
  const { propertyId, customerName, checkInDate, checkOutDate, totalPrice } =
    req.body;

  if (
    !propertyId ||
    !customerName ||
    !checkInDate ||
    !checkOutDate ||
    !totalPrice
  ) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const property = await Property.findOne({id: propertyId});
    if (!property) {
      return res.status(404).json({ error: "Property not found" });
    }

    const newBooking = new Booking({
      propertyId,
      customerName,
      checkInDate,
      checkOutDate,
      totalPrice,
    });

    await newBooking.save();
    res.status(201).json(newBooking);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Error creating booking" });
  }
});

// Register a new user
app.post("/api/auth/register", async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ error: "Username, email, and password are required" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const newUser = new User({ username, email, password });
    await newUser.save();

    // Generate JWT token
    const token = jwt.sign({ userId: newUser._id }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(201).json({ message: "User registered successfully", token });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Error registering user" });
  }
});


// User login
app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ token });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Error logging in" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
