import mongoose from 'mongoose';
import Property from './models/Property.js';  // Import the Property model

const mongoURI = 'mongodb://localhost:27017/airbnbDB';

// Property data (list2)
const list2 = [
  {
    type: "House",
    rating: "4.5",
    desc: "Beautiful 3-bedroom house with a spacious backyard and modern amenities. Ideal for family living.",
    imgSrc: [
      "https://media.onthemarket.com/properties/7004720/977542090/image-0-1024x1024.jpg",
      "https://media.onthemarket.com/properties/7004720/977542090/image-1-1024x1024.jpg",
      "https://media.onthemarket.com/properties/7004720/977542090/image-2-1024x1024.jpg",
    ],
    pricePerNight: "350",
    date: "January 15-20, 2024",
    title: "Modern Family House in Quiet Neighborhood",
    address: "123 Maple Street, Springfield, IL, 62704",
    agent: "Jane Doe, Realty Group",
    contact: "555-1234-5678",
    amenities: ["3 Bedrooms", "2 Bathrooms", "Backyard", "Garage", "Swimming Pool"],
    guests: "6",
  },
  {
    type: "Apartment",
    rating: "4.8",
    desc: "Luxury apartment with a panoramic view of the city skyline. High-end finishes and top-tier appliances.",
    imgSrc: [
      "https://media.onthemarket.com/properties/7004720/977542090/image-0-1024x1024.jpg",
      "https://media.onthemarket.com/properties/7004720/977542090/image-1-1024x1024.jpg",
      "https://media.onthemarket.com/properties/7004720/977542090/image-2-1024x1024.jpg",
    ],
    pricePerNight: "750",
    date: "February 01-15, 2024",
    title: "City View Penthouse",
    address: "456 Highrise Ave, Downtown, Chicago, IL, 60601",
    agent: "John Smith, Luxury Realty",
    contact: "555-9876-5432",
    amenities: ["2 Bedrooms", "2.5 Bathrooms", "Balcony", "High-End Kitchen", "Gym Access"],
    guests: "4",
  },
  {
    type: "Cottage",
    rating: "3.9",
    desc: "Charming 2-bedroom cottage with a rustic feel. Perfect for those who enjoy peaceful countryside living.",
    imgSrc: [
      "https://media.onthemarket.com/properties/7004720/977542090/image-0-1024x1024.jpg",
      "https://media.onthemarket.com/properties/7004720/977542090/image-1-1024x1024.jpg",
      "https://media.onthemarket.com/properties/7004720/977542090/image-2-1024x1024.jpg",
    ],
    pricePerNight: "250",
    date: "March 10-15, 2024",
    title: "Cozy Cottage in the Countryside",
    address: "789 Rural Rd, Pleasantville, NY, 10570",
    agent: "Alice Johnson, Country Homes",
    contact: "555-2345-6789",
    amenities: ["2 Bedrooms", "1 Bathroom", "Garden", "Fireplace"],
    guests: "4",
  },
  {
    type: "Townhouse",
    rating: "4.3",
    desc: "Spacious townhouse with a modern design, located close to shopping and public transportation. A perfect city home.",
    imgSrc: [
      "https://media.onthemarket.com/properties/7004720/977542090/image-0-1024x1024.jpg",
      "https://media.onthemarket.com/properties/7004720/977542090/image-1-1024x1024.jpg",
      "https://media.onthemarket.com/properties/7004720/977542090/image-2-1024x1024.jpg",
    ],
    pricePerNight: "420",
    date: "April 05-10, 2024",
    title: "Modern Townhouse in Prime Location",
    address: "101 Urban St, City Center, Boston, MA, 02116",
    agent: "Ethan White, Urban Realty",
    contact: "555-8765-4321",
    amenities: ["3 Bedrooms", "2 Bathrooms", "2-Car Garage", "Modern Kitchen"],
    guests: "6",
  },
];

const uploadData = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB');

    // Insert the data into the database
    await Property.insertMany(list2);
    console.log('Properties successfully uploaded to MongoDB');
  } catch (err) {
    console.error('Error uploading properties to MongoDB:', err);
  } finally {
    // Close the connection
    mongoose.connection.close();
  }
};

// Run the upload function
uploadData();
