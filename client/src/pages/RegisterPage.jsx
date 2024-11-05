import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./LoginPage.css";
import { useUserContext } from '../context/UserContext';

const RegisterPage = () => {
    const { login, token, setToken } = useUserContext();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userRole, setUserRole] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        // Basic form validation
        if (!username || !email || !password || !userRole) {
            setErrorMessage("Please fill in all fields.");
            return;
        }

        try {
            const response = await axios.post("http://localhost:3000/api/auth/register", { username, email, password, userRole }, {
                headers: { "Content-Type": "application/json" },
            });

            if (response.data.token) {
                // Store token in localStorage or context as required
                setToken(response.data.token);
                login({ email, userRole }); // Set the user context
                userRole === "host" ? navigate("/dashboard") : navigate("/");
            } else {
                setErrorMessage("Registration failed. Please try again.");
            }
        } catch (error) {
            console.log(error.message);
            setErrorMessage("An error occurred while registering. Please try again.");
        }
    };

    return (
        <div className="login-page">
            <form className="login-form" onSubmit={handleRegister}>
                <h2>Sign up</h2>
                <div className="form-group">
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter your username"
                    />
                </div>
                <div className="form-group">
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                    />
                </div>
                <div className="radio-group">
                    <label>
                        <input
                            type="radio"
                            name="userRole"
                            value="host"
                            checked={userRole === "host"}
                            onChange={(e) => setUserRole(e.target.value)}
                        />
                        Host
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="userRole"
                            value="guest"
                            checked={userRole === "guest"}
                            onChange={(e) => setUserRole(e.target.value)}
                        />
                        Guest
                    </label>
                </div>
                {errorMessage && <p className="error">{errorMessage}</p>}
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default RegisterPage;