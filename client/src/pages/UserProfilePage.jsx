import React, { useState, useEffect } from 'react';
import { useUserContext } from '../context/UserContext';
import axios from '../utils/axiosConfig';
import './UserProfilePage.css';
import NavBar from '../components/TestNavBar/Navbar.jsx';

const UserProfilePage = () => {
    const { token } = useUserContext();
    const [profile, setProfile] = useState({});
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get('/profile', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setProfile(response.data);
            } catch (error) {
                console.error('Error fetching profile:', error);
            }
        };

        const fetchBookings = async () => {
            try {
                const response = await axios.get('/bookings', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setBookings(response.data);
            } catch (error) {
                console.error('Error fetching bookings:', error);
            }
        };

        if (token) {
            fetchProfile();
            fetchBookings();
        }
    }, [token]);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get('/profile', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setProfile(response.data);
            } catch (error) {
                console.error('Error fetching profile:', error);
            }
        };
        fetchProfile();
    }, []);

    return (
        <div className="user-profile-page">
            <NavBar />
            <div className="user-info">
                <img src={profile.profilePictureUrl || "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541"} alt="Profile" className="profile-picture" />
                <div>
                    <p><strong>Name:</strong> {profile.username}</p>
                    <p><strong>Email:</strong> {profile.email}</p>
                </div>
            </div>
            <div className="user-bookings">
                <h3>Bookings</h3>
                <div className="bookings-list">
                    {bookings.length > 0 ? (
                        <ul>
                            {bookings.map((booking) => (
                                <li key={booking._id}>
                                    <p><strong>Property ID:</strong> {booking.propertyId}</p>
                                    <p><strong>Check-In Date:</strong> {new Date(booking.checkInDate).toLocaleDateString()}</p>
                                    <p><strong>Check-Out Date:</strong> {new Date(booking.checkOutDate).toLocaleDateString()}</p>
                                    <p><strong>Total Price:</strong> ${booking.totalPrice}</p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No bookings found.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserProfilePage;