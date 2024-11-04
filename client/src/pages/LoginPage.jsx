import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./LoginPage.css";
import { useUserContext } from '../context/UserContext';

const LoginPage = () => {
    const { login } = useUserContext();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        // Basic form validation
        if (!email || !password) {
            setErrorMessage("Please fill in both fields.");
            return;
        }

        try {
            const response = await axios.post("http://localhost:3000/api/auth/login", { email, password }, {
                headers: { "Content-Type": "application/json" },
            });

            if (response.data.token) {
                // Store token in localStorage or context as required
                localStorage.setItem("token", response.data.token);
                login({ email }); // Set the user context
                navigate("/");  // Redirect to the home page after successful login
            } else {
                setErrorMessage("Invalid email or password.");
            }
        } catch (error) {
            console.log(error.message);
            setErrorMessage("An error occurred while logging in. Please try again.");
        }
    };

    return (
        <div className="login-page">
            <form className="login-form" onSubmit={handleLogin}>
                <h2>Login</h2>

                <div className="form-group">
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                    />
                </div>

                <div className="form-group">
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                    />
                </div>

                {errorMessage && <p className="error">{errorMessage}</p>}

                <button type="submit" className="login-btn">Login</button>
                <p className="register-link">Don't have an account? <a href="/signup">Sign up</a></p>
            </form>
        </div>
    );
};

export default LoginPage;
