import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import LanguageIcon from '@mui/icons-material/Language';
import ProfileButton from './ProfileButton';
import logo from '../../../public/img/logo.svg';
import './Navbar.css';
import axiosInstance from '../../utils/axiosConfig.js';

const Navbar = ({ showSearchBar, list, setList }) => {
    const [scrolled, setScrolled] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // Handle search input change
    const handleSearchChange = (event) => {
        const query = event.target.value;
        setSearchQuery(query);
    };

    // Handle search action
    const handleSearch = async () => {
        try {
            const response = await axiosInstance.get(`/listings/search?query=${searchQuery}`);
            console.log('Search results:', response.data);
            setList(response.data);
            // navigate(`/search?query=${searchQuery}`);
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
    };
    return (
        <div className="navbar">
            <div className={`top-row ${scrolled ? 'scrolled' : ''}`}>
                <Link to="/">
                    <img src={logo} className="navbar-logo" alt="Logo" />
                </Link>
                {showSearchBar && (
                    <div className="element element2">
                        <div>Stays</div>
                        <div>Experiences</div>
                    </div>
                )}
                <div className="profile-container">
                    <div className="airbnb-your-home">Airbnb your home</div>
                    <div className="airbnb-your-home">
                        <LanguageIcon sx={{ fontSize: "1.3rem" }} />
                    </div>
                    <div className="profile-div">
                        <ProfileButton />
                    </div>
                </div>
            </div>
            {showSearchBar && (
                <div className={`bottom-row ${scrolled ? 'scrolled' : ''}`}>
                    <div className="elementA search-bar">
                        <input
                            type="text"
                            className="search-input"
                            value={searchQuery}
                            onChange={handleSearchChange}
                            placeholder="Search for stays"
                            style={{ border: "none" }}
                        />
                        <div className="search-icon-div" onClick={handleSearch}>
                            <SearchRoundedIcon className="search-icon" />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Navbar;
