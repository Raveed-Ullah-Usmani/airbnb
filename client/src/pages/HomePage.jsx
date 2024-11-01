import { useState, useEffect } from "react";
import Cards from "../components/Cards/Cards";
import Navbar from "../components/TestNavBar/Navbar";
import Categories from "../components/Categories/Categories";
import Footer from "../components/Footer/Footer";
import { list2 } from "../cards-list";

const HomePage = () => {
    const [selectedFilter, setSelectedFilter] = useState(0);
    const [list, setList] = useState([]);  // State for list (from API)
    const [loading, setLoading] = useState(true);  // Loading state
    const [error, setError] = useState(null);  // Error state

    useEffect(() => {
        // Fetch list from API
        fetch("http://localhost:3000/api/listings")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch list");
                }
                return response.json();
            })
            .then((data) => {
                setList(data);  // Update list state with fetched data
                setLoading(false);  // Set loading to false once data is fetched
            })
            .catch((err) => {
                setError(err.message);  // Set error message if fetch fails
                setLoading(false);
            });
    }, []);  // Run once when the component mounts

    if (loading) {
        return <div>Loading...</div>;  // Display loading message
    }

    if (error) {
        return <div>Error: {error}</div>;  // Display error message if fetch fails
    }

    return (
        <>
            <Navbar />
            <Categories selectedFilter={selectedFilter} setSelectedFilter={setSelectedFilter} />
            {/* Render Cards with list fetched from API */}
            {selectedFilter === 0 ? <Cards list={list} /> : <Cards list={list2} />}
            <Footer />
        </>
    );
};

export default HomePage;
