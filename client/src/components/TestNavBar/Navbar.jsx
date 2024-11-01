import logo from "/img/logo.svg"
import { useState, useEffect } from 'react';
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import LanguageIcon from "@mui/icons-material/Language";
import './Navbar.css';
import ProfileButton from "./ProfileButton";

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="navbar">
            <div className={`top-row ${scrolled ? 'scrolled' : ''}`}>
                {/* <div className="element element1">Element 1</div> */}
                <img src={logo} className="navbar-logo"></img>
                <div className="element element2">
                    <div>Stays</div>
                    <div>Experiences</div>
                </div>
                {/* <div className="element element3">Element 3</div> */}
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
            <div className={`bottom-row ${scrolled ? 'scrolled' : ''}`}>
                {/* <div className="element elementA">Element A</div> */}
                <div className="elementA search-bar">
                    <div className="search-bar-text">Anywhere</div>
                    <div className="search-bar-text">Any Week</div>
                    <div className="search-bar-text2">Add guests</div>
                    <div className="search-icon-div">
                        <SearchRoundedIcon className="search-icon" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;



