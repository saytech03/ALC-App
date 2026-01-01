import { useState, useEffect } from 'react';
import AltNavbar from '../components/AltNavbar';
import { Link } from "react-router-dom";
import { Calendar, User, Clock, ArrowRight } from 'lucide-react';

const EventsPage_ = () => {
  const [imgLoading, setImgLoading] = useState(true);
  const [patronId, setPatronId] = useState("user");

  // Sample events data (Matches EventsPage)
  const events = [
    {
      id: 1,
      title: "PAPER TO PRACTICE: HERITAGE CONSERVATION IN THE TRENCHES",
      speaker: "DR. SHUBHA MAJUMDAR",
      date: "August 26, 2025",
      description: "Dr. Shubha Majumdar, Superintending Archaeologist at ASI, provided an insider's view into heritage conservation challenges, legal protections, and ASI's role in safeguarding India's cultural legacy.",
      image: "./event1_thumbn.jpg",
      category: "HERITAGE PRESERVATION LAW",
      duration: "1 hour",
      attendees: "100",
    },
    {
      id: 2,
      title: "PERFORMING ARTS AND THE LAW:BEHIND THE SPOTLIGHTS",
      speaker: "DR. SOMABHA BANDOPADHYAY",
      date: "November 2, 2025",
      description: "Dr. Somabha Bandopadhyay, Assistant Professor at National Forensic Sciences University, Delhi campus, delved into the legal intricacies of performing arts in India, covering intellectual property rights, contracts, and censorship issues faced by artists.",
      image: "./event2_thumbn.jpeg",
      category: "ART PRESERVATION LAW",
      duration: "1 hour",
      attendees: "100",
    }
    // Add more events here as needed
  ];

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
      
      {/* Navbar - Untouched */}
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
          <div className="max-w-4xl mx-auto p-4">
            <h1 className="text-white font-light text-3xl md:text-4xl tracking-wide mb-8 text-center">OUR EVENTS</h1>
            
            {/* Events Grid */}
            <div className="space-y-8">
              {events.map((event) => (
                <div 
                  key={event.id}
                  className="bg-gray-800/70 backdrop-blur-sm rounded-lg overflow-hidden shadow-xl border border-gray-700/50 transition-all duration-300 hover:border-blue-500/30 hover:shadow-2xl"
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
                        {/* Dynamic Link using the fetched patronId */}
                        <Link 
                            to={`/${patronId}/event${event.id}`}
                            className="inline-flex items-center text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors group"
                        >
                          <span>View Event Details</span>
                          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventsPage_;