import { useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';
import Navbar from '../components/Navbar';
import { useState } from 'react';

const Blog = () => {
   const [imgLoading, setImgLoading] = useState(true);
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <div
			className='min-h-screen bg-cover bg-center flex flex-col justify-center items-center text-white'
			style={{ backgroundImage: `url('/404.png')` }}
		>
      {imgLoading && (
					<div className='absolute top-0 left-0 w-full h-full bg-black/70 flex items-center justify-center shimmer -z-10' />
				)}
      {/* Navigation Header */}
      <div className="relative z-10">
        <Navbar />
      </div>
      
      {/* Modal */}
      <div className='flex justify-center items-center mt-20 mx-3'>
				<div className='w-full max-w-md p-8 space-y-6 bg-black/60 rounded-lg shadow-md'>
          {/* Lock Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
              <Lock className="w-8 h-8 text-red-500" />
            </div>
          </div>
          
          {/* Message */}
          <div className="text-center mb-8">
            <h2 className="text-xl font-semibold text-white mb-2">
              Please login to access blogs
            </h2>
          </div>
          
          {/* Login Button */}
          <div className="text-center">
            <button
              onClick={handleLogin}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;