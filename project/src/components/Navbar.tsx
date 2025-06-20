import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Zap, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Close mobile menu when route changes
    setIsMenuOpen(false);
  }, [location]);

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white bg-opacity-90 backdrop-blur-sm shadow-md py-3' 
          : 'bg-transparent py-5'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <Zap className="h-8 w-8 text-accent-500" />
            <span className="text-xl font-bold text-primary-900">EnhanceAI</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`font-medium transition-colors ${
                location.pathname === '/' 
                  ? 'text-primary-600' 
                  : 'text-slate-700 hover:text-primary-600'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/upload" 
              className={`font-medium transition-colors ${
                location.pathname === '/upload' 
                  ? 'text-primary-600' 
                  : 'text-slate-700 hover:text-primary-600'
              }`}
            >
              Enhance
            </Link>
            <a 
              href="#features" 
              className="text-slate-700 hover:text-primary-600 font-medium transition-colors"
            >
              Features
            </a>
            <a 
              href="#examples" 
              className="text-slate-700 hover:text-primary-600 font-medium transition-colors"
            >
              Examples
            </a>
          </nav>

          <div className="hidden md:block">
            <Link to="/upload" className="btn-primary">
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-slate-700"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div 
          className="md:hidden bg-white shadow-lg absolute top-full left-0 right-0 border-t border-slate-100 py-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
        >
          <div className="container mx-auto px-4 flex flex-col space-y-4">
            <Link 
              to="/" 
              className={`px-4 py-2 rounded-lg ${
                location.pathname === '/' 
                  ? 'bg-primary-50 text-primary-600' 
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/upload" 
              className={`px-4 py-2 rounded-lg ${
                location.pathname === '/upload' 
                  ? 'bg-primary-50 text-primary-600' 
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              Enhance
            </Link>
            <a 
              href="#features" 
              className="px-4 py-2 rounded-lg text-slate-700 hover:bg-slate-50"
            >
              Features
            </a>
            <a 
              href="#examples" 
              className="px-4 py-2 rounded-lg text-slate-700 hover:bg-slate-50"
            >
              Examples
            </a>
            <Link to="/upload" className="btn-primary text-center mx-4">
              Get Started
            </Link>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
};

export default Navbar;