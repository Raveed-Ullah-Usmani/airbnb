import Homepage from "./pages/HomePage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";



const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
      </Routes>
    </Router>
  );
}

export default App;
