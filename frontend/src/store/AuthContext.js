import { createContext, useContext, useEffect, useState } from 'react';
import authService from '../store/authService';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Centralized function to update auth state
  const updateAuthState = () => {
    const token = authService.getAuthToken();
    const userData = authService.getCurrentUser();
    
    if (token && userData) {
      setUser(userData);
      setIsAuthenticated(true);
    } else {
      setUser(null);
      setIsAuthenticated(false);
    }
    setLoading(false);
  };

  // Check auth status on mount and storage changes
  useEffect(() => {
    updateAuthState();
    
    const handleStorageChange = () => {
      updateAuthState();
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const register = async (userData) => {
    try {
      const response = await authService.register(userData);
      return response;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  };

  const verifyOTP = async (otpData) => {
    try {
      const response = await authService.verifyOTP(otpData);
      if (response.success && response.token) {
        updateAuthState();
      }
      return response;
    } catch (error) {
      console.error('OTP verification error:', error);
      throw error;
    }
  };

  const login = async (credentials) => {
    try {
      const response = await authService.login(credentials);
      if (response.success && response.token) {
        updateAuthState();
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const loginWithPatron = async (credentials) => {
    try {
      const response = await authService.loginWithPatron(credentials);
      if (response.success && response.token) {
        updateAuthState();
        return true;
      }
      return false;
    } catch (error) {
      console.error('Patron login error:', error);
      throw error;
    }
  };

  const logout = () => {
    authService.logout();
    updateAuthState();
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    loginWithPatron,
    register,
    verifyOTP,
    logout,
    updateAuthState
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};