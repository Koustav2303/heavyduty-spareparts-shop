import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

// Components & Pages
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Shop from './pages/Shop';
import AuthModal from './components/AuthModal';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);
  
  return null;
};

function App() {
  // Authentication Matrix triggers immediately on load
  const [isAuthOpen, setIsAuthOpen] = useState(true);

  return (
    // Replaced BrowserRouter with HashRouter for GitHub Pages compatibility
    <Router>
      <ScrollToTop />
      <div className="bg-[#050505] text-white min-h-screen font-sans selection:bg-amber-500 selection:text-black flex flex-col relative">
        
        <Navbar />
        
        {/* System Authentication Popup */}
        <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />

        {/* Main Content Area */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/shop" element={<Shop />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;