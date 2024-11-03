import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import { list, list2 } from "../client/src/cards-list.js";
import { fileURLToPath } from "url";
import { dirname } from "path";
import mongoose from "mongoose";
import Booking from "./models/Booking.js";
import Property from "./models/Property.js";

const mongoURI = "mongodb://localhost:27017/airbnbDB";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 3000;

const bookingsFilePath = path.join(__dirname, "bookings.json");

app.use(cors());
app.use(express.json());

mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

// Fetch all listings
app.get("/api/listings", (req, res) => {
  res.json(list2);
});

// Search listings based on query
app.get("/api/listings/search", (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ error: "Query parameter is required" });
  }

  const filteredListings = list2.filter(
    (item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.desc.toLowerCase().includes(query.toLowerCase())
  );

  // console.log(filteredListings);

  if (filteredListings.length === 0) {
    return res
      .status(404)
      .json({ message: "No listings found matching the query" });
  }

  res.json(filteredListings);
});

// Fetch a single listing by ID
app.get("/api/listings/:id", (req, res) => {
  const { id } = req.params;
  const listing = list2.find((item) => item.id === parseInt(id));

  if (!listing) {
    return res.status(404).json({ error: "Listing not found" });
  }

  res.json(listing);
});

// Helper function to read bookings from file
const readBookings = () => {
  try {
    const data = fs.readFileSync(bookingsFilePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading bookings file:', error);
    return [];
  }
};

// Helper function to write bookings to file
const writeBookings = (bookings) => {
  try {
    fs.writeFileSync(bookingsFilePath, JSON.stringify(bookings, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error writing bookings to file:', error);
  }
};

// Create a new booking
app.post("/api/bookings", (req, res) => {

  const { propertyId, customerName, checkInDate, checkOutDate, totalPrice } = req.body;

  if (!propertyId || !customerName || !checkInDate || !checkOutDate || !totalPrice) {
    return res.status(400).json({ error: "All fields (propertyId, customerName, checkInDate, checkOutDate) are required" });
  }

  const property = list.find(item => item.id === parseInt(propertyId));
  if (!property) {
    return res.status(404).json({ error: "Property not found" });
  }

  const newBooking = {
    id: Date.now(),
    propertyId,
    customerName,
    checkInDate,
    checkOutDate,
    status: "Booked",
    totalPrice,
  };

  const bookings = readBookings();
  bookings.push(newBooking);

  writeBookings(bookings);

  res.status(201).json(newBooking);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
