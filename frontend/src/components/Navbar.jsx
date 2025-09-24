import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogOut, Menu, Search, User, ChevronDown, X } from "lucide-react";

const UserDropdown = ({ size = 20 }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className={`flex items-center justify-center w-10 h-10 rounded-full transition-colors ${
          isDropdownOpen 
            ? 'bg-gray-700 text-blue-400' 
            : 'bg-gray-800 text-white hover:text-blue-400 hover:bg-gray-700'
        }`}
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        <User size={size} />
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
         {/*} <Link  
            to="/admin"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            onClick={() => setIsDropdownOpen(false)}
          >
            Admin
          </Link>*/}
        </div>
      )}
    </div>
  );
};

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
    
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-black' : 'bg-transparent'
    }`}>
      <div className="max-w-6xl mx-auto flex items-center justify-between p-4">
        {/* Logo - Far Left */}
        <div className="flex items-center ml-2">
          <img
            src="/alc_logo.png"
            alt="Art Law Communion Logo"
            className="w-16 h-16 md:w-23 md:h-22 rounded-lg shadow-lg"
          />
          <div className="text-white ml-2" style={{ fontFamily: 'Consolas, serif' }}>
            <div className="text-sm md:text-xl font-bold leading-tight">ART</div>
            <div className="text-sm md:text-xl font-bold leading-tight">LAW</div>
            <div className="text-sm md:text-xl font-bold leading-tight">COMMUNION</div>
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
            ALC Fenestra
          </Link>

          <Link to="/events" className="text-white hover:text-blue-400 transition-colors p-2 hover:bg-gray-900 rounded-full">
            Events
          </Link>

          <Link to="/contact" className="text-white hover:text-blue-400 transition-colors p-2 hover:bg-gray-900 rounded-full">
            Contact Us
          </Link>

          {/* Common User Dropdown for Desktop */}
          <UserDropdown size={20} />
        </div>

        {/* Mobile Menu Button - Visible only on mobile */}
        <div className="md:hidden flex items-center gap-2">
          {/* Common User Dropdown for Mobile */}
          <UserDropdown size={18} />

          {/* Mobile Menu Toggle */}
          <button
            className="text-white hover:text-blue-400 p-2 hover:bg-gray-900 rounded-full transition-colors"
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-black bg-opacity-95 backdrop-blur-md">
          <div className="flex flex-col py-4 px-6 space-y-4">
            <Link 
              to="/" 
              className="text-white hover:text-blue-400 transition-colors py-2 px-4 hover:bg-gray-900 rounded-lg"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            
            <Link 
              to="/au" 
              className="text-white hover:text-blue-400 transition-colors py-2 px-4 hover:bg-gray-900 rounded-lg"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About Us
            </Link>

            <Link 
              to="/member" 
              className="text-white hover:text-blue-400 transition-colors py-2 px-4 hover:bg-gray-900 rounded-lg"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Team
            </Link>

            <Link 
              to="/bl" 
              className="text-white hover:text-blue-400 transition-colors py-2 px-4 hover:bg-gray-900 rounded-lg"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              ALC Fenestra
            </Link>

            <Link 
              to="/events" 
              className="text-white hover:text-blue-400 transition-colors py-2 px-4 hover:bg-gray-900 rounded-lg"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Events
            </Link>

            <Link 
              to="/contact" 
              className="text-white hover:text-blue-400 transition-colors py-2 px-4 hover:bg-gray-900 rounded-lg"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact Us
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;