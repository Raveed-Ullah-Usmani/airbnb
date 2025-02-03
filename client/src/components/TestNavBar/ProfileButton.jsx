
import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";

const ProfileButton = () => {
    const navigate = useNavigate();
    const { user, logout } = useUserContext();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogin = () => {
        navigate("/login");
    };

    const handleSignup = () => {
        navigate("/signup");
    };

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <div>
            <div
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
                className="profile-menu-flex"
            >
                <MenuRoundedIcon />
                <AccountCircleRoundedIcon />
            </div>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    "aria-labelledby": "basic-button",
                }}
                sx={{
                    ".MuiPaper-root": {
                        minWidth: "200px",
                        borderRadius: "1rem",
                        boxShadow: "0 1px 2px rgb(0 0 0 / 8%), 0 4px 12px rgb(0 0 0 / 5%)",
                    },
                }}
            >
                {user ? (
                    [
                        user.userRole !== "host" && <MenuItem key="profile" onClick={() => navigate("/profile")}>Profile</MenuItem>,
                        <MenuItem key="logout" onClick={handleLogout}>Logout</MenuItem>
                    ]
                ) : (
                    [
                        <MenuItem key="login" onClick={handleLogin}>Login</MenuItem>,
                        <MenuItem key="signup" onClick={handleSignup}>Signup</MenuItem>
                    ]
                )}
            </Menu>
        </div>
    );
}
export default ProfileButton;
