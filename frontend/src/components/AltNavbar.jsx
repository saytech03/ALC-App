import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogOut, Menu, User, X, Edit, Save, Trash2 } from "lucide-react";
import { useAuth } from "../store/AuthContext";
import { toast } from "react-hot-toast";

const UserAvatarDropdown = ({ size = 27 }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showUserDetails, setShowUserDetails] = useState(false);
  const [randomAvatar, setRandomAvatar] = useState(null);
  const [loadingUserDetails, setLoadingUserDetails] = useState(false);
  const [editingField, setEditingField] = useState(null);
  const [editValues, setEditValues] = useState({});
  const [isUpdating, setIsUpdating] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const dropdownRef = useRef(null);
  const fileInputRef = useRef(null);
  
  const { user: authUser, logout, updateProfile } = useAuth();
  const navigate = useNavigate();

  const avatarImages = [
    "/avatar1.png",
    "/avatar2.png", 
    "/avatar3.png"
  ];

  const [userData, setUserData] = useState(null);

  // FIX: This useEffect now syncs state from both authUser and localStorage
  // ensuring the profile image is picked up immediately after login.
  useEffect(() => {
    let updatedUserData = null;
    
    // Priority 1: Use auth context if available
    if (authUser) {
      updatedUserData = {
        email: authUser.email,
        id: authUser.id,
        name: authUser.name,
        alc_patronid: authUser.alc_patronid,
        profileImageUrl: authUser.profileImageUrl,
        work: authUser.occupation
      };
    } else {
      // Priority 2: Fallback to localStorage
      try {
        const storedUser = localStorage.getItem('currentUser');
        if (storedUser) {
          const user = JSON.parse(storedUser);
          updatedUserData = {
            email: user.email,
            id: user.id,
            name: user.name,
            alc_patronid: user.alc_patronid || user.membershipId,
            profileImageUrl: user.profileImageUrl,
            work: user.occupation
          };
        }
      } catch (error) {
        console.error('Error parsing stored user data from localStorage:', error);
      }
    }
    
    setUserData(updatedUserData);

    // If a profile image exists, clear the random avatar logic
    if (updatedUserData?.profileImageUrl) {
        setRandomAvatar(null);
        localStorage.removeItem('userAvatar');
    }
  }, [authUser]);

  // Set random avatar if no profile image exists
  useEffect(() => {
    if (userData === null || !userData.profileImageUrl) {
      const storedAvatar = localStorage.getItem('userAvatar');
      if (storedAvatar) {
        setRandomAvatar(storedAvatar);
      } else {
        const randomIndex = Math.floor(Math.random() * avatarImages.length);
        const selectedAvatar = avatarImages[randomIndex];
        setRandomAvatar(selectedAvatar);
        localStorage.setItem('userAvatar', selectedAvatar);
      }
    }
  }, [userData, avatarImages]);

  const renderAvatar = () => {
    const currentProfileImageUrl = userData?.profileImageUrl;
    
    if (currentProfileImageUrl) {
      return (
        <img 
          src={`${currentProfileImageUrl}?t=${Date.now()}`}
          alt="Profile" 
          className="w-full h-full object-cover rounded-full"
          onError={(e) => {
            console.error('Profile image failed to load:', currentProfileImageUrl);
            e.target.style.display = 'none';
            setUserData(prev => prev ? { ...prev, profileImageUrl: null } : null);
          }}
        />
      );
    }
    
    if (randomAvatar) {
      return (
        <img 
          src={randomAvatar} 
          alt="Profile" 
          className="w-full h-full object-cover rounded-full"
          onError={(e) => {
            console.error('Random avatar failed to load:', randomAvatar);
            setRandomAvatar(null);
            localStorage.removeItem('userAvatar');
          }}
        />
      );
    }
    
    return <User size={size} />;
  };

  const fetchUserDetails = async () => {
    try {
      setLoadingUserDetails(true);
      setIsDropdownOpen(false);
      
      const storedUser = localStorage.getItem('currentUser');
      if (!storedUser) {
        throw new Error('No user data found - please login again');
      }
      
      const user = JSON.parse(storedUser);
      
      if (!user?.token) {
        throw new Error('Authentication token missing - please login again');
      }
      
      const response = await fetch(
        `https://alc-backend.onrender.com/api/users?email=${encodeURIComponent(user.email)}`,
        {
          headers: {
            'Authorization': `Bearer ${user.token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      
      if (!response.ok) {
        if (response.status === 401) {
          await handleLogout();
          throw new Error('Session expired - please login again');
        }
        throw new Error('Failed to fetch user details');
      }
      
      const userDetails = await response.json();
      
      const updatedUserData = {
        email: userDetails.email,
        id: userDetails.id,
        name: userDetails.name,
        alc_patronid: userDetails.membershipId,
        profileImageUrl: userDetails.profileImageUrl,
        work: userDetails.occupation
      };
      
      setUserData(updatedUserData);
      
      localStorage.setItem('currentUser', JSON.stringify({
        ...user,
        name: userDetails.name,
        profileImageUrl: userDetails.profileImageUrl,
        occupation: userDetails.occupation,
        membershipId: userDetails.membershipId
      }));
      
      setEditValues({
        name: userDetails.name || '',
        work: userDetails.occupation || ''
      });
      
      setShowUserDetails(true);
    } catch (error) {
      console.error('Error fetching user details:', error);
      toast.error(error.message);
      if (error.message.includes('token') || error.message.includes('Session')) {
        await handleLogout();
      }
    } finally {
      setLoadingUserDetails(false);
    }
  };

  const deleteProfileImage = async () => {
    try {
      setIsUpdating(true);
      const formData = new FormData();
      formData.append('name', userData.name);
      formData.append('occupation', userData.work);
      formData.append('removeImage', 'true');

      const response = await updateProfile(formData);
      
      if (response?.id) {
        const updatedUserData = {
          ...userData,
          profileImageUrl: null
        };
        setUserData(updatedUserData);
        
        const storedUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
        localStorage.setItem('currentUser', JSON.stringify({
          ...storedUser,
          profileImageUrl: null
        }));
        
        toast.success('Profile image removed successfully!');
      }
    } catch (error) {
      console.error('Error deleting profile image:', error);
      toast.error(error.message || 'Failed to remove profile image');
    } finally {
      setIsUpdating(false);
      setEditingField(null);
    }
  };

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

  const handleEditClick = (field) => {
    if (field === 'profileImage') {
      fileInputRef.current?.click();
    } else {
      setEditingField(field);
    }
  };

  const handleImageSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
      if (!validTypes.includes(file.type)) {
        toast.error('Please select a valid image file (JPEG, PNG, GIF)');
        return;
      }

      const maxSize = 5 * 1024 * 1024;
      if (file.size > maxSize) {
        toast.error('Image size must be less than 5MB');
        return;
      }

      setSelectedImage(file);
      
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
      
      setEditingField('profileImage');
    }
  };

  const handleInputChange = (field, value) => {
    setEditValues(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveEdit = async (field) => {
    try {
      setIsUpdating(true);
      
      const formData = new FormData();
      formData.append('name', editValues.name || userData.name);
      formData.append('occupation', editValues.work || userData.work);

      if (field === 'profileImage' && selectedImage) {
        formData.append('image', selectedImage);
      }

      const response = await updateProfile(formData);
      
      if (response?.id) {
        const updatedUserData = {
          ...userData,
          name: response.name,
          work: response.occupation,
          profileImageUrl: response.profileImageUrl
        };
        
        setUserData(updatedUserData);
        
        const storedUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
        localStorage.setItem('currentUser', JSON.stringify({
          ...storedUser,
          name: response.name,
          occupation: response.occupation,
          profileImageUrl: response.profileImageUrl
        }));

        if (response.profileImageUrl) {
          localStorage.removeItem('userAvatar');
          setRandomAvatar(null);
        }

        setEditingField(null);
        setSelectedImage(null);
        setImagePreview(null);
        
        toast.success('Profile updated successfully!');
      }
    } catch (error) {
      console.error('Profile update error:', error);
      toast.error(error.message || 'Failed to update profile');
      
      if (error.message.includes('token') || error.message.includes('auth')) {
        await handleLogout();
      }
    } finally {
      setIsUpdating(false);
    }
  };

  const handleCancelEdit = () => {
    setEditingField(null);
    setSelectedImage(null);
    setImagePreview(null);
    setEditValues({
      name: userData?.name || '',
      work: userData?.work || ''
    });
  };

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
        className="flex items-center justify-center w-12 h-12 rounded-full overflow-hidden border-2 border-gray-300 hover:border-blue-400 transition-colors"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        {renderAvatar()}
      </button>
      
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageSelect}
        style={{ display: 'none' }}
      />
      
      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
          <button 
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
            onClick={fetchUserDetails}
            disabled={loadingUserDetails}
          >
            {loadingUserDetails ? (
              <span>Loading...</span>
            ) : (
              <>
                <User size={16} />
                <span>User Details</span>
              </>
            )}
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
              <div className="flex justify-center relative">
                <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-gray-300 bg-gray-200 flex items-center justify-center">
                  {editingField === 'profileImage' && imagePreview ? (
                    <img 
                      src={imagePreview} 
                      alt="Profile Preview" 
                      className="w-full h-full object-cover"
                    />
                  ) : userData.profileImageUrl ? (
                    <img 
                      src={userData.profileImageUrl} 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextElementSibling.style.display = 'block';
                      }}
                    />
                  ) : null}
                  <User 
                    size={60}
                    className="text-gray-400" 
                    style={{ display: (userData.profileImageUrl || imagePreview) ? 'none' : 'block' }}
                  />
                </div>
                
                {editingField === 'profileImage' ? (
                  <div className="absolute bottom-0 right-0 flex gap-2">
                    <button 
                      onClick={() => handleSaveEdit('profileImage')}
                      disabled={isUpdating}
                      className="bg-green-500 hover:bg-green-600 text-white rounded-full p-2 shadow-md disabled:opacity-50"
                    >
                      <Save size={20} />
                    </button>
                    <button 
                      onClick={handleCancelEdit}
                      className="bg-gray-500 hover:bg-gray-600 text-white rounded-full p-2 shadow-md"
                    >
                      <X size={20} />
                    </button>
                  </div>
                ) : (
                  <div className="absolute bottom-0 right-0 flex gap-2">
                    <button 
                      onClick={() => handleEditClick('profileImage')}
                      className="bg-white rounded-full p-2 shadow-md hover:bg-gray-100"
                    >
                      <Edit size={20} className="text-gray-600" />
                    </button>
                    {userData.profileImageUrl && (
                      <button 
                        onClick={deleteProfileImage}
                        disabled={isUpdating}
                        className="bg-red-500 hover:bg-red-600 text-white rounded-full p-2 shadow-md"
                      >
                        <Trash2 size={20} />
                      </button>
                    )}
                  </div>
                )}
              </div>
              
              <div className="space-y-3">
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-600">Name</label>
                  {editingField === 'name' ? (
                    <div className="flex items-center gap-2 mt-1">
                      <input
                        type="text"
                        value={editValues.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your name"
                      />
                      <button 
                        onClick={() => handleSaveEdit('name')}
                        disabled={isUpdating}
                        className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-md disabled:opacity-50"
                      >
                        <Save size={16} />
                      </button>
                      <button 
                        onClick={handleCancelEdit}
                        className="bg-gray-500 hover:bg-gray-600 text-white p-2 rounded-md"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <>
                      <p className="text-lg text-gray-800">{userData.name || 'Not available'}</p>
                      <button 
                        onClick={() => handleEditClick('name')}
                        className="absolute top-0 right-0 p-1 hover:bg-gray-100 rounded-full"
                      >
                        <Edit size={16} className="text-gray-600" />
                      </button>
                    </>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-600">Email</label>
                  <p className="text-lg text-gray-800 break-all">{userData.email}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-600">ALC Patron ID</label>
                  <p className="text-lg text-gray-800 font-mono">{userData.alc_patronid}</p>
                </div>
                
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-600">Occupation</label>
                  {editingField === 'work' ? (
                    <div className="flex items-center gap-2 mt-1">
                      <select
                        value={editValues.work}
                        onChange={(e) => handleInputChange('work', e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Select occupation</option>
                        <option value="STUDENT">Student</option>
                        <option value="LEGAL_PROFESSIONAL">Legal Professional</option>
                        <option value="ART_PROFESSIONAL">Art Professional</option>
                        <option value="ARTIST">Artist</option>
                        <option value="OTHER">Other</option>
                      </select>
                      <button 
                        onClick={() => handleSaveEdit('work')}
                        disabled={isUpdating}
                        className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-md disabled:opacity-50"
                      >
                        <Save size={16} />
                      </button>
                      <button 
                        onClick={handleCancelEdit}
                        className="bg-gray-500 hover:bg-gray-600 text-white p-2 rounded-md"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <>
                      <p className="text-lg text-gray-800 font-mono">{userData.work}</p>
                      <button 
                        onClick={() => handleEditClick('work')}
                        className="absolute top-0 right-0 p-1 hover:bg-gray-100 rounded-full"
                      >
                        <Edit size={16} className="text-gray-600" />
                      </button>
                    </>
                  )}
                </div>
              </div>
              
              {isUpdating && (
                <div className="flex items-center justify-center py-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                  <span className="ml-2 text-gray-600">Updating...</span>
                </div>
              )}
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

  const handleNavClick = (path) => {
    setIsMobileMenuOpen(false);
    navigate(path);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-black' : 'bg-transparent'
    }`}>
      <div className="max-w-6xl mx-auto flex items-center justify-between p-4">
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
                                          
        <div className="hidden md:flex items-center gap-4 mr-1">
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
          <Link to="/" className="text-white hover:text-blue-400 transition-colors p-2 hover:bg-gray-900 rounded-full">
            Events
          </Link>
          <Link to="/contacth" className="text-white hover:text-blue-400 transition-colors p-2 hover:bg-gray-900 rounded-full ml-2">
            Contact Us
          </Link>

          <UserAvatarDropdown size={24} />
        </div>

        <div className="md:hidden flex items-center gap-2">
          <UserAvatarDropdown size={20} />

          <button
            className="text-white hover:text-blue-400 p-2 hover:bg-gray-900 rounded-full transition-colors"
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

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
              to="/" 
              className="text-white hover:text-blue-400 transition-colors py-2 px-4 hover:bg-gray-900 rounded-lg"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Events
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
    </header>
  );
};

export default AltNavbar;