import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../store/AuthContext";
import { toast } from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";

const SignUpPage = () => {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [occupation, setOccupation] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const { register } = useAuth();
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

        // Password format validation
        if (!password || password.length < 8) {
            toast.error('Invalid user content');
            return;
        }

        // Additional validation
        if (!email || !occupation) {
            toast.error('Invalid user content');
            return;
        }

        // Email validation
        const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
        if (!emailRegex.test(email.trim())) {
            toast.error('Please enter a valid email address');
            return;
        }

        try {
            setLoading(true);
            
            // Map occupation to match API expected format
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
            
            // Only navigate to OTP page, don't consider registration complete yet
            navigate('/otp', { 
                state: { 
                    email: email.trim().toLowerCase(),
                    registrationData: registrationData
                } 
            });
            toast.success('OTP sent to your email. Please verify to activate your account.');
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
                        // Show "Email already registered" for case 409 error
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
                
                // Show "Email already registered" for case 409 OR if verified is false
                if (lowerMessage.includes('email already registered') || 
                    (lowerMessage.includes('email') && lowerMessage.includes('exist')) ||
                    (lowerMessage.includes('verified') && lowerMessage.includes('true'))) {
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

    return (
        <div className='h-screen w-full-stretch bg-no-repeat login-bg'>
            {/* Original Header */}
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
            </header>

            <div className='flex-1 flex justify-center items-center mx-3 py-8'>
                <div className="w-full max-w-md p-8 space-y-6 bg-black/60 rounded-lg shadow-md mb-8">
                    <h1 className='text-center text-white text-2xl font-bold mb-4'>Sign Up</h1>

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
                            <div className='relative'>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    className='w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring pr-10'
                                    placeholder='••••••••'
                                    id='password'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    disabled={loading}
                                    minLength="8"
                                />
                                <button
                                    type='button'
                                    className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300'
                                    onClick={() => setShowPassword(!showPassword)}
                                    disabled={loading}
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                            {password.length > 0 && (
                                <div className="mt-2 text-xs text-gray-400 space-y-1">
                                    <p className={password.length >= 8 ? 'text-green-400' : ''}>
                                        {password.length >= 8 ? '✓' : '•'} At least 8 characters
                                    </p>
                                    <p className={/[A-Z]/.test(password) ? 'text-green-400' : ''}>
                                        {/[A-Z]/.test(password) ? '✓' : '•'} At least one uppercase letter
                                    </p>
                                    <p className={/[!@#$%^&*(),.?":{}|<>]/.test(password) ? 'text-green-400' : ''}>
                                        {/[!@#$%^&*(),.?":{}|<>]/.test(password) ? '✓' : '•'} At least one special character
                                    </p>
                                </div>
                            )}
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
        </div>
    );
};

export default SignUpPage;