import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Shop Parts', path: '/shop' },
  ];

  return (
    <nav className="fixed w-full z-50 top-0 border-b border-white/5 bg-black/40 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-black tracking-tighter uppercase text-amber-500">
              Heavy<span className="text-white">Duty</span>
            </Link>
          </div>
          
          {/* Desktop Links */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-10">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="text-zinc-400 hover:text-white transition-colors duration-300 py-2 text-xs uppercase tracking-[0.2em] font-bold"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-zinc-400 hover:text-white p-2 transition-colors"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Expansion */}
      {isOpen && (
        <div className="md:hidden bg-black/90 backdrop-blur-2xl border-b border-white/5">
          <div className="px-4 pt-4 pb-6 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="text-zinc-400 hover:text-amber-500 block py-4 text-sm uppercase tracking-[0.2em] font-bold border-b border-white/5 last:border-0"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;