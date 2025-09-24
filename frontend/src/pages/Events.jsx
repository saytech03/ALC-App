import { useState } from 'react';
import Navbar from '../components/Navbar';
import { Link, useNavigate } from "react-router-dom";
import { Lock, Calendar, User, Clock, ArrowRight } from 'lucide-react';

const EventsPage = () => {
  const [imgLoading, setImgLoading] = useState(true);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const navigate = useNavigate();

  // Sample events data (you can expand this with more events)
  const events = [
    {
      id: 1,
      title: "PAPER TO PRACTICE: HERITAGE CONSERVATION IN THE TRENCHES",
      speaker: "DR. SHUBHA MAJUMDAR",
      date: "August 26, 2025",
      description: "Dr. Shubha Majumdar, Superintending Archaeologist at ASI, provided an insider's view into heritage conservation challenges, legal protections, and ASI's role in safeguarding India's cultural legacy.",
      image: "./event1_thumbn.jpg",
      category: "HERITAGE LAW",
      duration: "90 min",
      attendees: "150+",
      requiresLogin: true
    },
    // Add more events here as needed
  ];

  // Function to handle event click
  const handleEventClick = (event) => {
    if (event.requiresLogin) {
      setSelectedEvent(event);
      setShowLoginModal(true);
    } else {
      // If no login required, navigate directly to event page
      navigate(`/event${event.id}`);
    }
  };

  const handleLogin = () => {
    navigate('/login');
    setShowLoginModal(false);
  };

  return (
    <div className="relative min-h-screen bg-gray-900">
      {imgLoading && (
        <div className='absolute top-0 left-0 w-full h-full bg-black/70 flex items-center justify-center shimmer -z-10' />
      )}
      
      {/* Navbar */}
      <Navbar />
      
      {/* Minimalist background with subtle pattern */}
      <div 
        className="absolute inset-0 bg-gray-600 opacity-100 z-0"
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
          <div className="max-w-4xl mx-auto p-4">
            <h1 className="text-white text-3xl md:text-4xl font-light tracking-wide mb-8 text-center">OUR EVENTS</h1>
            
            {/* Events Grid */}
            <div className="space-y-8">
              {events.map((event) => (
                <div 
                  key={event.id}
                  className="bg-gray-800/70 backdrop-blur-sm rounded-lg overflow-hidden shadow-xl border border-gray-700/50 transition-all duration-300 hover:border-blue-500/30 hover:shadow-2xl cursor-pointer"
                  onClick={() => handleEventClick(event)}
                >
                  {/* Image and content in a single box */}
                  <div className="flex flex-col md:flex-row">
                    {/* Image Section */}
                    <div className="md:w-2/5 relative">
                      <img 
                        src={event.image} 
                        alt="Event thumbnail" 
                        className="w-full h-48 md:h-full object-cover"
                      />
                      {/* Lock icon overlay if login required */}
                      {event.requiresLogin && (
                        <div className="absolute top-4 right-4 bg-black/70 rounded-full p-2">
                          <Lock className="w-5 h-5 text-white" />
                        </div>
                      )}
                    </div>
                    
                    {/* Text Content Section */}
                    <div className="md:w-3/5 p-6">
                      <div className="flex items-center justify-between mb-3">
                        <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                          {event.category}
                        </span>
                      </div>
                      
                      <h2 className="text-white text-xl md:text-2xl font-light mb-3 hover:text-blue-300 transition-colors">
                        {event.title}
                      </h2>
                      
                      <p className="text-blue-300 text-sm mb-2 font-medium flex items-center">
                        <User className="w-4 h-4 mr-2" />
                        {event.speaker}
                      </p>
                      
                      <div className="flex flex-wrap gap-4 text-gray-400 text-xs mb-4">
                        <span className="flex items-center">
                          <Calendar className="w-3 h-3 mr-1" />
                          {event.date}
                        </span>
                        <span className="flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          {event.duration}
                        </span>
                        <span className="flex items-center">
                          👥 {event.attendees}
                        </span>
                      </div>
                      
                      <p className="text-gray-200 text-sm mb-4 leading-relaxed">
                        {event.description}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <button className="inline-flex items-center text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors group">
                          <span>View Event Details</span>
                          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </button>
                        
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Footer text */}
            <div className="mt-16 text-gray-500 text-xs text-center">
              <p>ART LAW COMMUNION</p>
              <p className="mt-1">(A non-profit organization committed to advancing the understanding of art law)</p>
            </div>
          </div>
        </div>
      </div>

      {/* Login Modal - Same as Blog page */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                <Lock className="w-8 h-8 text-red-500" />
              </div>
            </div>
            
            <div className="text-center mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                We are glad you are interested to learn more!
              </h2>
              <p className="text-gray-600 mb-4">
                Please login to access detailed event reports and exclusive content.
              </p>
            </div>
            
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowLoginModal(false)}
                className="px-6 py-2 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleLogin}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Login
              </button>
            </div>
            
          </div>
        </div>
      )}
    </div>
  );
}

export default EventsPage;