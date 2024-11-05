import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import axios from 'axios';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null); // null means not logged in
    const [token, setToken] = useState(localStorage.getItem('token'));

    useEffect(() => {
        // Load token and user from localStorage on startup
        const storedToken = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');

        if (storedToken) {
            setToken(storedToken);
            axios.defaults.headers.common["Authorization"] = "Bearer " + storedToken;
        }

        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    useEffect(() => {
        if (token) {
            axios.defaults.headers.common["Authorization"] = "Bearer " + token;
            localStorage.setItem('token', token);
        } else {
            delete axios.defaults.headers.common["Authorization"];
            localStorage.removeItem('token');
        }
    }, [token]);



    const login = (userData) => {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
    }
    const logout = () => {
        setUser(null);
        setToken("");
    };

    return (
        <UserContext.Provider value={{ user, login, logout, token, setToken }}>
            {children}
        </UserContext.Provider>
    );
};

// Custom hook to access user context
export const useUserContext = () => useContext(UserContext);
