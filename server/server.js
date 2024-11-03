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
        { title: { $regex: query, $options: 'i' } },
        { desc: { $regex: query, $options: 'i' } },
      ],
    });

    if (filteredListings.length === 0) {
      return res.status(404).json({ message: "No listings found matching the query" });
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
    const property = await Property.findOne({id:id});
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
    return res
      .status(400)
      .json({
        error:
          "All fields (propertyId, customerName, checkInDate, checkOutDate) are required",
      });
  }

  try {
    // const property = await Property.findById(propertyId);
    const property = await Property.findOne({ id: propertyId });
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
    console.log(error);
    res.status(500).json({ error: "Error creating booking" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
