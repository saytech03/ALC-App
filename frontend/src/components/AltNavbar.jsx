import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogOut, Menu, Search, User, X, Camera, Upload, Trash2 } from "lucide-react";
import { useAuth } from "../store/AuthContext";
import { toast } from "react-hot-toast";

const AltNavbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showUserDetails, setShowUserDetails] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [loadingUserDetails, setLoadingUserDetails] = useState(false);
  const [showImageUpload, setShowImageUpload] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [deletingImage, setDeletingImage] = useState(false);
  const [randomAvatar, setRandomAvatar] = useState(null);
  const dropdownRef = useRef(null);
  const fileInputRef = useRef(null);
  
  // Get auth context and override isAuthenticated to true
  const authContext = useAuth();
  const { logout, user, getUserDetails, uploadProfileImage, deleteProfileImage } = authContext;
  const isAuthenticated = true; // Force true for this component
  
  const navigate = useNavigate();

  // Avatar images array
  const avatarImages = [
    "/avatar1.png",
    "/avatar2.png", 
    "/avatar3.png"
  ];

  // Set random avatar on component mount
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * avatarImages.length);
    setRandomAvatar(avatarImages[randomIndex]);
  }, []);

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
      // First, try to get user data from localStorage
      const possibleKeys = ['user_data', 'userData', 'user', 'currentUser', 'authUser'];
      
      for (const key of possibleKeys) {
        try {
          const data = localStorage.getItem(key);
          if (data) {
            const parsed = JSON.parse(data);
            console.log(`Found data in localStorage[${key}]:`, parsed);
            
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

      console.log('All localStorage keys:', Object.keys(localStorage));
      
      if (!userEmail && user && typeof user === 'object') {
        console.log('Checking AuthContext user object:', user);
        userEmail = user.email || user.username || user.emailAddress;
        console.log('Email from AuthContext:', userEmail);
      }
      
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

      if (!userEmail) {
        console.error('No email found in user object, localStorage, or token');
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
        if (userDetails) {
          setUserDetails(prev => ({
            ...prev,
            profileImageUrl: response.user.profileImageUrl
          }));
        }
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
    if (!userDetails?.profileImageUrl) return;

    if (!window.confirm('Are you sure you want to delete your profile image?')) {
      return;
    }

    setDeletingImage(true);
    try {
      const response = await deleteProfileImage();
      
      if (response.success) {
        toast.success('Profile image deleted successfully!');
        setUserDetails(prev => ({
          ...prev,
          profileImageUrl: null
        }));
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

          {/* User Avatar/Icon with Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button 
              className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-800 text-white hover:text-blue-400 transition-colors hover:bg-gray-700 overflow-hidden"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              {randomAvatar ? (
                <img 
                  src={randomAvatar} 
                  alt="Avatar" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextElementSibling.style.display = 'block';
                  }}
                />
              ) : null}
              <User 
                size={20} 
                style={{ display: randomAvatar ? 'none' : 'block' }} 
              />
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

        {/* Mobile Menu Button - Visible only on mobile */}
        <div className="md:hidden flex items-center gap-2">
          {/* Mobile User Avatar */}
          <div className="relative" ref={dropdownRef}>
            <button 
              className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-800 text-white hover:text-blue-400 transition-colors hover:bg-gray-700 overflow-hidden"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              {randomAvatar ? (
                <img 
                  src={randomAvatar} 
                  alt="Avatar" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextElementSibling.style.display = 'block';
                  }}
                />
              ) : null}
              <User 
                size={18} 
                style={{ display: randomAvatar ? 'none' : 'block' }} 
              />
            </button>
            
            {/* Mobile Dropdown Menu */}
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

      {/* User Details Modal */}
      {showUserDetails && userDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl md:text-2xl font-bold text-gray-800">User Details</h2>
              <button 
                onClick={() => setShowUserDetails(false)}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="space-y-4">
              {/* Profile Image Section */}
              <div className="flex flex-col items-center mb-4">
                <div className="relative group">
                  <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-gray-300">
                    {userDetails.profileImageUrl ? (
                      <img 
                        src={userDetails.profileImageUrl} 
                        alt="Profile" 
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <User size={32} className="text-gray-400" />
                      </div>
                    )}
                  </div>
                  
                  {/* Camera overlay on hover */}
                  <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                       onClick={() => setShowImageUpload(true)}>
                    <Camera size={20} className="text-white" />
                  </div>
                </div>
                
                <button 
                  onClick={() => setShowImageUpload(true)}
                  className="mt-2 text-sm text-blue-600 hover:text-blue-800 transition-colors"
                >
                  {userDetails.profileImageUrl ? 'Change Photo' : 'Add Photo'}
                </button>
              </div>
              
              {/* User Information */}
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-600">Name</label>
                  <p className="text-lg text-gray-800">{userDetails.name || 'N/A'}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-600">Email</label>
                  <p className="text-lg text-gray-800 break-all">{userDetails.email || 'N/A'}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-600">Membership ID</label>
                  <p className="text-lg text-gray-800 font-mono break-all">{userDetails.membershipId || 'N/A'}</p>
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

      {/* Image Upload Modal */}
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
              {/* Current Image Preview */}
              <div className="flex justify-center">
                <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-gray-300">
                  {userDetails?.profileImageUrl ? (
                    <img 
                      src={userDetails.profileImageUrl} 
                      alt="Current Profile" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <User size={40} className="text-gray-400" />
                    </div>
                  )}
                </div>
              </div>
              
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
                
                {userDetails?.profileImageUrl && (
                  <button
                    onClick={handleImageDelete}
                    disabled={deletingImage}
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                  >
                    <Trash2 size={16} />
                    {deletingImage ? 'Deleting...' : 'Delete Image'}
                  </button>
                )}
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