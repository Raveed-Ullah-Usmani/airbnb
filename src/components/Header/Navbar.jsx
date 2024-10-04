import logo from "/img/logo.svg";
import "./Navbar.css";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import LanguageIcon from "@mui/icons-material/Language";
import ProfileButton from "./ProfileButton";
const Navbar = () => {
    return (
        <div className="navbar">
            <img src={logo} alt="logo" className="navbar-logo" />
            {/* <div className="navbar-items">
                    <div>Stays</div>
                    <div>Experiences</div>
                </div> */}
            <div className="search-bar">
                <div className="search-bar-text">Anywhere</div>
                <div className="search-bar-text">Any Week</div>
                <div className="search-bar-text2">Add guests</div>
                <div className="search-icon-div">
                    <SearchRoundedIcon className="search-icon" />
                </div>
            </div>
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
    );
}

export default Navbar;