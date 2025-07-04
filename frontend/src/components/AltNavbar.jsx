import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogOut, Menu, Search } from "lucide-react";
import { useAuth } from "../store/AuthContext";
import { toast } from "react-hot-toast";

const AltNavbar = () => {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
	const { logout } = useAuth();
	const navigate = useNavigate();

	const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

    useEffect(() => {
		const handleScroll = () => {
			const scrollTop = window.scrollY;
			setIsScrolled(scrollTop > 50);
		};
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	const handleLogout = async () => {
		try {
			await logout();
			toast.success('Logged out successfully!');
			navigate('/login', { replace: true });
		} catch (error) {
			console.error('Logout error:', error);
			toast.error('Failed to logout. Please try again.');
		}
	};

	return (
		<header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                isScrolled ? 'bg-black' : 'bg-transparent'
              }`}>
                <div className="max-w-6xl mx-auto flex items-center justify-between p-4">
                  {/* Logo and Text - Far Left */}
                  <div className="flex items-center gap-4 ml-2">
                    <img
                      src="/ellip-logo1.png"
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
                  <div className="flex items-center gap-3 mr-1">
                    {/* Contact Us Icon */}
                                                              
                    <Link to="/h" className="text-white hover:text-blue-400 transition-colors p-2 hover:bg-gray-900 rounded-full">
                      Home
                    </Link>
                    
                    <Link to="/auh" className="text-white hover:text-blue-400 transition-colors p-2 hover:bg-gray-900 rounded-full">
                      About Us
                    </Link>
                                        
                    {/* Member Icon */}
                    <Link to="/memberh" className="text-white hover:text-blue-400 transition-colors p-2 hover:bg-gray-900 rounded-full">
                      Team
                    </Link>
                                        
                    <Link to="/blog" className="text-white hover:text-blue-400 transition-colors p-2 hover:bg-gray-900 rounded-full">
                      Blog
                    </Link>
                    
                    <Link to="/contacth" className="text-white hover:text-blue-400 transition-colors p-2 hover:bg-gray-900 rounded-full">
                      Contact Us
                    </Link>
                    
                    {/* Logout Button */}
                    <button 
                      onClick={handleLogout}
                      className="text-white hover:text-red-400 transition-colors p-2 hover:bg-gray-900 rounded-full flex items-center gap-1"
                    >
                      <LogOut size={16} />
                      Logout
                    </button>
                  </div>
                </div>
              </header>
	);
};

export default AltNavbar;