// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import authService from './authService.js';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isRegistrationPending, setIsRegistrationPending] = useState(false);

  useEffect(() => {
    // Check authentication status on app start
    checkAuthStatus();
  }, []);

  const checkAuthStatus = () => {
    try {
      if (authService.isAuthenticated()) {
        const userData = authService.getCurrentUser();
        setUser(userData);
      }
            
      // Check if registration is pending OTP verification
      setIsRegistrationPending(authService.isRegistrationPending());
    } catch (error) {
      console.error('Error checking auth status:', error);
      authService.logout();
    } finally {
      setLoading(false);
    }
  };

  const isAuthenticated = () => {
    return !!user && authService.isAuthenticated();
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
        setUser(response.user);
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
        setUser(response.user);
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
        setUser(response.user);
      }
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

  const uploadProfileImage = async (imageFile) => {
    try {
      const response = await authService.uploadProfileImage(imageFile);
      if (response.success && response.user) {
        setUser(response.user);
      }
      return response;
    } catch (error) {
      throw error;
    }
  };

  const deleteProfileImage = async () => {
    try {
      const response = await authService.deleteProfileImage();
      if (response.success) {
        const updatedUser = { ...user, profileImageUrl: null };
        setUser(updatedUser);
      }
      return response;
    } catch (error) {
      throw error;
    }
  };

  const updateProfile = async (profileData) => {
    try {
      const response = await authService.updateProfile(profileData);
      if (response.success && response.user) {
        setUser(response.user);
      }
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

  const value = {
    user,
    loading,
    isRegistrationPending,
    isAuthenticated, // Added this method
    register,
    verifyOTP,
    login,
    loginWithPatron,
    getUserDetails,
    uploadProfileImage,
    deleteProfileImage,
    updateProfile,
    logout,
    getTempEmail: () => authService.getTempEmail()
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