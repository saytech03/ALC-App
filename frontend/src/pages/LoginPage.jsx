import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../store/AuthContext";
import { toast } from "react-hot-toast";

const LoginPage = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');

	const { login } = useAuth();
	const navigate = useNavigate();

	const handleLogin = async (e) => {
		e.preventDefault();
		setError(''); // Clear previous errors

		// Basic validation
		if (!email || !password) {
			setError('Please fill in all fields');
			return;
		}

		// Email validation
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			setError('Please enter a valid email address');
			return;
		}

		try {
			setLoading(true);
			
			const loginData = {
				email: email.trim().toLowerCase(),
				password: password
			};

			console.log('Login data being sent:', { email: loginData.email }); // Don't log password

			const response = await login(loginData);
			
			console.log('Login response:', response);
			
			if (response && (response.success || response.token)) {
				// Login successful
				console.log('Login successful');
				toast.success('Login successful! Welcome back!');
				
				// Redirect to home page after successful login
				setTimeout(() => {
					navigate('/h', { replace: true });
				}, 1000);
			} else {
				setError(response?.message || 'Login failed');
			}
		} catch (error) {
			console.error('Login error:', error);
			
			// Extract detailed error information
			let errorMessage = 'Login failed';
			let showToast = false;
			
			if (error.response) {
				// Handle HTTP error responses
				const status = error.response.status;
				const data = error.response.data;
				
				switch (status) {
					case 400:
						toast.error('Invalid credentials');
						showToast = true;
						break;
					case 401:
						toast.error('Invalid credentials');
						showToast = true;
						break;
					case 403:
						errorMessage = data?.message || 'Account not verified. Please check your email for verification.';
						break;
					case 404:
						toast.error('Invalid credentials');
						showToast = true;
						break;
					case 500:
						errorMessage = 'Server error. Please try again later.';
						break;
					default:
						errorMessage = data?.message || `Login failed (${status}). Please try again.`;
				}
			} else if (error.message) {
				// Check if it's a credentials-related error
				const lowerMessage = error.message.toLowerCase();
				if (lowerMessage.includes('invalid') || 
					lowerMessage.includes('wrong') || 
					lowerMessage.includes('incorrect') ||
					lowerMessage.includes('credentials') ||
					lowerMessage.includes('password') ||
					lowerMessage.includes('email')) {
					toast.error('Invalid credentials');
					showToast = true;
				} else {
					errorMessage = error.message;
				}
			}
			
			// Only set error state if we didn't show a toast
			if (!showToast) {
				setError(errorMessage);
			}
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className='h-screen w-full-stretch bg-no-repeat login-bg'>
			<header className='max-w-6xl mx-auto flex items-center justify-between p-4'>
				<Link to={"/"}>
					<img src='/ellip-logo1.png' alt='logo' className='w-24' />
				</Link>
				
				{/* 
				AVATAR PLACEHOLDER - Replace this section with avatar display logic
				When user is logged in, show one of 3 avatars here instead of the login form
				Example:
				{isLoggedIn ? (
					<div className="flex items-center space-x-2">
						<img src={selectedAvatar} alt="User Avatar" className="w-8 h-8 rounded-full" />
						<span className="text-white">{userName}</span>
					</div>
				) : (
					// Show login/signup links or login form
				)}
				*/}
			</header>

			<div className='flex justify-center items-center mt-20 mx-3'>
				<div className='w-full max-w-md p-8 space-y-6 bg-black/60 rounded-lg shadow-md'>
					<h1 className='text-center text-white text-2xl font-bold mb-4'>Login</h1>

					<form className='space-y-4' onSubmit={handleLogin}>
						<div>
							<label htmlFor='email' className='text-sm font-medium text-gray-300 block'>
								Email
							</label>
							<input
								type='email'
								className='w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring'
								placeholder='you@example.com'
								id='email'
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								required
								disabled={loading}
							/>
						</div>

						<div>
							<label htmlFor='password' className='text-sm font-medium text-gray-300 block'>
								Password
							</label>
							<input
								type='password'
								className='w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring'
								placeholder='••••••••'
								id='password'
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								required
								disabled={loading}
							/>
						</div>

						{error && (
							<div className='text-red-400 text-sm text-center bg-red-900/20 p-3 rounded-md border border-red-700'>
								{error}
							</div>
						)}

						<button
							type='submit'
							className='w-full py-2 bg-blue-600 text-white font-semibold rounded-md 
							hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed'
							disabled={loading}
						>
							{loading ? "Loading..." : "Login"}
						</button>
					</form>
					<div className='text-center text-gray-400'>
						Don't have an account?{" "}
						<Link to={"/signup"} className='text-blue-500 hover:underline'>
							Sign Up
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default LoginPage;