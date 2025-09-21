import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, X } from "lucide-react";
import { useAuth } from "../store/AuthContext";
import { toast } from "react-hot-toast";

const AdminLoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showResetPopup, setShowResetPopup] = useState(false);
    const [resetEmail, setResetEmail] = useState("");
    const [resetLoading, setResetLoading] = useState(false);
    const [resetError, setResetError] = useState("");
    const [resetSuccess, setResetSuccess] = useState("");

    // Email validation regex
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

    const { adminLogin, forgotPassword } = useAuth();
    const navigate = useNavigate();

   const handleAdminLogin = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors

    // Basic validation
    if (!username || !password) {
        setError('Please fill in all fields');
        return;
    }

    try {
        setLoading(true);
        
        const loginData = {
            username: username.trim().toLowerCase(),
            password: password
        };
        
        console.log('Admin login data being sent:', loginData);
        const response = await adminLogin(loginData);
        
        console.log('Admin login response:', response);
        
      if (response && response.success) {
    // Admin login successful
    console.log('Admin login successful');
    toast.success('Admin login successful!');

    // Store admin user data
    localStorage.setItem('adminUser', JSON.stringify({
        username: username.trim().toLowerCase(),
        token: response.token,
        isAdmin: true
    }));
    
    // Also store the token separately for consistency
    localStorage.setItem('adminToken', response.token);
    
    // Redirect to admin control panel after successful login
    setTimeout(() => {
        navigate('/acp', { replace: true });
    }, 1000);
} else {
            setError(response?.message || 'Admin login failed');
        }
    } catch (error) {
        console.error('Admin login error:', error);
        
        // Extract detailed error information
        let errorMessage = 'Admin login failed';
        let showToast = false;
        
        if (error.response) {
            // Handle HTTP error responses
            const status = error.response.status;
            const data = error.response.data;
            
            switch (status) {
                case 400:
                    errorMessage = data?.message || 'Invalid request';
                    break;
                case 401:
                    toast.error('Invalid admin credentials');
                    showToast = true;
                    break;
                case 403:
                    errorMessage = data?.message || 'Access denied. Admin privileges required.';
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
                lowerMessage.includes('username')) {
                
                toast.error('Invalid admin credentials');
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
    const handleResetPassword = async (e) => {
        e.preventDefault();
        setResetError("");
        setResetSuccess("");

        if (!resetEmail || !emailRegex.test(resetEmail.trim())) {
            setResetError("Please enter a valid email address");
            return;
        }

        try {
            setResetLoading(true);
            console.log("Sending admin reset request for:", resetEmail);
            
            const response = await forgotPassword(resetEmail.trim().toLowerCase());
            console.log("Admin reset response:", response);
            
            if (response && response.message) {
                setResetSuccess(response.message);
                toast.success("Password reset email sent!");
                setTimeout(() => {
                    setShowResetPopup(false);
                    setResetEmail("");
                }, 3000);
            } else {
                setResetError("Unexpected response from server");
            }
        } catch (error) {
            console.error("Admin password reset error:", error);
            
            // Enhanced error messages
            if (error.message.includes("Failed to fetch")) {
                setResetError("Connection failed. Please check your network and try again.");
            } else if (error.message.includes("Network Error")) {
                setResetError("Cannot connect to server. Please try again later.");
            } else if (error.message.includes("not found") || error.message.includes("not exist")) {
                setResetError("No admin account found with this email address.");
            } else {
                setResetError(error.message || "Failed to send reset request");
            }
        } finally {
            setResetLoading(false);
        }
    };


    return (
        <div className='h-screen w-full-stretch bg-no-repeat loginad-bg'>
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

            <div className='flex justify-center items-center mt-20 mx-3'>
                <div className='w-full max-w-md p-8 space-y-6 bg-black/60 rounded-lg shadow-md'>
                    <h1 className='text-center text-white text-2xl font-bold mb-4'>Admin Login</h1>
                    <p className="text-center text-gray-400 text-sm">
                        Restricted access - Admin privileges required
                    </p>

                    <form className='space-y-4' onSubmit={handleAdminLogin}>
                        <div>
                            <label htmlFor='username' className='text-sm font-medium text-gray-300 block'>
                                Admin Username
                            </label>
                            <input
                                type='text'
                                className='w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring'
                                placeholder='admin@example.com'
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
                                    minLength="7"
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
                            {loading ? "Loading..." : "Admin Login"}
                        </button>
                    </form>
                    
                    <div className='text-center text-gray-400 space-y-2'>
                        <Link to={"/login"} className='text-blue-500 hover:underline block'>
                            ← Back to User Login
                        </Link>
                        <div>
                            Forgot Password?{" "}
                            <button 
                                onClick={() => setShowResetPopup(true)}
                                className='text-blue-500 hover:underline'
                            >
                                Reset Password
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Password Reset Popup */}
            {showResetPopup && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/70">
                    <div className="bg-gray-900 rounded-lg shadow-xl p-6 w-full max-w-md relative border border-gray-700">
                        <button
                            onClick={() => {
                                setShowResetPopup(false);
                                setResetEmail("");
                                setResetError("");
                                setResetSuccess("");
                            }}
                            className="absolute top-4 right-4 text-gray-400 hover:text-white"
                        >
                            <X size={24} />
                        </button>

                        <h2 className="text-2xl font-bold text-white mb-4">Admin Password Reset</h2>
                        
                        {resetSuccess ? (
                            <div className="text-green-400 text-center p-4 bg-green-900/20 rounded-md border border-green-700">
                                {resetSuccess}
                            </div>
                        ) : (
                            <>
                                <p className="text-gray-300 mb-4">
                                    Enter your admin email address and we'll send you a link to reset your password.
                                </p>
                                
                                <form onSubmit={handleResetPassword} className="space-y-4">
                                    <div>
                                        <label htmlFor="reset-email" className="block text-sm font-medium text-gray-300 mb-1">
                                            Admin Email Address
                                        </label>
                                        <input
                                            type="email"
                                            id="reset-email"
                                            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring focus:border-blue-500"
                                            placeholder="admin@example.com"
                                            value={resetEmail}
                                            onChange={(e) => setResetEmail(e.target.value)}
                                            required
                                        />
                                    </div>
                                    
                                    {resetError && (
                                        <div className="text-red-400 text-sm text-center bg-red-900/20 p-3 rounded-md border border-red-700">
                                            {resetError}
                                        </div>
                                    )}
                                    
                                    <button
                                        type="submit"
                                        className="w-full py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                                        disabled={resetLoading}
                                    >
                                        {resetLoading ? "Sending..." : "Send Reset Link"}
                                    </button>
                                </form>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminLoginPage;