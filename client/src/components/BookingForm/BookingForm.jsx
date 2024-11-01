import React, { useState } from "react";
import axios from "axios";
import "./BookingForm.css";

const BookingForm = ({ property }) => {
    const [checkInDate, setCheckInDate] = useState("");
    const [checkOutDate, setCheckOutDate] = useState("");
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const handleBooking = async (e) => {
        e.preventDefault();

        // Validation
        if (!checkInDate || !checkOutDate) {
            setError("Please select both check-in and check-out dates.");
            return;
        }

        const checkIn = new Date(checkInDate);
        const checkOut = new Date(checkOutDate);

        if (checkOut <= checkIn) {
            setError("Check-out date must be after check-in date.");
            return;
        }

        setError("");
        const customerName = "John Doe"; // Replace with actual customer name input
        const days = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
        const totalPrice = (Number(property.pricePerNight) * days).toString();

        // Prepare booking data
        const bookingData = {
            propertyId: property.id,
            customerName,
            checkInDate,
            checkOutDate,
            totalPrice,
        };

        try {
            const response = await axios.post("http://localhost:3000/api/bookings", bookingData, {
                headers: { "Content-Type": "application/json" },
            });
            const booking = response.data;
            setSuccessMessage(
                `Booking successful! Total price: $${booking.totalPrice}.`
            );
        } catch (err) {
            setError("An error occurred while making the booking. Please try again.");
        }
    };


    return (
        <form className="booking-form" onSubmit={handleBooking}>
            <h3>Book Your Stay</h3>

            <div className="form-group">
                <label>Check-in Date:</label>
                <input
                    type="date"
                    value={checkInDate}
                    onChange={(e) => setCheckInDate(e.target.value)}
                />
            </div>

            <div className="form-group">
                <label>Check-out Date:</label>
                <input
                    type="date"
                    value={checkOutDate}
                    onChange={(e) => setCheckOutDate(e.target.value)}
                />
            </div>

            {error && <p className="error">{error}</p>}
            {successMessage && <p className="success">{successMessage}</p>}

            <button type="submit" className="book-now-btn">
                Book Now
            </button>
        </form>
    );
};

export default BookingForm;
