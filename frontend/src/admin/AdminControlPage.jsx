import { useState, useEffect, useRef } from 'react'; 
import { ChevronRight, Users, BookOpen, FileText, MessageCircle, Scale, Palette, Shield, Globe, Search, Music } from 'lucide-react'; 
import AdNavbar from '../components/AdNavbar';
import { Link } from "react-router-dom";

const Adcontrol = () => {
  const [email, setEmail] = useState('');
  const [imgLoading, setImgLoading] = useState(true);
  const [dailyQuote, setDailyQuote] = useState({ text: '', author: '' });
  const [showChatbot, setShowChatbot] = useState(false);
  const chatSidebarRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [songs, setSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [bgPosition, setBgPosition] = useState('');
  const audioRef = useRef(null);
     
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  // Handle click outside to close sidebar
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showChatbot && chatSidebarRef.current && !chatSidebarRef.current.contains(event.target)) {
        setShowChatbot(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showChatbot]);


  // Get daily quote based on current dat

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log('Email submitted:', email);
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    console.log('Contact form submitted:', formData);
  };

  // Music player functions
  const searchSongs = async () => {
    if (!searchQuery.trim()) return;
    
    // In a real implementation, you would call an API here
    console.log(`Searching for: ${searchQuery}`);
    
    // Mock data - replace with actual API call
    setSongs([
      { id: 1, title: `${searchQuery} Song 1`, artist: 'Artist 1', url: 'https://example.com/song1.mp3' },
      { id: 2, title: `${searchQuery} Song 2`, artist: 'Artist 2', url: 'https://example.com/song2.mp3' },
      { id: 3, title: `${searchQuery} Song 3`, artist: 'Artist 3', url: 'https://example.com/song3.mp3' },
    ]);
  };
  
  const playSong = (song) => {
    setCurrentSong(song);
    setIsPlaying(true);
    // In a real implementation, you would set the audio source here
    // audioRef.current.src = song.url;
    // audioRef.current.play().catch(e => console.error("Playback failed:", e));
  };
  
  const togglePlayPause = () => {
    if (isPlaying) {
      // audioRef.current.pause();
    } else {
      // audioRef.current.play().catch(e => console.error("Playback failed:", e));
    }
    setIsPlaying(!isPlaying);
  };
    
  return (
    <div className="relative bg-white min-h-screen" style={{fontFamily: 'Helvetica Neue, sans-serif'}}>
      {/* Navbar */}
      {imgLoading && (
        <div className='absolute top-0 left-0 w-full h-full bg-black/70 flex items-center justify-center shimmer -z-10' />
      )}
      <AdNavbar/>
      
      {/* COOL OPTIMIZATION HACK FOR IMAGES */}
      {imgLoading && (
        <div className='absolute top-0 left-0 w-full h-full bg-black/70 flex items-center justify-center shimmer -z-10' />
      )}

      {/* Hero Section */}
      <div 
          className={`relative flex flex-col items-center justify-center text-center py-20 pt-32 min-h-screen bg-cover bg-no-repeat ${bgPosition}`}
          style={{
            backgroundImage: `url('./collage.jpeg')`,
            filter: 'brightness(0.9) contrast(1.1)'
          }}
        >
            
        {/* Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-4">
          {/* Quote Section */}

          {/* Main Content Grid */}
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Left Side - Text Content */}
        

            {/* Right Side - 3D Animated Cube */}
        
          </div>
        </div>
      </div>

    </div>
  );
};

export default Adcontrol;
