import axios from "axios";
import toast from "react-hot-toast";
import { create } from "zustand";

export const useAuthStore = create((set) => ({
  user: null,
  token: null,
  isSigningUp: false,
  isCheckingAuth: true,
  isLoggingOut: false,
  isLoggingIn: false,
  
  signup: async (credentials) => {
    set({ isSigningUp: true });
    try {
      const response = await axios.post("/api/auth/register", credentials);
      set({ user: response.data.user, isSigningUp: false });
      toast.success("Account created successfully");
      return response.data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed");
      set({ isSigningUp: false, user: null });
      throw error;
    }
  },
  
  login: async (credentials) => {
    set({ isLoggingIn: true });
    try {
      const response = await axios.post(
        "https://alc-backend.onrender.com/api/auth/login", 
        credentials
      );
      
      // Store token and set auth header
      const { token, user } = response.data;
      localStorage.setItem("token", token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      
      set({ 
        user,
        token,
        isLoggingIn: false 
      });
      
      return response.data;
    } catch (error) {
      // Clear any existing auth data on failure
      localStorage.removeItem("token");
      delete axios.defaults.headers.common["Authorization"];
      
      set({ 
        isLoggingIn: false, 
        user: null,
        token: null 
      });
      
      // Forward the error with proper message
      const errorMsg = error.response?.data?.message || "Login failed";
      toast.error(errorMsg);
      throw new Error(errorMsg);
    }
  },
  
  logout: async () => {
    set({ isLoggingOut: true });
    try {
      await axios.post("/api/v1/auth/logout");
      localStorage.removeItem("token");
      delete axios.defaults.headers.common["Authorization"];
      
      set({ 
        user: null, 
        token: null,
        isLoggingOut: false 
      });
      
      toast.success("Logged out successfully");
    } catch (error) {
      set({ isLoggingOut: false });
      toast.error(error.response?.data?.message || "Logout failed");
      throw error;
    }
  },
    
  authCheck: async () => {
    set({ isCheckingAuth: true });
    try {
      const token = localStorage.getItem("token");
      
      if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        const response = await axios.get("/api/auth/authCheck");
        
        set({ 
          user: response.data.user, 
          token,
          isCheckingAuth: false 
        });
      } else {
        set({ isCheckingAuth: false, user: null, token: null });
      }
    } catch (error) {
      localStorage.removeItem("token");
      delete axios.defaults.headers.common["Authorization"];
      
      set({ 
        isCheckingAuth: false, 
        user: null, 
        token: null 
      });
      
      throw error;
    }
  },
  
  initializeAuth: () => {
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      set({ token });
    }
  },
  
  verifyOTP: async (email, otp) => {
    try {
      const response = await axios.post("/api/auth/verify-otp", { email, otp });
      const { token, user } = response.data;
      
      if (token) {
        localStorage.setItem("token", token);
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      }
      
      set({ user, token });
      toast.success("Email verified successfully!");
      
      return response.data;
    } catch (error) {
      toast.error(error.response?.data?.message || "OTP verification failed");
      throw error;
    }
  }
}));