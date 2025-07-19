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
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser?.token) {
      setUser(currentUser);
    } else if (authService.isAuthenticated()) { // fallback for old format
      const userData = authService.getCurrentUser();
      if (userData) {
        // Migrate to new format
        const currentUser = {
          ...userData,
          token: authService.getAuthToken()
        };
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        setUser(currentUser);
      }
    }

    setIsRegistrationPending(authService.isRegistrationPending());
  } catch (error) {
    console.error('Error checking auth status:', error);
    authService.logout();
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
    
    // Check both success flag and presence of user data
    if (response.success || response.user) {
      setUser(response.user || {
        email: otpData.email,
        // other minimal user data
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

  // ✅ ADDED: Update user profile function
  const updateProfile = async (profileData) => {
    try {
      const response = await authService.updateProfile(profileData);
      if (response.id) {
        // Update the user state with new profile data
        const updatedUser = {
          id: response.id,
          name: response.name,
          email: response.email,
          occupation: response.occupation,
          profileImageUrl: response.profileImageUrl
        };
        setUser(updatedUser);
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
    isAuthenticated: !!user,
    register,
    verifyOTP,
    login,
    loginWithPatron,
    getUserDetails,
    updateProfile, // ✅ ADDED: Expose updateProfile function
    logout,
    getTempEmail: () => authService.getTempEmail(),
    forgotPassword
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