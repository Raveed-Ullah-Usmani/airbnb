import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import PropertySummary from "../components/PropertySymmary/PropertySummary";
import BookingForm from "../components/BookingForm/BookingForm";
import "./BookingPage.css";

const BookingPage = () => {
    const { id } = useParams(); // Extract the property ID from the route
    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProperty = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/listings/${id}`);
                setProperty(response.data);
            } catch (err) {
                setError("Property not found.");
            } finally {
                setLoading(false);
            }
        };

        fetchProperty();
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="booking-page">
            <PropertySummary property={property} />
            <BookingForm property={property} />
        </div>
    );
};

export default BookingPage;

