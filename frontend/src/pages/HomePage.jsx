import { useState} from 'react';
import { ChevronRight, Users, BookOpen, FileText, MessageCircle, Scale, Palette, Shield, Globe } from 'lucide-react';
import Navbar from '../components/Navbar';

const HomePage = () => {
  const [email, setEmail] = useState('');
  const [imgLoading, setImgLoading] = useState(true);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log('Email submitted:', email);
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    console.log('Contact form submitted:', formData);
    // Handle form submission here
  };


  return (
    <div className="relative bg-white min-h-screen" style={{fontFamily: 'Arima, sans-serif'}}>
      {/* Navbar */}
      <Navbar/>
      {/* COOL OPTIMIZATION HACK FOR IMAGES */}
				{imgLoading && (
					<div className='absolute top-0 left-0 w-full h-full bg-black/70 flex items-center justify-center shimmer -z-10' />
				)}
      {/* Hero Section */}
      <div 
        className="relative flex flex-col items-center justify-center text-center py-20 pt-32 min-h-screen bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('./gallery.png')` // Replace YOUR_IMAGE_URL_HERE with your actual image URL
        }}
      >
        {/* pink Overlay */}
        <div className="absolute inset-0 bg-pink-200/50"></div>
        
        {/* Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white drop-shadow-lg">
            Navigating Legal Complexities 
          </h1>
          <p className="text-lg md:text-xl mb-6 text-white/90 max-w-3xl drop-shadow-md">
           Helping galleries and institutions understand the intersection of art and law.
          </p>

          <div className="flex flex-col md:flex-row gap-4 w-full max-w-md">
            
            <button 
              onClick={handleFormSubmit}
              className="bg-blue-200 hover:bg-blue-400 text-black text-lg px-6 py-3 rounded-lg flex justify-center items-center transition-colors shadow-lg"
            >
              Get Started
              <ChevronRight className="w-5 h-5 ml-2" />
            </button>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default HomePage;