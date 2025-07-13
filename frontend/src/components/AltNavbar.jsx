import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogOut, Menu, User, X } from "lucide-react";
import { useAuth } from "../store/AuthContext";
import { toast } from "react-hot-toast";

const UserAvatarDropdown = ({ size = 20 }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showUserDetails, setShowUserDetails] = useState(false);
  const [userData, setUserData] = useState(null);
  const [randomAvatar, setRandomAvatar] = useState(null);
  const dropdownRef = useRef(null);
  
  const authContext = useAuth();
  const { logout } = authContext;
  const navigate = useNavigate();

  // Avatar images array
  const avatarImages = [
    "/avatar1.png",
    "/avatar2.png", 
    "/avatar3.png"
  ];

  // Load user data and set avatar on component mount
  useEffect(() => {
    // Set random avatar
    const storedAvatar = localStorage.getItem('userAvatar');
    if (storedAvatar) {
      setRandomAvatar(storedAvatar);
    } else {
      const randomIndex = Math.floor(Math.random() * avatarImages.length);
      const selectedAvatar = avatarImages[randomIndex];
      setRandomAvatar(selectedAvatar);
      localStorage.setItem('userAvatar', selectedAvatar);
    }

    // Load user data
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUserData({
          email: parsedUser.email,
          id: parsedUser.id,
          name: parsedUser.name,
          alc_patronid: parsedUser.membershipId || parsedUser.alc_patronid,
          profileImageUrl: parsedUser.profileImageUrl
        });
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);

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

  const handleLogout = async () => {
    try {
      await logout();
      localStorage.removeItem('userAvatar');
      localStorage.removeItem('currentUser');
      toast.success('Logged out successfully!');
      navigate('/login', { replace: true });
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Failed to logout. Please try again.');
    }
    setIsDropdownOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        className="flex items-center justify-center w-10 h-10 text-white hover:text-blue-400 transition-colors hover:bg-gray-700 overflow-hidden"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        {randomAvatar ? (
          <img 
            src={randomAvatar} 
            alt="Avatar" 
            className="w-full h-full object-contain"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextElementSibling.style.display = 'block';
            }}
          />
        ) : null}
        <User 
          size={size} 
          style={{ display: randomAvatar ? 'none' : 'block' }} 
        />
      </button>
      
      {/* Dropdown Menu - Now fully functional */}
      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
          <button 
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            onClick={() => {
              setIsDropdownOpen(false);
              if (userData) {
                setShowUserDetails(true);
              } else {
                toast.error('User data not available');
              }
            }}
          >
            User Details
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

      {/* User Details Modal - Now properly connected */}
      {showUserDetails && userData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">User Details</h2>
              <button 
                onClick={() => setShowUserDetails(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-center">
                <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-gray-300 bg-gray-200 flex items-center justify-center">
                  {userData.profileImageUrl ? (
                    <img 
                      src={userData.profileImageUrl} 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User size={40} className="text-gray-400" />
                  )}
                </div>
              </div>
              
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-600">Name</label>
                  <p className="text-lg text-gray-800">{userData.name || 'Not available'}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-600">Email</label>
                  <p className="text-lg text-gray-800 break-all">{userData.email}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-600">ALC Patron ID</label>
                  <p className="text-lg text-gray-800 font-mono">{userData.alc_patronid}</p>
                </div>
                
              </div>
             
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const AltNavbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showImageUpload, setShowImageUpload] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [deletingImage, setDeletingImage] = useState(false);
  const fileInputRef = useRef(null);
   
  const authContext = useAuth();
  const { uploadProfileImage, deleteProfileImage } = authContext;
  const isAuthenticated = true;
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

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('File size must be less than 5MB');
      return;
    }

    setUploadingImage(true);
    try {
      const response = await uploadProfileImage(file);
      
      if (response.success) {
        toast.success('Profile image updated successfully!');
        setShowImageUpload(false);
      } else {
        toast.error('Failed to upload image: ' + response.message);
      }
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload image: ' + error.message);
    } finally {
      setUploadingImage(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleImageDelete = async () => {
    if (!window.confirm('Are you sure you want to delete your profile image?')) {
      return;
    }

    setDeletingImage(true);
    try {
      const response = await deleteProfileImage();
      
      if (response.success) {
        toast.success('Profile image deleted successfully!');
        setShowImageUpload(false);
      } else {
        toast.error('Failed to delete image: ' + response.message);
      }
    } catch (error) {
      console.error('Delete error:', error);
      toast.error('Failed to delete image: ' + error.message);
    } finally {
      setDeletingImage(false);
    }
  };

  const handleNavClick = (path) => {
    setIsMobileMenuOpen(false);
    navigate(path);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-black' : 'bg-transparent'
    }`}>
      <div className="max-w-6xl mx-auto flex items-center justify-between p-4">
        {/* Logo and Text - Far Left */}
        <div className="flex items-center gap-2 md:gap-4 ml-2">
          <img
            src="/alc_logo.png"
            alt="Art Law Communion Logo"
            className="w-16 h-16 md:w-23 md:h-22 rounded-lg shadow-lg"
          />
          <div className="text-white" style={{ fontFamily: 'Consolas, serif' }}>
            <div className="text-sm md:text-xl font-bold leading-tight">ART</div>
            <div className="text-sm md:text-xl font-bold leading-tight">LAW</div>
            <div className="text-sm md:text-xl font-bold leading-tight">COMMUNION</div>
          </div>
        </div>
                                          
        {/* Desktop Navigation - Hidden on mobile */}
        <div className="hidden md:flex items-center gap-3 mr-1">
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
            ALC Fenestra
          </Link>
          
          <Link to="/contacth" className="text-white hover:text-blue-400 transition-colors p-2 hover:bg-gray-900 rounded-full">
            Contact Us
          </Link>

          {/* User Avatar Dropdown for Desktop */}
          <UserAvatarDropdown size={20} />
        </div>

        {/* Mobile Menu Button - Visible only on mobile */}
        <div className="md:hidden flex items-center gap-2">
          {/* User Avatar Dropdown for Mobile */}
          <UserAvatarDropdown size={18} />

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
              to="/h" 
              className="text-white hover:text-blue-400 transition-colors py-2 px-4 hover:bg-gray-900 rounded-lg"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            
            <Link 
              to="/auh" 
              className="text-white hover:text-blue-400 transition-colors py-2 px-4 hover:bg-gray-900 rounded-lg"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About Us
            </Link>

            <Link 
              to="/memberh" 
              className="text-white hover:text-blue-400 transition-colors py-2 px-4 hover:bg-gray-900 rounded-lg"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Team
            </Link>

            <Link 
              to="/blog" 
              className="text-white hover:text-blue-400 transition-colors py-2 px-4 hover:bg-gray-900 rounded-lg"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              ALC Fenestra
            </Link>

            <Link 
              to="/contacth" 
              className="text-white hover:text-blue-400 transition-colors py-2 px-4 hover:bg-gray-900 rounded-lg"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact Us
            </Link>
          </div>
        </div>
      )}

      {/* Image Upload Modal - Keep this if you want to maintain image upload functionality */}
      {showImageUpload && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-sm w-full mx-4 p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Profile Image</h3>
              <button 
                onClick={() => setShowImageUpload(false)}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="space-y-4">
              {/* Upload Guidelines */}
              <div className="text-sm text-gray-500 text-center">
                <p>Upload a profile image (JPG, PNG, GIF)</p>
                <p>Maximum file size: 5MB</p>
              </div>
              
              {/* Action Buttons */}
              <div className="flex flex-col space-y-2">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploadingImage}
                  className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                >
                  <Upload size={16} />
                  {uploadingImage ? 'Uploading...' : 'Upload New Image'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="hidden"
      />
    </header>
  );
};

export default AltNavbar;