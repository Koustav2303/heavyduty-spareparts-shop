import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

// Components & Pages
import Navbar from './components/Navbar';
import Footer from './components/Footer'; // Import the new Footer
import Home from './pages/Home';
import About from './pages/About';
import Shop from './pages/Shop';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant'
    });
  }, [pathname]);
  
  return null;
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="bg-[#050505] text-white min-h-screen font-sans selection:bg-amber-500 selection:text-black flex flex-col">
        <Navbar />
        
        {/* Main Content Area */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/shop" element={<Shop />} />
          </Routes>
        </main>

        {/* Global Footer */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;