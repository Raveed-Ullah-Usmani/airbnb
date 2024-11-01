import Homepage from "./pages/HomePage";
import ListingDetailPage from "./pages/ListingDetailPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";



const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/listings/:id" element={<ListingDetailPage />} />
      </Routes>
    </Router>
  );
}

export default App;
