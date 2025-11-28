import { useState, useEffect } from 'react';
import AltNavbar from '../components/AltNavbar';
import { Link } from "react-router-dom";

const EventsPage_ = () => {
  const [imgLoading, setImgLoading] = useState(true);
  const [patronId, setPatronId] = useState("user");

  // NEW: Fetch the patron ID to build the correct link
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('currentUser');
      if (storedUser) {
        const user = JSON.parse(storedUser);
        const id = user.alc_patronid || user.membershipId || "user";
        setPatronId(id);
      }
    } catch (e) {
      console.error("Error fetching patron ID", e);
    }
  }, []);
  
  return (
    <div className="relative min-h-screen bg-gray-900">
      {imgLoading && (
        <div className='absolute top-0 left-0 w-full h-full bg-black/70 flex items-center justify-center shimmer -z-10' />
      )}
      
      {/* Navbar */}
      <AltNavbar />
      
      {/* Minimalist background with subtle pattern */}
      <div 
        className="absolute inset-0 bg-gray-600 opacity-100 z-0"
        style={{
          backgroundImage: `url('./pillar.jpg')`,
          filter: 'brightness(0.9) contrast(1.1)',
        }}
        onLoad={() => setImgLoading(false)}
      />
      
      {/* Content */}
      <div className="relative pt-28 min-h-screen flex items-center justify-center z-10">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto p-4">
            <h1 className="text-white text-3xl md:text-4xl font-light tracking-wide mb-8 text-center">OUR EVENTS</h1>
            
            {/* Event Card with Integrated Image */}
            <div className="mb-12 bg-gray-800/70 backdrop-blur-sm rounded-lg overflow-hidden shadow-xl border border-gray-700/50 transition-all duration-300 hover:border-blue-500/30">
              {/* Image and content in a single box */}
              <div className="flex flex-col md:flex-row">
                {/* Image Section */}
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
                  
                  {/* UPDATED: Dynamic Link using the fetched patronId */}
                  {/* Make sure you have <Route path='/:patronId/event1' ... /> in App.jsx */}
                  {/* OR change this to simply to="/event1" if using the public route */}
                  <Link to={`/${patronId}/event1`} className="inline-block text-blue-400 hover:text-blue-300 text-xs px-3 py-1.5 rounded bg-gray-700/50 hover:bg-gray-700/70 transition-colors">
                    CLICK HERE for event report
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Additional events would follow the same pattern */}
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventsPage_;