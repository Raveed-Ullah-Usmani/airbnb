import React from "react";
import "./PropertySummary.css";

const PropertySummary = ({ property }) => {
    console.log(property);
    return (
        <div className="property-summary">
            <h2>{property.title}</h2>
            <p>Type: {property.type}</p>
            <p>Price per night: ${property.pricePerNight}</p>
        </div>
    );
};

export default PropertySummary;
