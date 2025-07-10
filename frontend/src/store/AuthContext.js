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

  // This function will update auth state from localStorage
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

  // Check authentication status on app start and when auth changes
  useEffect(() => {
    updateAuthState();
    
    // Optional: Listen for storage changes from other tabs
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
        updateAuthState(); // Update state after successful verification
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
        updateAuthState(); // Update state after successful login
      }
      return response;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const loginWithPatron = async (credentials) => {
    try {
      const response = await authService.loginWithPatron(credentials);
      if (response.success && response.token) {
        updateAuthState(); // Update state after successful login
      }
      return response;
    } catch (error) {
      console.error('Patron login error:', error);
      throw error;
    }
  };

  const logout = () => {
    authService.logout();
    updateAuthState(); // Update state after logout
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
    updateAuthState // Expose this if needed elsewhere
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};