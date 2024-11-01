import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ListingDetails.css'

const ListingDetails = ({ id }) => {
    const [listing, setListing] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch listing details from the backend
        const fetchListing = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/listings/${id}`);
                console.log(response.data);
                setListing(response.data);
                setLoading(false);
            } catch (err) {
                setError('Listing not found');
                setLoading(false);
            }
        };

        fetchListing();
    }, [id]);

    // Loading, error, and listing rendering logic
    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    // Function to handle the "Book Now" button click
    const handleBookNow = () => {
        navigate('/booking'); // Navigate to the booking page (assuming the path is '/booking')
    };
    return (
        <div className="listing-detail-page">
            <div className="listing-details-container">
                <div className="listing-images">
                    {/* Assuming listing.images is an array of image URLs */}
                    <img src={listing.imgSrc[0]} alt={listing.title} className="listing-image" />
                </div>

                <div className="listing-info">
                    <h1>{listing.title}</h1>
                    <p><strong>Type:</strong> {listing.type}</p>
                    <p><strong>Description:</strong> {listing.desc}</p>
                    <p><strong>Amenities:</strong> {listing.amenities.join(', ')}</p>
                    <p><strong>Guests:</strong> {listing.guests}</p>
                    <p><strong>Bedrooms:</strong> {listing.bedrooms}</p>
                    <p><strong>Bathrooms:</strong> {listing.bathrooms}</p>
                    <p><strong>Price per night:</strong> ${listing.pricePerNight}</p>

                    <button onClick={handleBookNow} className="book-now-btn">
                        Book Now
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ListingDetails