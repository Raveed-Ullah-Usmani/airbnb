import React, { useState, useEffect } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useUserContext } from '../context/UserContext.jsx';
import axiosInstance from '../utils/axiosConfig.js';

const GuestRoute = () => {
    const { token } = useUserContext();
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    useEffect(() => {
        const fetchUserRole = async () => {
            try {
                const response = await axiosInstance.get('/auth/role');
                console.log("Role: ", response.data.userRole);
                if (response.data.userRole === 'guest') {
                    setIsAuthenticated(true);
                } else {
                    setIsAuthenticated(false);
                }
            } catch (error) {
                console.error('Error fetching user role:', error);
                setIsAuthenticated(false);
            }
        };

        if (token) {
            fetchUserRole();
        } else {
            console.log('No token found');
            setIsAuthenticated(false);
        }
    }, [token]);

    if (isAuthenticated === null) {
        return <div>Loading...</div>;
    }

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default GuestRoute;