import React from 'react';
import { Link } from 'react-router-dom';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import LanguageIcon from '@mui/icons-material/Language';
import ProfileButton from './ProfileButton';
import logo from '../../../public/img/logo.svg';
import './Navbar.css';

const Navbar = ({ showSearchBar }) => {
    const [scrolled, setScrolled] = React.useState(false);

    React.useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className="navbar">
            <div className={`top-row ${scrolled ? 'scrolled' : ''}`}>
                <Link to="/">
                    <img src={logo} className="navbar-logo" alt="Logo" />
                </Link>
                {showSearchBar && (<div className="element element2">
                    <div>Stays</div>
                    <div>Experiences</div>
                </div>)}
                <div className="profile-container">
                    <div className="airbnb-your-home">Airbnb your home</div>
                    <div className="airbnb-your-home">
                        <LanguageIcon sx={{ fontSize: "1.3rem" }} />
                    </div>
                    <div className="profile-div">
                        <div>
                            <ProfileButton />
                        </div>
                    </div>
                </div>
            </div>
            {showSearchBar && (
                <div className={`bottom-row ${scrolled ? 'scrolled' : ''}`}>
                    <div className="elementA search-bar">
                        <div className="search-bar-text">Anywhere</div>
                        <div className="search-bar-text">Any Week</div>
                        <div className="search-bar-text2">Add guests</div>
                        <div className="search-icon-div">
                            <SearchRoundedIcon className="search-icon" />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Navbar;