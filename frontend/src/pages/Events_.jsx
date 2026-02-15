import { useState, useEffect } from 'react';
import AltNavbar from '../components/AltNavbar';
import { Link } from "react-router-dom";
import { Calendar, User, Clock, ArrowRight, Sparkles, MapPin, ExternalLink } from 'lucide-react';

const EventsPage_ = () => {
  const [imgLoading, setImgLoading] = useState(true);
  const [patronId, setPatronId] = useState("user");

  // Upcoming events data (From reference)
  const upcomingEvents = [
    {
      id: 3,
      title: "HANDS ON: SEXUAL HARASSMENT IN THE CREATIVE INDUSTRY",
      speaker: "DR. ARSHIYA SETHI",
      date: "February 20, 2026",
      venue: "Online",
      description: "Our session on Sexual Harassment in the Creative Industry confronts hidden power dynamics, silences, and structural gaps shaping artistic spaces through an unflinching conversation with leading artivist Arshiya Sethi. Join us as we reimagine the arts as spaces of dignity, consent, and equity—where creativity can truly thrive without fear.",
      image: "./Arshiya2.jpeg",
      category: "ART, CREATIVE INDUSTRY",
      registrationLink: "https://forms.gle/TApRVW6jAgH2H7a86"
    }
  ];

  // Archived events data (Existing)
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
      title: "PERFORMING ARTS AND THE LAW: BEHIND THE SPOTLIGHTS",
      speaker: "DR. SOMABHA BANDOPADHYAY",
      date: "November 2, 2025",
      description: "Dr. Somabha Bandopadhyay, Assistant Professor at National Forensic Sciences University, Delhi campus, delved into the legal intricacies of performing arts in India, covering intellectual property rights, contracts, and censorship issues faced by artists.",
      image: "./event2_thumbn.jpeg",
      category: "ART PRESERVATION LAW",
      duration: "1 hour",
      attendees: "100",
    }
  ];

  // Fetch the patron ID to build the correct link
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
        <div className="container mx-auto px-4 pb-16">
          <div className="max-w-5xl mx-auto p-4">
            
            {/* --- UPCOMING EVENTS SECTION --- */}
            <div className="mb-20">
              <div className="flex items-center justify-center gap-4 mb-10">
                <div className="h-px w-16 bg-gradient-to-r from-transparent to-amber-500/50" />
                <h1 className="text-white font-light text-3xl md:text-4xl tracking-wide text-center flex items-center gap-3">
                  <Sparkles className="w-8 h-8 text-amber-400" />
                  UPCOMING EVENTS
                </h1>
                <div className="h-px w-16 bg-gradient-to-l from-transparent to-amber-500/50" />
              </div>
              
              <div className="space-y-8">
                {upcomingEvents.map((event) => (
                  <div key={event.id} className="relative bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-sm rounded-xl overflow-hidden shadow-2xl border border-amber-500/30 transition-all duration-300 hover:border-amber-400/50 hover:shadow-amber-500/20 group">
                    {/* Upcoming Badge */}
                    <div className="absolute top-4 left-4 z-20 flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg">
                      <Sparkles className="w-4 h-4" />
                      UPCOMING EVENT
                    </div>

                    <div className="flex flex-col lg:flex-row">
                      {/* Image Section */}
                      <div className="lg:w-2/5 relative overflow-hidden">
                        <img 
                          src={event.image} 
                          alt="Event thumbnail" 
                          className="w-full h-64 lg:h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        {/* Gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent lg:bg-gradient-to-r" />
                      </div>
                      
                      {/* Text Content Section */}
                      <div className="lg:w-3/5 p-6 lg:p-8">
                        {/* Category */}
                        <div className="flex items-center justify-between mb-4 mt-8 lg:mt-0">
                          <span className="bg-amber-600/20 text-amber-400 border border-amber-500/30 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide">
                            {event.category}
                          </span>
                        </div>
                        
                        {/* Title */}
                        <h2 className="text-white text-2xl lg:text-3xl font-semibold mb-4 leading-tight group-hover:text-amber-300 transition-colors">
                          {event.title}
                        </h2>
                        
                        {/* Speaker */}
                        <p className="text-amber-400 text-base mb-4 font-medium flex items-center">
                          <User className="w-5 h-5 mr-2" />
                          {event.speaker}
                        </p>
                        
                        {/* Event Details */}
                        <div className="flex flex-wrap gap-4 text-gray-300 text-sm mb-5 bg-gray-800/50 rounded-lg p-4">
                          <span className="flex items-center">
                            <Calendar className="w-4 h-4 mr-2 text-amber-400" />
                            {event.date}
                          </span>
                          <span className="flex items-center">
                            <MapPin className="w-4 h-4 mr-2 text-amber-400" />
                            {event.venue}
                          </span>
                        </div>
                        
                        {/* Description */}
                        <p className="text-gray-300 text-sm mb-6 leading-relaxed line-clamp-4">
                          {event.description}
                        </p>
                        
                        {/* Action Buttons */}
                        <div className="flex flex-wrap items-center gap-4">
                          <a 
                            href={event.registrationLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center border border-amber-500/50 text-amber-400 hover:bg-amber-500/10 px-6 py-3 rounded-lg text-sm font-medium transition-all duration-300"
                          >
                            <span>Register For Free</span>
                            <ExternalLink className="w-4 h-4 ml-2" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* --- ARCHIVED EVENTS SECTION --- */}
            <div>
              <div className="flex items-center justify-center gap-4 mb-10">
                <div className="h-px w-16 bg-gradient-to-r from-transparent to-blue-500/50" />
                <h1 className="text-white font-light text-3xl md:text-4xl tracking-wide text-center">
                  ARCHIVED EVENTS
                </h1>
                <div className="h-px w-16 bg-gradient-to-l from-transparent to-blue-500/50" />
              </div>
              
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
    </div>
  );
}

export default EventsPage_;