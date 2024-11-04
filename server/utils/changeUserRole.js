import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';

dotenv.config({ path: '../.env' });

const mongoURI = process.env.MONGO_URI;

if (!mongoURI) {
    console.error('Error: MONGO_URI is not defined in the environment variables.');
    process.exit(1);
  }

const changeUserRole = async (email, newRole) => {
  try {
    // Connect to MongoDB
    await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB');

    // Find the user by email and update their role
    const user = await User.findOneAndUpdate({ email }, { role: newRole }, { new: true });

    if (!user) {
      console.log(`User with email ${email} not found.`);
    } else {
      console.log(`User role updated successfully. New role: ${user.role}`);
    }

    // Close the connection
    await mongoose.connection.close();
    console.log('Connection closed');
  } catch (error) {
    console.error('Error updating user role:', error);
    process.exit(1); // Exit process with failure
  }
};

// Get email and new role from command line arguments
const email = process.argv[2];
const newRole = process.argv[3];

if (!email || !newRole) {
  console.log('Usage: node changeUserRole.js <email> <newRole>');
  process.exit(1);
}

changeUserRole(email, newRole);