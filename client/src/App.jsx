import BookingPage from "./pages/BookingPage";
import ErrorPage from "./pages/ErrorPage";
import Homepage from "./pages/HomePage";
import AdminRoute from './routes/AdminRoute';
import ListingDetailPage from "./pages/ListingDetailPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ListingsManagementPage from "./pages/ListingsManagementPage";
import HostListingsManagementPage from "./pages/HostListingsManagementPage";
import BookingsManagementPage from "./pages/BookingsManagementPage";
import HostBookingsManagementPage from "./pages/HostBookingsManagementPage";
import AdminPage from "./pages/AdminPage";
import UserProfilePage from "./pages/UserProfilePage";
import GuestRoute from "./routes/GuestRoute";
import HostRoute from "./routes/HostRoute";
import DashboardPage from "./pages/DashboardPage";



const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<RegisterPage />} />
        <Route path="/listings/:id" element={<ListingDetailPage />} />
        <Route element={<GuestRoute />}>
          <Route path="/" element={<Homepage />} />
          <Route path="/booking/:id" element={<BookingPage />} />
          <Route path="/profile" element={<UserProfilePage />} />
        </Route>
        <Route element={<HostRoute />}>
          <Route path="/dashboard" element={<DashboardPage />}>
            <Route index element={<HostListingsManagementPage />} /> {/* Default page */}
            <Route path="listings" element={<HostListingsManagementPage />} />
            <Route path="bookings" element={<HostBookingsManagementPage />} />
          </Route>
        </Route>
        <Route element={<AdminRoute />}>
          <Route path="/admin" element={<AdminPage />}>
            <Route index element={<ListingsManagementPage />} /> {/* Default page */}
            <Route path="listings" element={<ListingsManagementPage />} />
            <Route path="bookings" element={<BookingsManagementPage />} />
          </Route>
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router >
  );
}

export default App;
