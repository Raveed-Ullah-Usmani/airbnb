import { list, list2 } from "./cards-list";
import Cards from "./components/Cards/Cards";
import Navbar from "./components/TestNavBar/Navbar";
import Categories from "./components/Categories/Categories";
import Footer from "./components/Footer/Footer"
import { useState } from "react";

function App() {
  const [selectedFilter, setSelectedFilter] = useState(0);
  return (
    <>
      <Navbar />
      <Categories selectedFilter={selectedFilter} setSelectedFilter={setSelectedFilter} />
      {selectedFilter == 0 ? <Cards list={list} /> : <Cards list={list2} />}
      <Footer />
    </>
  );
}

export default App;
