import { createContext, useContext, useEffect, useState } from 'react';
import authService from '../store/authService'; // Import your existing auth service

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

	// Check authentication status on app start
	useEffect(() => {
		const checkAuth = async () => {
			try {
				// Use your existing authService methods
				const token = authService.getAuthToken();
				const userData = authService.getCurrentUser();
				
				if (token && userData) {
					setUser(userData);
					setIsAuthenticated(true);
				} else {
					setIsAuthenticated(false);
				}
			} catch (error) {
				console.error('Auth check failed:', error);
				setIsAuthenticated(false);
			} finally {
				setLoading(false);
			}
		};

		checkAuth();
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
			
			// Update context state if verification successful
			if (response.success && response.token) {
				setUser(response.user);
				setIsAuthenticated(true);
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
			
			// Update context state if login successful
			if (response.success && response.token) {
				setUser(response.user);
				setIsAuthenticated(true);
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
			
			// Update context state if login successful
			if (response.success && response.token) {
				setUser(response.user);
				setIsAuthenticated(true);
			}
			
			return response;
		} catch (error) {
			console.error('Patron login error:', error);
			throw error;
		}
	};

	const logout = () => {
		authService.logout();
		setUser(null);
		setIsAuthenticated(false);
	};

	const value = {
		user,
		login,
		loginWithPatron,
		register,
		verifyOTP,
		logout,
		isAuthenticated,
		loading
	};

	return (
		<AuthContext.Provider value={value}>
			{children}
		</AuthContext.Provider>
	);
};