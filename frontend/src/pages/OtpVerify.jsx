import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../store/AuthContext";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";

const OtpVerify = () => {
    const [otp, setOtp] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState('');

    const { verifyOTP } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    // Initialize email from location state or URL params
    useEffect(() => {
        const emailSource = location.state?.email || 
                         new URLSearchParams(window.location.search).get("email");
        if (emailSource) {
            setEmail(emailSource);
        } else {
            navigate('/signup');
        }
    }, [location, navigate]);

    const handleVerification = async (e) => {
        e.preventDefault();
        
        // Basic OTP validation
        if (!/^\d{6}$/.test(otp)) {
            toast.error('Please enter a valid 6-digit code', {
                style: {
                    background: '#ef4444', // Red background
                    color: '#fff', // White text
                },
            });
            return;
        }

        try {
            setIsLoading(true);
            const response = await verifyOTP({
                email: email.trim().toLowerCase(),
                otp: otp
            });
            
            if (response?.success || response?.token) {
                toast.success('Email verified successfully! Redirecting to login...', {
                    style: {
                        background: '#10b981', // Green background
                        color: '#fff', // White text
                    },
                });
                setTimeout(() => {
                    navigate('/login', { replace: true });
                }, 5000);
            } else {
                toast.error(response?.message || 'Verification failed. Please try again.', {
                    style: {
                        background: '#ef4444', // Red background
                        color: '#fff', // White text
                    },
                });
            }
        } catch (error) {
            console.error('Verification error:', error);
            toast.error(error.response?.data?.message || 'An error occurred during verification.', {
                style: {
                    background: '#ef4444', // Red background
                    color: '#fff', // White text
                },
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleResendOtp = async () => {
        try {
            setIsLoading(true);
            toast.success('New verification code sent!', {
                style: {
                    background: '#10b981', // Green background
                    color: '#fff', // White text
                },
            });
        } catch (error) {
            console.error('Resend error:', error);
            toast.error('Failed to resend code. Please try again.', {
                style: {
                    background: '#ef4444', // Red background
                    color: '#fff', // White text
                },
            });
        } finally {
            setIsLoading(false);
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
            </header>

            <div className='flex-1 flex justify-center items-center mx-3 py-8'>
                <div className="w-full max-w-md p-8 space-y-6 bg-black/60 rounded-lg shadow-md mb-8">
                    <h1 className='text-center text-white text-2xl font-bold mb-4'>
                        Verify Your Email
                    </h1>

                    <p className="text-gray-300 text-center">
                        Enter the 6-digit code sent to: <br />
                        <span className="font-medium text-white">{email}</span>
                    </p>

                    <form onSubmit={handleVerification} className="space-y-4">
                        <div className="flex justify-center">
                            <input
                                type="text"
                                inputMode="numeric"
                                pattern="\d{6}"
                                className="w-48 px-4 py-3 text-center text-white bg-transparent border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="123456"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                                maxLength={6}
                                disabled={isLoading}
                                autoFocus
                            />
                        </div>

                        <button
                            type="submit"
                            className={`w-full py-2 rounded-md font-semibold ${isLoading ? 'bg-blue-700' : 'bg-blue-600 hover:bg-blue-700'} text-white`}
                            disabled={isLoading || otp.length !== 6}
                        >
                            {isLoading ? 'Verifying...' : 'Verify'}
                        </button>
                    </form>

                    <div className="text-center pt-2">
                        <button
                            type="button"
                            className="text-blue-400 hover:text-blue-300 underline text-sm disabled:opacity-50"
                            disabled={isLoading}
                            onClick={handleResendOtp}
                        >
                            Didn't receive code? Resend
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OtpVerify;