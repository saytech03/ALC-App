import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "../store/AuthContext";
import { toast } from "react-hot-toast";

const LoginPage = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');
	const [showPassword, setShowPassword] = useState(false);

	const { login, loginWithPatron } = useAuth();
	const navigate = useNavigate();

	// Function to detect if input is email or patron ID
	const isEmail = (input) => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(input);
	};

	const handleLogin = async (e) => {
		e.preventDefault();
		setError(''); // Clear previous errors

		// Basic validation
		if (!email || !password) {
			setError('Please fill in all fields');
			return;
		}

		const inputValue = email.trim();
		const isEmailLogin = isEmail(inputValue);

		try {
			setLoading(true);
			
			let loginData;
			let response;

			if (isEmailLogin) {
				// Email login
				loginData = {
					email: inputValue.toLowerCase(),
					password: password
				};
				console.log('Email login data being sent:', { email: loginData.email });
				response = await login(loginData);
			} else {
				// Patron ID login
				loginData = {
					patronId: inputValue,
					password: password
				};
				console.log('Patron login data being sent:', { patronId: loginData.patronId });
				response = await loginWithPatron(loginData);
			}
			
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
						if (data?.details) {
							// Handle validation errors for patron login
							const validationErrors = Object.values(data.details).join(', ');
							errorMessage = validationErrors;
						} else {
							toast.error('Invalid credentials');
							showToast = true;
						}
						break;
					case 401:
						// Handle specific patron login errors
						if (data?.message === 'Invalid Patron ID') {
							toast.error('Invalid Patron ID');
							showToast = true;
						} else if (data?.message === 'Invalid password') {
							toast.error('Invalid password');
							showToast = true;
						} else {
							toast.error('Invalid credentials');
							showToast = true;
						}
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
					lowerMessage.includes('email') ||
					lowerMessage.includes('patron')) {
					
					// Handle specific patron error messages
					if (lowerMessage.includes('patron id')) {
						toast.error('Invalid Patron ID');
					} else if (lowerMessage.includes('password')) {
						toast.error('Invalid password');
					} else {
						toast.error('Invalid credentials');
					}
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
				<div className="flex items-center gap-4 ml-2">
				<Link to={"/"}>
					<img src='/alc_logo.png' alt='logo' className='w-24' />
				</Link>
				<div className="text-white" style={{ fontFamily: 'Consolas, serif' }}>
                      <div className="text-xl font-bold leading-tight">ART</div>
                      <div className="text-xl font-bold leading-tight">LAW</div>
                      <div className="text-xl font-bold leading-tight">COMMUNION</div>
                </div>
				</div>
				
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
								Email/ALC User ID
							</label>
							<input
								type='text'
								className='w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring'
								placeholder='you@example.com or ALCWB0003'
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
							<div className='relative'>
								<input
									type={showPassword ? 'text' : 'password'}
									className='w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring pr-12'
									placeholder='••••••••'
									id='password'
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									required
									disabled={loading}
								/>
								<button
									type='button'
									className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors'
									onClick={() => setShowPassword(!showPassword)}
									disabled={loading}
								>
									{showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
								</button>
							</div>
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