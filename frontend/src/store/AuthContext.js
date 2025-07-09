import { createContext, useContext, useEffect, useState } from 'react';

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
				// Check if user has a valid token stored
				const token = localStorage.getItem('authToken');
				if (token) {
					// Verify token with your backend
					// If valid, set user and isAuthenticated to true
					// For now, we'll just check if token exists
					setIsAuthenticated(true);
					// You might want to fetch user data here
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

	const login = async (credentials) => {
		try {
			// Your login logic here
			const response = await fetch('/api/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(credentials),
			});

			const data = await response.json();
			
			if (data.success || data.token) {
				localStorage.setItem('authToken', data.token);
				setUser(data.user);
				setIsAuthenticated(true);
				return data;
			}
			
			return data;
		} catch (error) {
			console.error('Login error:', error);
			throw error;
		}
	};

	const loginWithPatron = async (credentials) => {
		try {
			// Your patron login logic here
			const response = await fetch('/api/patron-login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(credentials),
			});

			const data = await response.json();
			
			if (data.success || data.token) {
				localStorage.setItem('authToken', data.token);
				setUser(data.user);
				setIsAuthenticated(true);
				return data;
			}
			
			return data;
		} catch (error) {
			console.error('Patron login error:', error);
			throw error;
		}
	};

	const logout = () => {
		localStorage.removeItem('authToken');
		setUser(null);
		setIsAuthenticated(false);
	};

	const value = {
		user,
		login,
		loginWithPatron,
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