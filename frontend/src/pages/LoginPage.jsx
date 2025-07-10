import { useState } from "react";
import { Link } from "react-router-dom";
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

  // Function to detect if input is email or patron ID
  const isEmail = (input) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(input);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    // Basic validation
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    const inputValue = email.trim();
    const isEmailLogin = isEmail(inputValue);

    try {
      setLoading(true);
      
      let success = false;
      if (isEmailLogin) {
        success = await login({
          email: inputValue.toLowerCase(),
          password: password
        });
      } else {
        success = await loginWithPatron({
          patronId: inputValue,
          password: password
        });
      }
      
      if (success) {
        toast.success('Login successful! Redirecting...');
        // Force full page reload to ensure auth state is properly initialized
        window.location.href = '/h';
      } else {
        setError('Login failed - invalid credentials');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError(error.message || 'Login failed');
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