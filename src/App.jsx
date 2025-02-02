import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import SearchPage from "./pages/SearchPages";
import Series from "./pages/Series";
import Movies from "./pages/Movies";
import Originals from "./pages/Originals";

function AppContent() {
  return (
    <div className="bg-[#000f2c] text-white flex flex-col min-h-screen scrollbar-none scroll-smooth">
      {/* Header Section */}
      <Header />
  
      {/* Main Content Section */}
      <div className="flex-1 w-full px-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/SearchPages" element={<SearchPage />} />
          <Route path="/Series" element={<Series />} />
          <Route path="/Movies" element={<Movies />} />
          <Route path="/Originals" element={<Originals />} />
        </Routes>
      </div>
  
      {/* Footer Section */}
      <Footer />
    </div>
  ); 
}
const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
