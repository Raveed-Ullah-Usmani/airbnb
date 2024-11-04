import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate to redirect
import { useUserContext } from "../../context/UserContext"; // Assuming you have a user context
import "./BookingForm.css";

const BookingForm = ({ property }) => {
    const [checkInDate, setCheckInDate] = useState("");
    const [checkOutDate, setCheckOutDate] = useState("");
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const { user } = useUserContext(); // Get user info from context
    const navigate = useNavigate(); // Initialize navigate

    const handleBooking = async (e) => {
        e.preventDefault();

        // Check if the user is logged in
        if (!user) {
            navigate("/login"); // Redirect to login page if not logged in
            return;
        }

        // Validation for dates
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
        const customerEmail = user.email || "John Doe"; // Use user's name or a default
        const days = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
        const totalPrice = (Number(property.pricePerNight) * days).toString();

        // Prepare booking data
        const bookingData = {
            propertyId: property._id,
            customerEmail,
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
