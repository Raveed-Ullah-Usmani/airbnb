import { React, useState, useEffect } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useUserContext } from '../context/UserContext';
import axios from 'axios';

const ProtectedRoute = () => {
    const { token } = useUserContext();
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    useEffect(() => {
        const fetchUserRole = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/auth/role', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                if (response.data.role === 'admin') {
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
            setIsAuthenticated(false);
        }
    }, [token]);

    if (isAuthenticated === null) {
        return <div>Loading...</div>;
    }

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;