import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import './AdminPage.css';
import Navbar from '../components/TestNavBar/Navbar';

const AdminPage = () => {
    return (
        <div className="admin-panel">
            <Navbar />
            <h1></h1>
            <nav>
                <ul>
                    <li><Link to="/admin">Listings Management</Link></li>
                    <li><Link to="bookings">Bookings Management</Link></li>
                </ul>
            </nav>
            <div className="content">
                <Outlet />
            </div>
        </div>
    );
};

export default AdminPage;