import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../store/AuthContext";
import { toast } from "react-hot-toast";

const SignUpPage = () => {
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [occupation, setOccupation] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');
	
	// OTP related state
	const [showOtpModal, setShowOtpModal] = useState(false);
	const [otp, setOtp] = useState('');
	const [otpLoading, setOtpLoading] = useState(false);
	const [otpError, setOtpError] = useState('');
	const [successMessage, setSuccessMessage] = useState('');

	const { register, verifyOTP } = useAuth();
	const navigate = useNavigate();

	// Get email from URL params on component mount
	useEffect(() => {
		const urlParams = new URLSearchParams(window.location.search);
		const emailFromUrl = urlParams.get("email");
		if (emailFromUrl) {
			setEmail(emailFromUrl);
		}
	}, []);

	const handleSignUp = async (e) => {
		e.preventDefault();
		setError('');

		// Validation for name/username
		if (!username || username.trim().length < 2) {
			toast.error('Invalid user content');
			return;
		}

		// Password format validation (at least 6 characters, can add more rules if needed)
		if (!password || password.length < 6) {
			toast.error('Invalid user content');
			return;
		}

		// Additional validation
		if (!email || !occupation) {
			toast.error('Invalid user content');
			return;
		}

		// Email validation
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			toast.error('Invalid user content');
			return;
		}

		try {
			setLoading(true);
			
			// Map occupation to match API expected format (uppercase)
			const occupationMapping = {
				'Student': 'STUDENT',
				'Legal Professional': 'LEGAL_PROFESSIONAL',
				'Art Professional': 'ART_PROFESSIONAL',
				'Artist': 'ARTIST',
				'Other': 'OTHER'
			};

			const registrationData = {
				name: username,
				email: email.trim().toLowerCase(), // Ensure email is trimmed and lowercase
				password: password,
				occupation: occupationMapping[occupation] || occupation.toUpperCase()
			};

			console.log('Registration data being sent:', registrationData);

			const response = await register(registrationData);
			
			console.log('Registration response:', response);
			
			if (response && (response.success || response.id)) {
				setSuccessMessage('You have successfully registered! OTP sent to your email!');
				setShowOtpModal(true);
				setError(''); // Clear any previous errors
				toast.success('Registration successful! Please verify your email.');
			} else {
				setError(response?.message || 'Registration failed');
			}
		} catch (error) {
    console.error('Registration error:', error);
    
    // Extract more detailed error information
    let errorMessage = 'Registration failed';
    
    if (error.response) {
        // Handle HTTP error responses
        const status = error.response.status;
        const data = error.response.data;
        
        switch (status) {
            case 400:
                toast.error('Invalid user content');
                break;
            case 409:
                toast.error('Email already registered');
                break;
            case 422:
                toast.error('Invalid user content');
                break;
            default:
                errorMessage = data?.message || `Server error (${status}). Please try again.`;
                setError(errorMessage);
        }
    } else if (error.message) {
        // Check for specific error messages
        const lowerMessage = error.message.toLowerCase();
        
        if (lowerMessage.includes('email already registered') || 
            (lowerMessage.includes('email') && lowerMessage.includes('exist'))) {
            toast.error('Email already registered');
        } else if (lowerMessage.includes('invalid') || 
                   lowerMessage.includes('validation') ||
                   lowerMessage.includes('required')) {
            toast.error('Invalid user content');
        } else {
            // For any other error message, show it as is or fallback
            toast.error('Invalid user content');
        }
    } else {
        setError(errorMessage);
    }
} finally {
    setLoading(false);
}
	};

	const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setOtpError('');

    if (!otp || otp.length < 4) {
        setOtpError('Please enter a valid OTP');
        return;
    }

    try {
        setOtpLoading(true);
        console.log('OTP verification data:', {
            email: email,
            otp: otp
        });

        const response = await verifyOTP({
            email: email.trim().toLowerCase(),
            otp: otp
        });
        
        console.log('OTP verification response:', response);
        console.log('Response success:', response?.success);
        console.log('Response token:', response?.token);
        
        // Check if response indicates success
        if (response && (response.success || response.token)) {
            console.log('OTP verification successful, closing modal and redirecting...');
            setShowOtpModal(false);
            toast.success('Email verified successfully! Please login to continue.');
            
            // Add a small delay to ensure toast is shown before navigation
            setTimeout(() => {
                console.log('Navigating to login page...');
                navigate('/login', { replace: true });
            }, 1000);
        } else {
            console.log('OTP verification failed:', response);
            setOtpError(response?.message || 'OTP verification failed');
        }
    } catch (error) {
        console.error('OTP verification error:', error);
        let errorMessage = 'OTP verification failed';
        
        if (error.response && error.response.data) {
            errorMessage = error.response.data.message || errorMessage;
        } else if (error.message) {
            errorMessage = error.message;
        }
        
        setOtpError(errorMessage);
    } finally {
        setOtpLoading(false);
    }
};
	const handleOtpChange = (e) => {
		const value = e.target.value.replace(/\D/g, ''); // Only allow digits
		setOtp(value);
	};

	const handleResendOTP = async () => {
		try {
			setOtpLoading(true);
			// You might need to implement a resend OTP API call here
			// For now, we'll just show a message
			alert('OTP resent successfully! Please check your email.');
		} catch (error) {
			console.error('Resend OTP error:', error);
			setOtpError('Failed to resend OTP. Please try again.');
		} finally {
			setOtpLoading(false);
		}
	};

	return (
		<div className='h-screen w-full login-bg'>
			<header className='max-w-6xl mx-auto flex items-center justify-between p-4'>
				<Link to={"/"}>
					<img src='/ellip-logo1.png' alt='logo' className='w-24' />
				</Link>
			</header>

			<div className='flex justify-center items-center mt-15 mx-3'>
				<div className='w-full max-w-md p-8 space-y-6 bg-black/60 rounded-lg shadow-md'>
					<h1 className='text-center text-white text-2xl font-bold mb-4'>Sign Up</h1>

					{successMessage && (
						<div className='text-green-400 text-sm text-center bg-green-900/20 p-3 rounded-md border border-green-700'>
							{successMessage}
						</div>
					)}

					<form className='space-y-4' onSubmit={handleSignUp}>
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
							<label htmlFor='username' className='text-sm font-medium text-gray-300 block'>
								Name
							</label>
							<input
								type='text'
								className='w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring'
								placeholder='John Doe'
								id='username'
								value={username}
								onChange={(e) => setUsername(e.target.value)}
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
								minLength="6"
							/>
						</div>

						<div>
							<label htmlFor='occupation' className='text-sm font-medium text-gray-300 block'>
								Occupation
							</label>
							<select
								className='w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring'
								id='occupation'
								value={occupation}
								onChange={(e) => setOccupation(e.target.value)}
								required
								disabled={loading}
							>
								<option value='' disabled className='bg-gray-800'>
									Select your occupation
								</option>
								<option value='Student' className='bg-gray-800'>
									Student
								</option>
								<option value='Legal Professional' className='bg-gray-800'>
									Legal Professional
								</option>
								<option value='Art Professional' className='bg-gray-800'>
									Art Professional
								</option>
								<option value='Artist' className='bg-gray-800'>
									Artist
								</option>
								<option value='Other' className='bg-gray-800'>
									Other
								</option>
							</select>
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
							{loading ? "Registering..." : "Sign Up"}
						</button>
					</form>
					<div className='text-center text-gray-400'>
						Already a member?{" "}
						<Link to={"/login"} className='text-blue-500 hover:underline'>
							Sign in
						</Link>
					</div>
				</div>
			</div>

			{/* OTP Verification Modal */}
			{showOtpModal && (
				<div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50'>
					<div className='w-full max-w-md p-8 space-y-6 bg-black/80 rounded-lg shadow-md mx-3 border border-gray-700'>
						<h2 className='text-center text-white text-2xl font-bold mb-4'>Verify Your Email</h2>
						<p className='text-gray-300 text-center'>
							We've sent a verification code to:
						</p>
						<p className='text-white text-center font-semibold'>{email}</p>
						
						<form onSubmit={handleOtpSubmit} className='space-y-4'>
							<div>
								<label htmlFor='otp' className='text-sm font-medium text-gray-300 block'>
									Enter OTP
								</label>
								<input
									type='text'
									id='otp'
									className='w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring text-center text-lg tracking-widest'
									placeholder='Enter 6-digit code'
									value={otp}
									onChange={handleOtpChange}
									maxLength="6"
									required
									disabled={otpLoading}
								/>
							</div>

							{otpError && (
								<div className='text-red-400 text-sm text-center bg-red-900/20 p-3 rounded-md border border-red-700'>
									{otpError}
								</div>
							)}

							<button
								type='submit'
								className='w-full py-2 bg-green-600 text-white font-semibold rounded-md 
								hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed'
								disabled={otpLoading || !otp}
							>
								{otpLoading ? 'Verifying...' : 'Verify OTP'}
							</button>
						</form>

						<div className='text-center'>
							<p className='text-gray-400 text-sm'>Didn't receive the code?</p>
							<button 
								type='button' 
								className='text-blue-500 hover:underline text-sm disabled:opacity-50'
								disabled={otpLoading}
								onClick={handleResendOTP}
							>
								Resend OTP
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default SignUpPage;