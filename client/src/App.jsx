import BookingPage from "./pages/BookingPage";
import ErrorPage from "./pages/ErrorPage";
import Homepage from "./pages/HomePage";
import ProtectedRoute from './routes/ProtectedRoute';
import ListingDetailPage from "./pages/ListingDetailPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ListingsManagementPage from "./pages/ListingsManagementPage";
import BookingsManagementPage from "./pages/BookingsManagementPage";
import AdminPage from "./pages/AdminPage";
import UserProfilePage from "./pages/UserProfilePage";



const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<RegisterPage />} />
        <Route path="/listings/:id" element={<ListingDetailPage />} />
        <Route path="/booking/:id" element={<BookingPage />} />
        <Route path="*" element={<ErrorPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/admin" element={<AdminPage />}>
            <Route index element={<ListingsManagementPage />} /> {/* Default page */}
            <Route path="listings" element={<ListingsManagementPage />} />
            <Route path="bookings" element={<BookingsManagementPage />} />
          </Route>
          <Route path="/profile" element={<UserProfilePage />} />
        </Route>
      </Routes>
    </Router >
  );
}

export default App;
