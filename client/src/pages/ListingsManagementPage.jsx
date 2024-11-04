import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ListingsManagementPage.css';
import { useUserContext } from '../context/UserContext';

const ListingsManagementPage = () => {
    const { token } = useUserContext();
    const [listings, setListings] = useState([]);
    const [newListing, setNewListing] = useState({
        type: '',
        rating: '',
        desc: '',
        imgSrc: [],
        pricePerNight: '',
        date: '',
        title: '',
        address: '',
        agent: '',
        contact: '',
        amenities: [],
        guests: ''
    });

    const navigate = useNavigate();

    useEffect(() => {
        fetchListings();
    }, []);

    const fetchListings = async () => {
        try {
            // console.log(token);
            const response = await axios.get('http://localhost:3000/api/admin/listings', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setListings(response.data);
        } catch (error) {
            console.error('Error fetching listings:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewListing({ ...newListing, [name]: value });
    };

    const handleArrayInputChange = (e, field) => {
        const { value } = e.target;
        setNewListing({ ...newListing, [field]: value.split(',').map(item => item.trim()) });
    };

    const handleAddListing = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3000/api/admin/listings', newListing, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            fetchListings();
            setNewListing({
                type: '',
                rating: '',
                desc: '',
                imgSrc: [],
                pricePerNight: '',
                date: '',
                title: '',
                address: '',
                agent: '',
                contact: '',
                amenities: [],
                guests: ''
            });
        } catch (error) {
            console.error('Error adding listing:', error);
        }
    };

    const handleDeleteListing = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/api/admin/listings/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            fetchListings();
        } catch (error) {
            console.error('Error deleting listing:', error);
        }
    };

    const handleCardClick = (id) => {
        navigate(`/listings/${id}`);
    };

    return (
        <div className="listings-management">
            <form onSubmit={handleAddListing}>
                <input type="text" name="type" value={newListing.type} onChange={handleInputChange} placeholder="Type" required />
                <input type="text" name="rating" value={newListing.rating} onChange={handleInputChange} placeholder="Rating" required />
                <input type="text" name="desc" value={newListing.desc} onChange={handleInputChange} placeholder="Description" required />
                <input type="text" name="imgSrc" value={newListing.imgSrc.join(', ')} onChange={(e) => handleArrayInputChange(e, 'imgSrc')} placeholder="Image URLs (comma separated)" required />
                <input type="text" name="pricePerNight" value={newListing.pricePerNight} onChange={handleInputChange} placeholder="Price per Night" required />
                <input type="text" name="date" value={newListing.date} onChange={handleInputChange} placeholder="Date" required />
                <input type="text" name="title" value={newListing.title} onChange={handleInputChange} placeholder="Title" required />
                <input type="text" name="address" value={newListing.address} onChange={handleInputChange} placeholder="Address" required />
                <input type="text" name="agent" value={newListing.agent} onChange={handleInputChange} placeholder="Agent" required />
                <input type="text" name="contact" value={newListing.contact} onChange={handleInputChange} placeholder="Contact" required />
                <input type="text" name="amenities" value={newListing.amenities.join(', ')} onChange={(e) => handleArrayInputChange(e, 'amenities')} placeholder="Amenities (comma separated)" required />
                <input type="text" name="guests" value={newListing.guests} onChange={handleInputChange} placeholder="Guests" required />
                <button type="submit">Add Listing</button>
            </form>
            <div className="listings-grid">
                {listings.map((listing) => (
                    <div key={listing._id} className="listing-card">
                        <img src={listing.imgSrc[0]} alt={listing.title} onClick={() => handleCardClick(listing._id)} />
                        <div className="listing-info">
                            <h3>{listing.title}</h3>
                            <p>{listing.address}</p>
                        </div>
                        <button onClick={() => handleDeleteListing(listing._id)}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ListingsManagementPage;