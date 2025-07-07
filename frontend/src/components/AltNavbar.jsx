import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogOut, Menu, Search, User, X } from "lucide-react";
import { useAuth } from "../store/AuthContext";
import { toast } from "react-hot-toast";

const AltNavbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showUserDetails, setShowUserDetails] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [loadingUserDetails, setLoadingUserDetails] = useState(false);
  const dropdownRef = useRef(null);
  const { logout, user, getUserDetails } = useAuth();
  const navigate = useNavigate();

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

  const fetchUserDetails = async () => {
    console.log('Current user object:', user);
    
    let userEmail = null;
    let storedUserData = null;
    
    try {
      // First, try to get user data from localStorage - check ALL possible keys
      const possibleKeys = ['user_data', 'userData', 'user', 'currentUser', 'authUser'];
      
      for (const key of possibleKeys) {
        try {
          const data = localStorage.getItem(key);
          if (data) {
            const parsed = JSON.parse(data);
            console.log(`Found data in localStorage[${key}]:`, parsed);
            
            // Check if this data has an email
            if (parsed.email || parsed.username || parsed.emailAddress) {
              storedUserData = parsed;
              userEmail = parsed.email || parsed.username || parsed.emailAddress;
              console.log(`Email found in localStorage[${key}]:`, userEmail);
              break;
            }
          }
        } catch (err) {
          console.log(`Error parsing localStorage[${key}]:`, err);
        }
      }

      // Debug: Print all localStorage keys to see what's available
      console.log('All localStorage keys:', Object.keys(localStorage));
      
      // Try to get email from the AuthContext user object
      if (!userEmail && user && typeof user === 'object') {
        console.log('Checking AuthContext user object:', user);
        userEmail = user.email || user.username || user.emailAddress;
        console.log('Email from AuthContext:', userEmail);
      }
      
      // Try to get email from token if still no email
      if (!userEmail) {
        try {
          const token = localStorage.getItem('token');
          if (token) {
            console.log('Found token:', token.substring(0, 50) + '...');
            const tokenParts = token.split('.');
            if (tokenParts.length === 3) {
              const payload = JSON.parse(atob(tokenParts[1]));
              console.log('Token payload:', payload);
              userEmail = payload.email || payload.username || payload.sub;
              console.log('Email from token:', userEmail);
            }
          }
        } catch (tokenError) {
          console.error('Error parsing token:', tokenError);
        }
      }

      // Last resort: try to extract from any object in localStorage that might contain email
      if (!userEmail) {
        console.log('Last resort: checking all localStorage values for email...');
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          try {
            const value = localStorage.getItem(key);
            if (value && value.includes('@')) {
              console.log(`Found potential email in localStorage[${key}]:`, value);
              // Try to parse as JSON
              try {
                const parsed = JSON.parse(value);
                if (parsed.email) {
                  userEmail = parsed.email;
                  console.log('Extracted email:', userEmail);
                  break;
                }
              } catch {
                // If not JSON, check if the value itself is an email
                if (value.includes('@') && value.includes('.')) {
                  userEmail = value;
                  console.log('Direct email value:', userEmail);
                  break;
                }
              }
            }
          } catch (err) {
            console.log(`Error checking localStorage[${key}]:`, err);
          }
        }
      }
      
      if (!userEmail) {
        console.error('No email found in user object, localStorage, or token');
        console.log('Final debug - User object:', user);
        console.log('Final debug - localStorage contents:', localStorage);
        toast.error('No user email found. Please log in again.');
        return;
      }

      console.log('Using email for API call:', userEmail);
      setLoadingUserDetails(true);
      
      const userData = await getUserDetails(userEmail);
      
      if (userData) {
        setUserDetails(userData);
        setShowUserDetails(true);
        setIsDropdownOpen(false);
      } else {
        throw new Error('No user data returned from API');
      }
      
    } catch (error) {
      console.error('Error in fetchUserDetails:', error);
      
      // More specific error messages
      if (error.message.includes('404')) {
        toast.error('User not found. Please contact support.');
      } else if (error.message.includes('401')) {
        toast.error('Authentication failed. Please log in again.');
      } else if (error.message.includes('network')) {
        toast.error('Network error. Please check your connection.');
      } else {
        toast.error('Failed to fetch user details. Please try again.');
      }
    } finally {
      setLoadingUserDetails(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Logged out successfully!');
      navigate('/login', { replace: true });
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Failed to logout. Please try again.');
    }
    setIsDropdownOpen(false);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-black' : 'bg-transparent'
    }`}>
      <div className="max-w-6xl mx-auto flex items-center justify-between p-4">
        {/* Logo and Text - Far Left */}
        <div className="flex items-center gap-4 ml-2">
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
        <div className="flex items-center gap-3 mr-1">
          {/* Navigation Links */}
          <Link to="/h" className="text-white hover:text-blue-400 transition-colors p-2 hover:bg-gray-900 rounded-full">
            Home
          </Link>
          
          <Link to="/auh" className="text-white hover:text-blue-400 transition-colors p-2 hover:bg-gray-900 rounded-full">
            About Us
          </Link>
                                                
          <Link to="/memberh" className="text-white hover:text-blue-400 transition-colors p-2 hover:bg-gray-900 rounded-full">
            Team
          </Link>
                                                
          <Link to="/blog" className="text-white hover:text-blue-400 transition-colors p-2 hover:bg-gray-900 rounded-full">
            Blog
          </Link>
          
          <Link to="/contacth" className="text-white hover:text-blue-400 transition-colors p-2 hover:bg-gray-900 rounded-full">
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
                <button 
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 disabled:opacity-50"
                  onClick={fetchUserDetails}
                  disabled={loadingUserDetails}
                >
                  {loadingUserDetails ? 'Loading...' : 'User Details'}
                </button>
                <button  
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                  onClick={handleLogout}
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* User Details Modal */}
      {showUserDetails && userDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-800">User Details</h2>
              <button 
                onClick={() => setShowUserDetails(false)}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="space-y-4">
              {/* Profile Image */}
              {userDetails.profileImageUrl && (
                <div className="flex justify-center mb-4">
                  <img 
                    src={userDetails.profileImageUrl} 
                    alt="Profile" 
                    className="w-24 h-24 rounded-full object-cover border-2 border-gray-300"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                </div>
              )}
              
              {/* User Information */}
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-600">Name</label>
                  <p className="text-lg text-gray-800">{userDetails.name || 'N/A'}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-600">Email</label>
                  <p className="text-lg text-gray-800">{userDetails.email || 'N/A'}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-600">Membership ID</label>
                  <p className="text-lg text-gray-800 font-mono">{userDetails.membershipId || 'N/A'}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-600">Occupation</label>
                  <p className="text-lg text-gray-800">{userDetails.occupation || 'N/A'}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-600">Status</label>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    userDetails.verified 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {userDetails.verified ? 'Verified' : 'Not Verified'}
                  </span>
                </div>
              </div>
              
              {/* Close Button */}
              <div className="flex justify-end mt-6">
                <button 
                  onClick={() => setShowUserDetails(false)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default AltNavbar;