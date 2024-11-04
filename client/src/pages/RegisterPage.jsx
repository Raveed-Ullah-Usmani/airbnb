import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./LoginPage.css";
import { useUserContext } from '../context/UserContext';

const RegisterPage = () => {
    const { login } = useUserContext();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        // Basic form validation
        if (!username || !email || !password) {
            setErrorMessage("Please fill in all fields.");
            return;
        }

        try {
            const response = await axios.post("http://localhost:3000/api/auth/register", { username, email, password }, {
                headers: { "Content-Type": "application/json" },
            });

            if (response.data.token) {
                // Store token in localStorage or context as required
                localStorage.setItem("token", response.data.token);
                login({ username, email }); // Set the user context
                navigate("/");  // Redirect to the home page after successful registration
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
                {errorMessage && <p className="error">{errorMessage}</p>}
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default RegisterPage;