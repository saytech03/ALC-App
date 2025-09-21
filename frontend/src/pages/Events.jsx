import { useState } from 'react';
import Navbar from '../components/Navbar';
import { Link } from "react-router-dom";

const EventsPage = () => {
  const [imgLoading, setImgLoading] = useState(true);
  
  return (
    <div className="relative min-h-screen bg-gray-900">
      {imgLoading && (
        <div className='absolute top-0 left-0 w-full h-full bg-black/70 flex items-center justify-center shimmer -z-10' />
      )}
      
      {/* Navbar */}
      <Navbar />
      
      {/* Minimalist background with subtle pattern */}
      <div 
        className="absolute inset-0 bg-gray-300 opacity-100 z-0"
        style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, rgba(30, 30, 40, 0.8) 0%, transparent 50%),
                            radial-gradient(circle at 75% 75%, rgba(20, 20, 30, 0.6) 0%, transparent 50%)`,
          backgroundSize: '50% 50%, 50% 50%',
          backgroundPosition: 'top left, bottom right',
          backgroundRepeat: 'no-repeat'
        }}
        onLoad={() => setImgLoading(false)}
      />
      
      {/* Content */}
      <div className="relative pt-28 min-h-screen flex items-center justify-center z-10">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto p-4">
            <h1 className="text-black text-3xl md:text-4xl font-light tracking-wide mb-8 text-center">OUR EVENTS</h1>
            
            {/* Event Card with Integrated Image */}
            <div className="mb-12 bg-gray-800/70 backdrop-blur-sm rounded-lg overflow-hidden shadow-xl border border-gray-700/50 transition-all duration-300 hover:border-blue-500/30">
              {/* Image and content in a single box */}
              <div className="flex flex-col md:flex-row">
                {/* Image Section - Replace src with your image URL later */}
                <div className="md:w-2/5">
                  <img 
                    src="./event1_thumbn.jpg" 
                    alt="Event thumbnail" 
                    className="w-full h-48 md:h-full object-cover"
                  />
                </div>
                
                {/* Text Content Section */}
                <div className="md:w-3/5 p-5">
                  <h2 className="text-white text-xl md:text-2xl font-light mb-2">PAPER TO PRACTICE: HERITAGE CONSERVATION IN THE TRENCHES</h2>
                  <p className="text-blue-300 text-sm mb-1 font-medium">By DR. SHUBHA MAJUMDAR</p>
                  <p className="text-gray-400 text-xs mb-3">August 26, 2025</p>
                  <p className="text-gray-200 text-sm mb-4 leading-tight">
                    Dr. Shubha Majumdar, Superintending Archaeologist at ASI, provided an insider's view into heritage conservation challenges, legal protections, and ASI's role in safeguarding India's cultural legacy.
                  </p>
                  <Link to="/login" className="inline-block text-blue-400 hover:text-blue-300 text-xs px-3 py-1.5 rounded bg-gray-700/50 hover:bg-gray-700/70 transition-colors">
                    CLICK HERE for event report
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Additional events would follow the same pattern */}
            
            {/* Footer text - Smaller */}
            <div className="mt-16 text-gray-500 text-xs text-center">
              <p>ART LAW COMMUNION</p>
              <p className="mt-1">(A non-profit organization committed to advancing the understanding of art law)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventsPage;