import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import Booking from "./models/Booking.js";
import Property from "./models/Property.js";
import User from "./models/User.js";
import { authenticateToken, authorizeRole, authorizeHost } from './middleware/authMiddleware.js';

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

  try {
    let properties;
    if (!query) {
      properties = await Property.find();
    } else {
      properties = await Property.find({
        $or: [
          { title: { $regex: query, $options: "i" } },
          { desc: { $regex: query, $options: "i" } },
        ],
      });
    }

    res.json(properties);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Error fetching listings" });
  }
});

// Fetch a single listing by ID
app.get("/api/listings/:id", async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid listing ID" });
  }

  try {
    const property = await Property.findById(id);
    if (!property) {
      return res.status(404).json({ error: "Listing not found" });
    }
    res.json(property);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Error fetching listing" });
  }
});

// Create a new booking
app.post("/api/bookings", async (req, res) => {
  const { propertyId, customerEmail, checkInDate, checkOutDate, totalPrice } =
    req.body;

  if (
    !propertyId ||
    !customerEmail ||
    !checkInDate ||
    !checkOutDate ||
    !totalPrice
  ) {
    return res.status(400).json({ error: "All fields are required" });
  }

  if (!mongoose.Types.ObjectId.isValid(propertyId)) {
    return res.status(400).json({ error: "Invalid listing ID" });
  }

  try {
    const property = await Property.findById(propertyId);
    if (!property) {
      return res.status(404).json({ error: "Property not found" });
    }

    const newBooking = new Booking({
      propertyId,
      customerEmail,
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

// Fetch bookings made by the user
app.get('/api/bookings', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    //get email of the user with userId
    const user  = await User.findOne({_id: userId});
    const email = user.email;
    const bookings = await Booking.find({ customerEmail: email });
    res.json(bookings);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ error: 'Server error.' });
  }
});

// Fetch user profile information
app.get('/api/profile', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    const userProfile = {
      username: user.username,
      email: user.email,
      profilePictureUrl: user.profilePictureUrl
    };
    res.json(userProfile);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ error: 'Server error.' });
  }
});

// Register a new user
app.post("/api/auth/register", async (req, res) => {
  const { username, email, password, userRole } = req.body;

  if (!username || !email || !password || !userRole) {
    if (!username) console.log('Username is required');
    if (!email) console.log('Email is required');
    if (!password) console.log('Password is required');
    if (!role) console.log('User Role is required');
    return res.status(400).json({ error: "Username, email, password, and role are required" });
  }

  if (!['host', 'guest'].includes(userRole)) {
    return res.status(400).json({ error: "Invalid role" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const newUser = new User({ username, email, password, userRole });
    await newUser.save();

    // Generate JWT token
    const token = jwt.sign({ userId: newUser._id, role: newUser.role, userRole: newUser.userRole }, JWT_SECRET, {
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
      console.log('Invalid email or password');
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const token = jwt.sign({ userId: user._id, role: user.role, userRole: user.userRole }, JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ token, userRole: user.userRole});
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Error logging in" });
  }
});

// Role Authentication
app.get("/api/auth/role", authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }
    res.json({ role: user.role, userRole: user.userRole });
  } catch (error) {
    console.error("Error fetching user role:", error);
    res.status(500).json({ error: "Server error." });
  }
});

// Admin routes
// Fetch all listings (admin view)
app.get("/api/admin/listings", authenticateToken, authorizeRole('admin'), async (req, res) => {
  try {
    const listings = await Property.find();
    res.json(listings);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Error fetching listings" });
  }
});

// Add a new listing
app.post("/api/admin/listings", authenticateToken, authorizeRole('admin'), async (req, res) => {
  const {
    type,
    rating,
    desc,
    imgSrc,
    pricePerNight,
    date,
    title,
    address,
    agent,
    contact,
    amenities,
    guests,
    ownerEmail
  } = req.body;
  if (
    !type ||
    !rating ||
    !desc ||
    !imgSrc ||
    !pricePerNight ||
    !date ||
    !title ||
    !address ||
    !agent ||
    !contact ||
    !amenities ||
    !guests ||
    !ownerEmail
  ) {
    console.log('All fields are required');
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const newListing = new Property({
      type,
      rating,
      desc,
      imgSrc,
      pricePerNight,
      date,
      title,
      address,
      agent,
      contact,
      amenities,
      guests,
      ownerEmail
    });
    await newListing.save();
    res.status(201).json({ message: "Listing added successfully", listing: newListing });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Error adding listing" });
  }
});

// Delete a listing by ID
app.delete("/api/admin/listings/:id", authenticateToken, authorizeRole('admin'), async (req, res) => {
  const { id } = req.params;

  try {
    const deletedListing = await Property.findByIdAndDelete(id);
    if (!deletedListing) {
      return res.status(404).json({ error: "Listing not found" });
    }
    res.json({ message: "Listing deleted successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Error deleting listing" });
  }
});

// View all bookings (admin overview)
app.get("/api/admin/bookings", authenticateToken, authorizeRole('admin'), async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.json(bookings);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Error fetching bookings" });
  }
});

//Host Routes

// Host views all their listings
app.get("/api/host/listings", authenticateToken, authorizeHost, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    const listings = await Property.find({ ownerEmail: user.email });
    res.json(listings);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Error fetching listings" });
  }
});



// Host adds a new listing
app.post('/api/host/listings', authenticateToken, authorizeHost, async (req, res) => {
  const {
    type,
    rating,
    desc,
    imgSrc,
    pricePerNight,
    date,
    title,
    address,
    agent,
    contact,
    amenities,
    guests,
    ownerEmail
  } = req.body;
  if (
    !type ||
    !rating ||
    !desc ||
    !imgSrc ||
    !pricePerNight ||
    !date ||
    !title ||
    !address ||
    !agent ||
    !contact ||
    !amenities ||
    !guests ||
    !ownerEmail
  ) {
    console.log('All fields are required');
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const newListing = new Property({
      type,
      rating,
      desc,
      imgSrc,
      pricePerNight,
      date,
      title,
      address,
      agent,
      contact,
      amenities,
      guests,
      ownerEmail
    });
    await newListing.save();
    res.status(201).json({ message: "Listing added successfully", listing: newListing });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Error adding listing" });
  }
});

// Host deletes a listing
app.delete('/api/host/listings/:id', authenticateToken, authorizeHost, async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid listing ID' });
  }

  try {
    // Fetch the user by ID to get the email
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Use the email to find and delete the listing
    const listing = await Property.findOneAndDelete({ _id: id, ownerEmail: user.email });
    if (!listing) {
      return res.status(404).json({ error: 'Listing not found or not authorized' });
    }
    res.json({ message: 'Listing deleted successfully' });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: 'Error deleting listing' });
  }
});

// Host views bookings for their listings
app.get('/api/host/bookings', authenticateToken, authorizeHost, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    const listings = await Property.find({ ownerEmail: user.email });
    const listingIds = listings.map(listing => listing._id);
    const bookings = await Booking.find({ propertyId: { $in: listingIds } });
    res.json(bookings);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: 'Error fetching bookings' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
