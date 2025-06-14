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
			// Map frontend fields to backend expected fields
			const registerData = {
				name: credentials.username, // Map username to name
				email: credentials.email,
				password: credentials.password,
				occupation: credentials.occupation.toUpperCase() // Convert to uppercase as backend expects
			};
			
			const response = await axios.post("/api/auth/register", registerData);
			
			// Extract data from response
			const { id, name, email, occupation, message } = response.data;
			
			// Create user object (no token yet as it's pending OTP verification)
			const user = {
				id,
				name,
				email,
				occupation
			};
			
			set({ 
				user, 
				isSigningUp: false 
			});
			
			// Show the message from backend (OTP verification message)
			toast.success(message || "Account created successfully! Please check your email for OTP verification.");
			
		} catch (error) {
			toast.error(error.response?.data?.message || "Signup failed");
			set({ isSigningUp: false, user: null });
		}
	},
	
	login: async (credentials) => {
		set({ isLoggingIn: true });
		try {
			const response = await axios.post("/api/auth/login", credentials);
			
			// Extract data from response based on your API structure
			const { id, name, email, occupation, token, membershipId, message } = response.data;
			
			// Create user object
			const user = {
				id,
				name,
				email,
				occupation,
				membershipId
			};
			
			// Store token in localStorage for persistence
			if (token) {
				localStorage.setItem("token", token);
				// Set axios default header for future requests
				axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
			}
			
			set({ 
				user, 
				token, 
				isLoggingIn: false 
			});
			
			toast.success("Logged in successfully");
		} catch (error) {
			set({ isLoggingIn: false, user: null, token: null });
			toast.error(error.response?.data?.message || "Login failed");
		}
	},
	
	logout: async () => {
		set({ isLoggingOut: true });
		try {
			await axios.post("/api/auth/logout");
			
			// Clear token from localStorage
			localStorage.removeItem("token");
			
			// Remove axios default header
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
		}
	},
	
	authCheck: async () => {
		set({ isCheckingAuth: true });
		try {
			// Check if token exists in localStorage
			const token = localStorage.getItem("token");
			
			if (token) {
				// Set axios header
				axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
				
				// Verify token with backend
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
			// If token is invalid, clear it
			localStorage.removeItem("token");
			delete axios.defaults.headers.common["Authorization"];
			
			set({ 
				isCheckingAuth: false, 
				user: null, 
				token: null 
			});
		}
	},
	
	// Helper function to initialize auth on app startup
	initializeAuth: () => {
		const token = localStorage.getItem("token");
		if (token) {
			axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
			set({ token });
		}
	},
	
	// OTP verification function (you might need this for completing registration)
	verifyOTP: async (email, otp) => {
		try {
			const response = await axios.post("/api/auth/verify-otp", { email, otp });
			
			// Handle successful OTP verification
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