import Navbar from "./components/TestNavBar/Navbar"
import Filter from "./components/Filter/Filter";
// import Navbar from "./components/Header/Navbar"
function App() {
  const scrollableBodyStyle = {
    height: `calc(100vh - 60px)`, // Full height minus navbar height
    overflowY: 'auto', // Enable vertical scrolling
    padding: '15px',
    backgroundColor: '#f4f4f4', // Light background for visibility
  };

  return (
    <>
      <Navbar />
      <Filter />
      <div style={scrollableBodyStyle}>
        {Array.from({ length: 1000 }, (_, index) => (
          <p key={index}>This is item {index + 1}</p>
        ))}
      </div>
    </>
  )
}

export default App
App.js