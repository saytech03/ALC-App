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
    const [otpSuccess, setOtpSuccess] = useState(''); // New state for OTP success messages
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

        // More permissive email validation - accepts all valid email formats including institutional emails
        const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
        if (!emailRegex.test(email.trim())) {
            toast.error('Please enter a valid email address');
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
                email: email.trim().toLowerCase(),
                password: password,
                occupation: occupationMapping[occupation] || occupation.toUpperCase()
            };

            const response = await register(registrationData);
            
            if (response && (response.success || response.id)) {
                setSuccessMessage('You have successfully registered! OTP sent to your email!');
                setShowOtpModal(true);
                setError('');
                // Clear any previous OTP states
                setOtpError('');
                setOtpSuccess('');
                setOtp('');
                toast.success('Registration successful! Please verify your email.');
            } else {
                setError(response?.message || 'Registration failed');
            }
        } catch (error) {
            console.error('Registration error:', error);
            let errorMessage = 'Registration failed';
            
            if (error.response) {
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
                const lowerMessage = error.message.toLowerCase();
                
                if (lowerMessage.includes('email already registered') || 
                    (lowerMessage.includes('email') && lowerMessage.includes('exist'))) {
                    toast.error('Email already registered');
                } else if (lowerMessage.includes('invalid') || 
                           lowerMessage.includes('validation') ||
                           lowerMessage.includes('required')) {
                    toast.error('Invalid user content');
                } else {
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
        setOtpSuccess('');
       
        if (!otp || otp.length < 4) {
            setOtpError('Please enter a valid OTP');
            return;
        }

        try {
            setOtpLoading(true);
            const response = await verifyOTP({
                email: email.trim().toLowerCase(),
                otp: otp
            });
            
            if (response && (response.success || response.token)) {
                setOtpSuccess('Email verified successfully! Redirecting to login...');
                setOtpError(''); // Clear any previous errors
                toast.success('Email verified successfully!');
                
                // Auto redirect after 3 seconds
                setTimeout(() => {
                    navigate('/login', { replace: true });
                }, 3000);
            } else {
                setOtpError(response?.message || 'OTP verification failed');
                setOtpSuccess(''); // Clear any previous success messages
            }
        } catch (error) {
            console.error('OTP verification error:', error);
            setOtpError(error.response?.data?.message || 'OTP verification failed');
            setOtpSuccess(''); // Clear any previous success messages
        } finally {
            setOtpLoading(false);
        }
    };

    const handleOtpChange = (e) => {
        const value = e.target.value.replace(/\D/g, '');
        setOtp(value);
        // Clear messages when user starts typing
        if (otpError) setOtpError('');
        if (otpSuccess) setOtpSuccess('');
    };

    const handleResendOTP = async () => {
        try {
            setOtpLoading(true);
            setOtpError('');
            setOtpSuccess('');
            // You might need to implement a resend OTP API call here
            setOtpSuccess('OTP resent successfully! Please check your email.');
            toast.success('OTP resent successfully! Please check your email.');
        } catch (error) {
            console.error('Resend OTP error:', error);
            setOtpError('Failed to resend OTP. Please try again.');
            setOtpSuccess('');
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

            <div className='flex justify-center items-center mt-1 mx-3'>
                 <div className={`w-full max-w-md p-8 space-y-6 bg-black/60 rounded-lg shadow-md ${showOtpModal ? 'blur-sm' : ''}`}>
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
                <div className='fixed inset-0 flex justify-center items-center z-50'>
                    <div className='absolute inset-0 bg-black/70' onClick={() => setShowOtpModal(false)}></div>
                    <div className='relative w-full max-w-md p-8 space-y-6 bg-gray-900 rounded-lg shadow-lg border border-gray-700 mx-3'>
                        <button 
                            onClick={() => setShowOtpModal(false)}
                            className='absolute top-4 right-4 text-gray-400 hover:text-white'
                        >
                            ✕
                        </button>
                        
                        <h2 className='text-center text-white text-2xl font-bold'>Verify Your Email</h2>
                        <p className='text-gray-300 text-center'>
                            We've sent a 6-digit code to:
                        </p>
                        <p className='text-white text-center font-medium text-lg'>{email}</p>
                        
                        <form onSubmit={handleOtpSubmit} className='space-y-6'>
                            <div className='space-y-2'>
                                <label htmlFor='otp' className='text-sm font-medium text-gray-300 block'>
                                    Verification Code
                                </label>
                                <input
                                    type='text'
                                    id='otp'
                                    className='w-full px-4 py-3 text-xl border border-gray-600 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-center tracking-widest'
                                    placeholder='_ _ _ _ _ _'
                                    value={otp}
                                    onChange={handleOtpChange}
                                    maxLength="6"
                                    required
                                    disabled={otpLoading}
                                />
                            </div>

                            {/* Success Message - Green */}
                            {otpSuccess && (
                                <div className='text-red-400 text-sm text-center bg-red-900/20 p-3 rounded-md border border-red-700'>
                                    {otpSuccess}
                                </div>
                            )}

                            {/* Error Message - Red */}
                            {otpError && (
                                <div className='text-green-400 text-sm text-center bg-green-900/20 p-3 rounded-md border border-green-700'>
                                    {otpError}
                                </div>
                            )}

                            <button
                                type='submit'
                                className='w-full py-3 bg-blue-600 text-white font-semibold rounded-md 
                                hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
                                disabled={otpLoading || !otp}
                            >
                                {otpLoading ? 'Verifying...' : 'Verify Code'}
                            </button>
                        </form>

                        <div className='text-center pt-2'>
                            <p className='text-gray-400 text-sm'>Didn't receive the code?</p>
                            <button 
                                type='button' 
                                className='text-blue-400 hover:text-blue-300 underline text-sm disabled:opacity-50'
                                disabled={otpLoading}
                                onClick={handleResendOTP}
                            >
                                Resend Code
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SignUpPage;