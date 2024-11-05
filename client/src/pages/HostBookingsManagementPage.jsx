import React, { useState, useEffect } from 'react';
import axios from '../utils/axiosConfig.js';
import './BookingsManagementPage.css';

const BookingsManagementPage = () => {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/host/bookings');
            const bookingsWithDetails = await Promise.all(response.data.map(async (booking) => {
                try {
                    const propertyResponse = await axios.get(`http://localhost:3000/api/listings/${booking.propertyId}`);
                    return {
                        ...booking,
                        property: propertyResponse.data,
                    };
                } catch (error) {
                    console.error(`Error fetching property details for propertyId ${booking.propertyId}:`, error);
                    return {
                        ...booking,
                        property: null,
                    };
                }
            }));
            setBookings(bookingsWithDetails);
        } catch (error) {
            console.error('Error fetching bookings:', error);
        }
    };

    return (
        <div className="bookings-management">
            <div className="bookings-grid">
                {bookings.map((booking) => (
                    <div key={booking._id} className="booking-card">
                        <p><b>Customer Email:</b></p>
                        <p>{booking.customerEmail}</p>
                        <p><b>Property ID:</b></p>
                        <p><a href={`/listings/${booking.propertyId}`}>{booking.propertyId ? booking.propertyId : 'N/A'}</a></p>
                        <p><b>Property:</b></p>
                        <p>{booking.property ? booking.property.title : 'N/A'}</p>
                        <p><b>Address:</b></p>
                        <p>{booking.property ? booking.property.address : 'N/A'}</p>
                        <p><b>Check-in</b>:</p>
                        <p>{new Date(booking.checkInDate).toLocaleDateString()}</p>
                        <p><b>Check-out:</b></p>
                        <p>{new Date(booking.checkOutDate).toLocaleDateString()}</p>
                        <p><b>Total Price:</b></p>
                        <p>${booking.totalPrice}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BookingsManagementPage;