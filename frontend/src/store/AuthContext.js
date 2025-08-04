// src/context/AuthContext.js
import { createContext, useContext, useState, useEffect } from 'react';
import authService from '../store/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isRegistrationPending, setIsRegistrationPending] = useState(false);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = () => {
    try {
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      if (currentUser?.token) {
        authService.getUserDetails(currentUser.email)
          .then(freshUserData => {
            const updatedUser = {
              ...currentUser,
              profileImageUrl: freshUserData.profileImageUrl,
              name: freshUserData.name,
              occupation: freshUserData.occupation
            };
            localStorage.setItem('currentUser', JSON.stringify(updatedUser));
            setUser(updatedUser);
          });
      }
    } catch (error) {
      console.error('Auth check failed:', error);
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
      if (response.success || response.user) {
        setUser(response.user || {
          email: otpData.email,
        });
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
      // Use authService to send contact form
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

  const value = {
    user,
    loading,
    isRegistrationPending,
    isAuthenticated: !!user,
    register,
    verifyOTP,
    login,
    loginWithPatron,
    getUserDetails,
    updateProfile,
    logout,
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