import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { LogOut, Menu, Search, User, ChevronDown } from "lucide-react";

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
        
        {/* Icons - Far Right */}
        <div className="flex items-center gap-4 mr-1">
          {/* Contact Us Icon */}
          <Link to="/" className="text-white hover:text-blue-400 transition-colors p-2 hover:bg-gray-900 rounded-full">
            Home
          </Link>
          
          <Link to="/au" className="text-white hover:text-blue-400 transition-colors p-2 hover:bg-gray-900 rounded-full">
            About Us
          </Link>

          {/* Member Icon */}
          <Link to="/member" className="text-white hover:text-blue-400 transition-colors p-2 hover:bg-gray-900 rounded-full">
            Team
          </Link>

          <Link to="/contact" className="text-white hover:text-blue-400 transition-colors p-2 hover:bg-gray-900 rounded-full">
            Contact Us
          </Link>

          {/* User Icon with Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button 
              className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-800 text-white hover:text-blue-400 transition-colors hover:bg-gray-700"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <User size={20} />
            </button>
            
            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div 
                className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50"
              >
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
      </div>
    </header>
  );
};

export default Navbar;