import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  propertyId: {
    type: String, // Ensure this is a Number, not an ObjectId
    required: true,
  },
  customerEmail: {
    type: String,
    required: true,
  },
  checkInDate: {
    type: Date,
    required: true,
  },
  checkOutDate: {
    type: Date,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
});

const Booking = mongoose.model('Booking', bookingSchema);
export default Booking;
