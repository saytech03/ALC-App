import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { LogOut, Menu, Search } from "lucide-react";

const Navbar = () => {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
	const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
    
    useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

	return (
		<header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                isScrolled ? 'bg-black' : 'bg-transparent'
              }`}>
                <div className="max-w-6xl mx-auto flex items-center justify-between p-4">
                  {/* Logo - Far Left */}
                  <div className="flex items-left ml-2">
                    <img
                      src="/ellip-logo1.png"
                      alt="Art Law Communion Logo"
                      className="w-14 h-12 rounded-lg shadow-lg"
                    />
                  </div>
                  
                  {/* Icons - Far Right */}
                  <div className="flex items-center gap-3 mr-1">
                    {/* Contact Us Icon */}
                    <Link to="/contact" className="text-white hover:text-blue-400 transition-colors p-2 hover:bg-gray-900 rounded-full">
                      Contact Us
                    </Link>
                    
                    <Link to="/" className="text-white hover:text-blue-400 transition-colors p-2 hover:bg-gray-900 rounded-full">
                      Home
                    </Link>
                    
                    {/* Member Icon */}
                    <Link to="/member" className="text-white hover:text-blue-400 transition-colors p-2 hover:bg-gray-900 rounded-full">
                      About Us
                    </Link>

                    <Link to="/event" className="text-white hover:text-blue-400 transition-colors p-2 hover:bg-gray-900 rounded-full">
                      Events
                    </Link>

                    <Link to="/blog" className="text-white hover:text-blue-400 transition-colors p-2 hover:bg-gray-900 rounded-full">
                      Blogspot
                    </Link>

                    {/* Login Icon */}
                    <Link to="/login" className="text-white hover:text-blue-400 transition-colors p-2 hover:bg-gray-900 rounded-full">
                      Login
                    </Link>
                  </div>
                </div>
              </header>
	);
};
export default Navbar;