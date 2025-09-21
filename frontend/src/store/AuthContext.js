// src/context/AuthContext.js
import { createContext, useContext, useState, useEffect } from 'react';
import authService from '../store/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isRegistrationPending, setIsRegistrationPending] = useState(false);
  const [adminToken, setAdminToken] = useState(null);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    setLoading(true);
    try {
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      const storedAdminToken = localStorage.getItem('adminToken');
      
      if (storedAdminToken) {
        setAdminToken(storedAdminToken);
      }
      
      if (currentUser?.token && currentUser?.email) {
        // Fetch the most recent user details from the backend
        const freshUserData = await authService.getUserDetails(currentUser.email);
        const updatedUser = {
          ...currentUser,
          profileImageUrl: freshUserData.profileImageUrl,
          name: freshUserData.name,
          occupation: freshUserData.occupation
        };
        localStorage.setItem('currentUser', JSON.stringify(updatedUser));
        setUser(updatedUser);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      const response = await authService.register(userData);
      if (response.success) {
        setIsRegistrationPending(true);
      }
      return response;
    } catch (error) {
      throw error;
    }
  };

  const verifyOTP = async (otpData) => {
    try {
      const response = await authService.verifyOTP(otpData);
      if (response.success) {
        // After successful OTP, fetch the full user details
        const freshUserData = await authService.getUserDetails(response.user.email);
        const fullUser = {
          ...response.user,
          ...freshUserData
        };
        setUser(fullUser);
        setIsRegistrationPending(false);
      }
      return response;
    } catch (error) {
      throw error;
    }
  };

  const login = async (credentials) => {
    try {
      const response = await authService.login(credentials);
      if (response.success) {
        // Fetch the full user details after successful login
        const freshUserData = await authService.getUserDetails(response.user.email);
        const fullUser = {
          ...response.user,
          ...freshUserData,
          token: response.token
        };
        setUser(fullUser);
      }
      return response;
    } catch (error) {
      throw error;
    }
  };

  const loginWithPatron = async (patronCredentials) => {
    try {
      const response = await authService.loginWithPatron(patronCredentials);
      if (response.success) {
        // Fetch the full user details after successful patron login
        const freshUserData = await authService.getUserDetails(response.user.email);
        const fullUser = {
          ...response.user,
          ...freshUserData,
          token: response.token
        };
        setUser(fullUser);
      }
      return response;
    } catch (error) {
      throw error;
    }
  };

  // NEW: Admin login
  const adminLogin = async (credentials) => {
  try {
    const response = await authService.adminLogin(credentials);
    if (response.success) {
      // Create admin user object similar to regular login flow
      const adminUser = {
        username: credentials.username,
        token: response.token,
        isAdmin: true,
        ...response.user // Include any user data from response
      };
      
      // Set admin user similar to regular login flow
      setUser(adminUser);
      setAdminToken(response.token);
    }
    return response;
  } catch (error) {
    throw error;
  }
};

  // NEW: Create blog
  const createBlog = async (blogData) => {
    try {
      if (!adminToken) {
        throw new Error('Admin authentication required');
      }
      const response = await authService.createBlog(blogData, adminToken);
      return response;
    } catch (error) {
      throw error;
    }
  };

  // NEW: Get all blogs
  const getAllBlogs = async () => {
    try {
      const response = await authService.getAllBlogs();
      return response;
    } catch (error) {
      throw error;
    }
  };

  // NEW: Get blog by ID
  const getBlogById = async (blogId) => {
    try {
      if (!adminToken) {
        throw new Error('Admin authentication required');
      }
      const response = await authService.getBlogById(blogId, adminToken);
      return response;
    } catch (error) {
      throw error;
    }
  };

  // NEW: Check health
  const checkHealth = async () => {
    try {
      const response = await authService.checkHealth();
      return response;
    } catch (error) {
      throw error;
    }
  };

  // NEW: Update password
  const updatePassword = async (passwordData) => {
    try {
      const response = await authService.updatePassword(passwordData);
      return response;
    } catch (error) {
      throw error;
    }
  };

  const getUserDetails = async (email) => {
    try {
      const response = await authService.getUserDetails(email);
      return response;
    } catch (error) {
      throw error;
    }
  };

  const forgotPassword = async (email) => {
    try {
      const response = await authService.forgotPassword(email);
      return response;
    } catch (error) {
      throw error;
    }
  };

  const updateProfile = async (profileData) => {
    try {
      const response = await authService.updateProfile(profileData);
      if (response.id) {
        const currentStoredUser = JSON.parse(localStorage.getItem('currentUser'));
        const updatedUser = {
          ...currentStoredUser,
          id: response.id,
          name: response.name,
          email: response.email,
          occupation: response.occupation,
          profileImageUrl: response.profileImageUrl,
        };
        setUser(updatedUser);
        localStorage.setItem('currentUser', JSON.stringify(updatedUser));
        return response;
      }
      throw new Error('Failed to update profile');
    } catch (error) {
      console.error('Update profile error:', error);
      throw error;
    }
  };

  const sendContactForm = async (formData) => {
    try {
      const response = await authService.sendContactForm(formData);
      return response;
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    setIsRegistrationPending(false);
  };

  // NEW: Admin logout
  const adminLogout = () => {
    authService.adminLogout();
    setAdminToken(null);
  };

  const value = {
    user,
    loading,
    isRegistrationPending,
    adminToken, // NEW: Added adminToken to context value
    isAuthenticated: !!user,
    isAdminAuthenticated: !!adminToken, // NEW: Added admin authentication check
    register,
    verifyOTP,
    login,
    loginWithPatron,
    adminLogin, // NEW: Added admin login
    createBlog, // NEW: Added create blog
    getAllBlogs, // NEW: Added get all blogs
    getBlogById, // NEW: Added get blog by ID
    checkHealth, // NEW: Added health check
    updatePassword, // NEW: Added password update
    getUserDetails,
    updateProfile,
    logout,
    adminLogout, // NEW: Added admin logout
    getTempEmail: () => authService.getTempEmail(),
    forgotPassword,
    sendContactForm
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};