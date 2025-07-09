import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { LogOut, Menu, Search, User, ChevronDown, X } from "lucide-react";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
    
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-black' : 'bg-transparent'
    }`}>
      <div className="max-w-6xl mx-auto flex items-center justify-between p-4">
        {/* Logo - Far Left */}
        <div className="flex items-left ml-2">
          <img
            src="/alc_logo.png"
            alt="Art Law Communion Logo"
            className="w-23 h-22 rounded-lg shadow-lg"
          />
          <div className="text-white" style={{ fontFamily: 'Consolas, serif' }}>
            <div className="text-xl font-bold leading-tight">ART</div>
            <div className="text-xl font-bold leading-tight">LAW</div>
            <div className="text-xl font-bold leading-tight">COMMUNION</div>
          </div>
        </div>
        
        {/* Desktop Navigation - Hidden on mobile */}
        <div className="hidden md:flex items-center gap-4 mr-1">
          <Link to="/" className="text-white hover:text-blue-400 transition-colors p-2 hover:bg-gray-900 rounded-full">
            Home
          </Link>
          
          <Link to="/au" className="text-white hover:text-blue-400 transition-colors p-2 hover:bg-gray-900 rounded-full">
            About Us
          </Link>

          <Link to="/member" className="text-white hover:text-blue-400 transition-colors p-2 hover:bg-gray-900 rounded-full">
            Team
          </Link>

          <Link to="/bl" className="text-white hover:text-blue-400 transition-colors p-2 hover:bg-gray-900 rounded-full">
            Blog
          </Link>

          <Link to="/contact" className="text-white hover:text-blue-400 transition-colors p-2 hover:bg-gray-900 rounded-full">
            Contact Us
          </Link>

          {/* User Icon with Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
                className={`flex items-center justify-center w-10 h-10 rounded-full transition-colors ${
                  isDropdownOpen 
                    ? 'bg-gray-700 text-blue-400' 
                    : 'bg-gray-800 text-white hover:text-blue-400 hover:bg-gray-700'
                }`}
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
              <User size={20} />
            </button>
            
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                <Link 
                  to="/login" 
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  Login
                </Link>
                <Link  
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  Become a Member
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu Button - Visible only on mobile */}
        <div className="md:hidden flex items-center">
          <div className="relative mr-2" ref={dropdownRef}>
            <button
              className={`flex items-center justify-center w-10 h-10 rounded-full transition-colors ${
                isDropdownOpen 
                  ? 'bg-gray-700 text-blue-400' 
                  : 'bg-gray-800 text-white hover:text-blue-400 hover:bg-gray-700'
              }`}
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <User size={20} />
            </button>
            
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                <Link 
                  to="/login" 
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  Login
                </Link>
                <Link  
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  Become a Member
                </Link>
              </div>
            )}
          </div>
          
          <button 
            onClick={toggleMobileMenu}
            className="text-white p-2 rounded-full hover:bg-gray-700"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Content */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-black border-t border-gray-800 w-full py-4 px-6">
          <Link 
            to="/" 
            className="block text-white py-3 hover:text-blue-400"
            onClick={toggleMobileMenu}
          >
            Home
          </Link>
          <Link 
            to="/au" 
            className="block text-white py-3 hover:text-blue-400"
            onClick={toggleMobileMenu}
          >
            About Us
          </Link>
          <Link 
            to="/member" 
            className="block text-white py-3 hover:text-blue-400"
            onClick={toggleMobileMenu}
          >
            Team
          </Link>
          <Link 
            to="/bl" 
            className="block text-white py-3 hover:text-blue-400"
            onClick={toggleMobileMenu}
          >
            Blog
          </Link>
          <Link 
            to="/contact" 
            className="block text-white py-3 hover:text-blue-400"
            onClick={toggleMobileMenu}
          >
            Contact Us
          </Link>
        </div>
      )}
    </header>
  );
};

export default Navbar;