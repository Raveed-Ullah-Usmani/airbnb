import BookingPage from "./pages/BookingPage";
import ErrorPage from "./pages/ErrorPage";
import Homepage from "./pages/HomePage";
import ListingDetailPage from "./pages/ListingDetailPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";



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
      </Routes>
    </Router>
  );
}

export default App;
