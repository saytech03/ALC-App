import { useState, useEffect, useRef } from 'react'; 
import { ChevronRight, Users, BookOpen, FileText, MessageCircle, Scale, Palette, Shield, Globe, Search, Music } from 'lucide-react'; 
import Navbar from '../components/Navbar';
import { Link } from "react-router-dom";

const HomePage = () => {
  const [email, setEmail] = useState('');
  const [imgLoading, setImgLoading] = useState(true);
  const [dailyQuote, setDailyQuote] = useState({ text: '', author: '' });
  const [showChatbot, setShowChatbot] = useState(false);
  const chatSidebarRef = useRef(null);
  const [showMusicPlayer, setShowMusicPlayer] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [songs, setSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
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

   // Array of quotes that will rotate daily
 const quotes = [
  // Original quotes
  {
    text: "Art is perhaps the only territory that has kept hope alive. Because it is always about moving forward. Creativity never dies. Creativity looks forward, produces the future of hope.",
    author: "Gulmohammed Sheikh"
  },
  {
    text: "The purpose of art is washing the dust of daily life off our souls.",
    author: "Pablo Picasso"
  },
  {
    text: "Art enables us to find ourselves and lose ourselves at the same time.",
    author: "Thomas Merton"
  },
  {
    text: "Every artist was first an amateur.",
    author: "Ralph Waldo Emerson"
  },
  {
    text: "Art is not what you see, but what you make others see.",
    author: "Edgar Degas"
  },
  {
    text: "The artist is nothing without the gift, but the gift is nothing without work.",
    author: "Émile Zola"
  },
  {
    text: "Art should comfort the disturbed and disturb the comfortable.",
    author: "Cesar A. Cruz"
  },
  {
    text: "In Art, man reveals himself and not his object",
    author: "Rabindranath Tagore"
  },
  {
    text: "Art is the lie that enables us to realize the truth.",
    author: "Pablo Picasso"
  },
  {
    text: "No great artist ever sees things as they really are. If he did, he would cease to be an artist.",
    author: "Oscar Wilde"
  },
  {
    text: "Art is the most intense mode of individualism that the world has known.",
    author: "Oscar Wilde"
  },
  {
    text: "The essence of all beautiful art, all great art, is gratitude.",
    author: "Friedrich Nietzsche"
  },
  {
    text: "Art is the stored honey of the human soul.",
    author: "Theodore Dreiser"
  },
  {
    text: "Art is the signature of civilizations.",
    author: "Beverly Sills"
  },
  {
    text: "Art is the only way to run away without leaving home.",
    author: "Twyla Tharp"
  },
  {
    text: "Art is not a thing; it is a way.",
    author: "Elbert Hubbard"
  },
  {
    text: "Art is the unceasing effort to compete with the beauty of flowers - and never succeeding.",
    author: "Marc Chagall"
  },
  {
    text: "Art is the daughter of freedom.",
    author: "Friedrich Schiller"
  },
  {
    text: "Art is the proper task of life.",
    author: "Friedrich Nietzsche"
  },
  {
    text: "Art is the most beautiful deception of all.",
    author: "Claude Debussy"
  },
  {
    text: "Art is the elimination of the unnecessary.",
    author: "Pablo Picasso"
  },
  {
    text: "Art is the window to man's soul.",
    author: "Judith Jamison"
  },
  {
    text: "Art is the journey of a free soul.",
    author: "Alev Oguz"
  },
  {
    text: "Art is the child of imagination.",
    author: "John F. Kennedy"
  },
  {
    text: "Art is the most sublime mission of man.",
    author: "Honoré de Balzac"
  },
  {
    text: "Art is the stored honey of the human soul.",
    author: "Theodore Dreiser"
  },
  {
    text: "Art is the signature of civilizations.",
    author: "Beverly Sills"
  },
  {
    text: "Art is the only way to run away without leaving home.",
    author: "Twyla Tharp"
  },
  {
    text: "Art is not a thing; it is a way.",
    author: "Elbert Hubbard"
  },
  {
    text: "Art is the unceasing effort to compete with the beauty of flowers - and never succeeding.",
    author: "Marc Chagall"
  },
  {
    text: "Art is the daughter of freedom.",
    author: "Friedrich Schiller"
  },
  {
    text: "Art is the proper task of life.",
    author: "Friedrich Nietzsche"
  },
  {
    text: "Art is the most beautiful deception of all.",
    author: "Claude Debussy"
  },
  {
    text: "Art is the elimination of the unnecessary.",
    author: "Pablo Picasso"
  },
  {
    text: "Art is the window to man's soul.",
    author: "Judith Jamison"
  },
  {
    text: "Art is the journey of a free soul.",
    author: "Alev Oguz"
  },
  {
    text: "Art is the child of imagination.",
    author: "John F. Kennedy"
  },
  {
    text: "Art is the most sublime mission of man.",
    author: "Honoré de Balzac"
  },
  {
    text: "Where law ends, tyranny begins.",
    author: "William Pitt the Elder"
  },
  {
    text: "The law is reason, free from passion.",
    author: "Aristotle"
  },
  {
    text: "Injustice anywhere is a threat to justice everywhere.",
    author: "Martin Luther King Jr."
  },
  {
    text: "The first duty of society is justice.",
    author: "Alexander Hamilton"
  },
  {
    text: "Law and justice are not always the same.",
    author: "Gloria Allred"
  },
  {
    text: "Justice delayed is justice denied.",
    author: "William E. Gladstone"
  },
  {
    text: "The law is the public conscience.",
    author: "Thomas Hobbes"
  },
  {
    text: "Laws are spider webs through which the big flies pass and the little ones get caught.",
    author: "Honoré de Balzac"
  },
  {
    text: "Justice is truth in action.",
    author: "Benjamin Disraeli"
  },
  {
    text: "The law is the last result of human wisdom acting upon human experience.",
    author: "Samuel Johnson"
  },
  {
    text: "Law is order, and good law is good order.",
    author: "Aristotle"
  },
  {
    text: "Justice is the constant and perpetual will to allot to every man his due.",
    author: "Domitus Ulpian"
  },
  {
    text: "The law is not a light for you or any man to see by; the law is not an instrument of any kind.",
    author: "John Fowles"
  },
  {
    text: "The law is a sort of hocus-pocus science.",
    author: "Charles Macklin"
  },
  {
    text: "Law is a form of order, and good law must necessarily mean good order.",
    author: "Aristotle"
  },
  {
    text: "Justice is the insurance which we have on our lives and property.",
    author: "Franklin D. Roosevelt"
  },
  {
    text: "The law is the witness and external deposit of our moral life.",
    author: "Oliver Wendell Holmes Jr."
  },
  {
    text: "Laws are like cobwebs, which may catch small flies, but let wasps and hornets break through.",
    author: "Jonathan Swift"
  },
  {
    text: "Justice is the means by which established injustices are sanctioned.",
    author: "Anatole France"
  },
  {
    text: "The law is a jealous mistress.",
    author: "Joseph Story"
  },
  {
    text: "Law is the crystallization of the habit and thought of society.",
    author: "Woodrow Wilson"
  },
  {
    text: "Justice is the end of government.",
    author: "James Madison"
  },
  {
    text: "The law is the true embodiment of everything that's excellent.",
    author: "W.S. Gilbert"
  },
  {
    text: "Laws are the very bulwarks of liberty.",
    author: "James A. Garfield"
  },
  {
    text: "Justice is the ligament which holds civilized beings and civilized nations together.",
    author: "Daniel Webster"
  },
  {
    text: "The law is a ass.",
    author: "Charles Dickens"
  },
  {
    text: "Law is the foundation of society.",
    author: "John Locke"
  },
  {
    text: "Justice is the great interest of man on earth.",
    author: "Daniel Webster"
  },
  {
    text: "The law is a human institution.",
    author: "Oliver Wendell Holmes Jr."
  },
  {
    text: "Laws are the silent judges of your conduct.",
    author: "Plato"
  },
  {
    text: "Justice is the tolerable accommodation of the conflicting interests of society.",
    author: "Learned Hand"
  },
  {
    text: "The law is a profession of words.",
    author: "David Mellinkoff"
  },
  {
    text: "Law is the embodiment of the moral sentiment of the people.",
    author: "Rudolf von Jhering"
  },
  {
    text: "Justice is the crowning glory of the virtues.",
    author: "Marcus Tullius Cicero"
  },
  {
    text: "The law is a sort of hocus-pocus science.",
    author: "Charles Macklin"
  },
  {
    text: "Law is a form of order, and good law must necessarily mean good order.",
    author: "Aristotle"
  },
  {
    text: "Justice is the insurance which we have on our lives and property.",
    author: "Franklin D. Roosevelt"
  },
  {
    text: "The law is the witness and external deposit of our moral life.",
    author: "Oliver Wendell Holmes Jr."
  },
  {
    text: "Laws are like cobwebs, which may catch small flies, but let wasps and hornets break through.",
    author: "Jonathan Swift"
  },
  {
    text: "Justice is the means by which established injustices are sanctioned.",
    author: "Anatole France"
  },
  {
    text: "The law is a jealous mistress.",
    author: "Joseph Story"
  },
  {
    text: "Law is the crystallization of the habit and thought of society.",
    author: "Woodrow Wilson"
  },
  {
    text: "Justice is the end of government.",
    author: "James Madison"
  },
  {
    text: "The law is the true embodiment of everything that's excellent.",
    author: "W.S. Gilbert"
  },
  {
    text: "Laws are the very bulwarks of liberty.",
    author: "James A. Garfield"
  },
  {
    text: "Justice is the ligament which holds civilized beings and civilized nations together.",
    author: "Daniel Webster"
  },
  {
    text: "The law is a ass.",
    author: "Charles Dickens"
  },
  {
    text: "Law is the foundation of society.",
    author: "John Locke"
  },
  {
    text: "Justice is the great interest of man on earth.",
    author: "Daniel Webster"
  },
  {
    text: "The law is a human institution.",
    author: "Oliver Wendell Holmes Jr."
  },
  {
    text: "Laws are the silent judges of your conduct.",
    author: "Plato"
  },
  {
    text: "Justice is the tolerable accommodation of the conflicting interests of society.",
    author: "Learned Hand"
  },
  {
    text: "The law is a profession of words.",
    author: "David Mellinkoff"
  },
  {
    text: "Law is the embodiment of the moral sentiment of the people.",
    author: "Rudolf von Jhering"
  },
  {
    text: "Justice is the crowning glory of the virtues.",
    author: "Marcus Tullius Cicero"
  },

  // Quotes about art and law combined
  {
    text: "Art and law are both attempts to bring order out of chaos.",
    author: "Martha Nussbaum"
  },
  {
    text: "The artist and the lawyer both seek truth, but through different means.",
    author: "John Mortimer"
  },
  {
     text: "The secret of getting ahead is getting started.",
     author: "Mark Twain"
  }
];

  // Get daily quote based on current date
  useEffect(() => {
    const today = new Date();
    const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
    const quoteIndex = dayOfYear % quotes.length;
    setDailyQuote(quotes[quoteIndex]);
  }, []);

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
      <Navbar/>
      
      {/* COOL OPTIMIZATION HACK FOR IMAGES */}
      {imgLoading && (
        <div className='absolute top-0 left-0 w-full h-full bg-black/70 flex items-center justify-center shimmer -z-10' />
      )}

      {/* Hero Section */}
      <div 
        className="relative flex flex-col items-center justify-center text-center py-20 pt-32 min-h-screen bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('./collage.jpeg')`,
          filter: 'brightness(0.9) contrast(1.1)'
        }}
      >
          
                
        {/* Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-4">
          {/* Quote Section */}
          <div className="mb-16 text-center backdrop-blur-md bg-black/30 p-8 rounded-lg"> 
          <blockquote className="text-2xl md:text-3xl italic font-serif text-white mb-6 max-w-4xl mx-auto leading-relaxed">  
            "{dailyQuote.text}"
          </blockquote>
          <cite className="text-xl md:text-2xl font-serif text-white">  
            - {dailyQuote.author}
          </cite>
        </div>

          {/* Main Content Grid */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Side - Text Content */}
             <div className="max-w-4xl mx-auto text-center backdrop-blur-sm bg-black/30 p-8 rounded-lg">
            <div className="text-left">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white" style={{fontFamily: 'Arial, sans-serif'}}>
                Empowering<br/>
                Artists<br/>
                Legally
              </h1>
              <p className="text-lg text-white mb-8 leading-relaxed">
                Our mission is to provide a platform for building discourse on Art Law 
                for serving artists, lawyers, and students of both law and art 
                disciplines, including art market professionals and members of the 
                general public. Importantly, this communion will attempt to bridge 
                the gap between the artistic and the legal community.
              </p>
            </div>
            </div>

            {/* Right Side - 3D Animated Cube */}
            <div className="flex justify-center md:justify-end mr-22">
              <div className="relative">
                {/* 3D Animated Cube */}
                <div className="cube-container">
                  <div className="cube">
                    <div className="face front">
                      <div className="text-center text-white p-6">
                        <div className="text-xl font-bold mb-4">
                          We would love to hear<br/>
                          from you!
                        </div>
                      </div>
                    </div>
                    <div className="face back">
                      <div className="text-center text-white p-6">
                        <div className="text-xl font-bold mb-4">
                         Write to us <u><Link to="/contact">here</Link></u> and<br/>
                          we will publish your<br/>
                          original ideas
                        </div>
                      </div>
                    </div>
                    <div className="face right">
                      <div className="text-center text-white p-6">
                        <div className="text-xl font-bold mb-4">
                          We would love to hear<br/>
                          from you!
                        </div>
                      </div>
                    </div>
                    <div className="face left">
                      <div className="text-center text-white p-6">
                        <div className="text-xl font-bold mb-4">
                         Write to us <u><Link to="/contact">here</Link></u> and<br/>
                          we will publish your<br/>
                          original ideas
                        </div>
                      </div>
                    </div>
                    <div className="face top">
                      <div className="text-center text-white p-6">
                       <div className="text-xl font-bold mb-4">
                          We would love to hear<br/>
                          from you!
                        </div>
                      </div>
                    </div>
                    <div className="face bottom">
                      <div className="text-center text-white p-6">
                         <div className="text-xl font-bold mb-4">
                         Write to us <u><Link to="/contact">here</Link></u> and<br/>
                          we will publish your<br/>
                          original ideas
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Magnifying Glass Icon with Keywords */}
      {!showChatbot && (
        <div className="fixed bottom-8 right-8 z-40 flex flex-col items-center">
          <button 
            onClick={() => setShowChatbot(true)}
            className="rounded-full p-0 shadow-xl transition-all duration-300 hover:scale-110 bg-transparent border-none mb-2"
            aria-label="Open chatbot"
          >
            {/* Custom PNG Image - will maintain original colors and shape */}
            <img 
              src="/transparency.png" 
              alt="Open Chatbot" 
              className="w-18 h-18 object-contain filter brightness-0 invert hover:drop-shadow-xl transition-all animate-[pulse_2s_infinite]"
              style={{
                filter: 'brightness(0) invert(1)',
                transition: 'filter 0.3s ease'
              }}
            />
          
          {/* Keywords below the icon */}
          <div className="text-center" >
            <p className="text-white text-sm font-medium px-4 py-1 rounded-full backdrop-blur-sm shadow-lg hover:drop-shadow-xl transition-all animate-[pulse_2s_infinite]">
              ASK ARTLEX!
            </p>
          </div>
          </button>
        </div>
      )}

      {/* Music Player Button */}
      {!showMusicPlayer && (
        <div className="fixed bottom-8 left-8 z-40 flex flex-col items-center">
          <button 
            onClick={() => setShowMusicPlayer(true)}
            className="rounded-full p-3 shadow-xl transition-all duration-300 hover:scale-110 bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 border-none mb-2"
            aria-label="Open music player"
          >
            <Music className="w-6 h-6 text-white" />
          </button>
          <div className="text-center">
            <p className="text-white text-sm font-medium px-4 py-1 rounded-full backdrop-blur-sm shadow-lg hover:drop-shadow-xl transition-all animate-[pulse_2s_infinite]">
              PLAY MUSIC
            </p>
          </div>
        </div>
      )}

      {/* Music Player Search Bar */}
      {showMusicPlayer && (
        <div className="fixed bottom-8 left-8 z-50 w-80 bg-white/95 backdrop-blur-lg shadow-2xl rounded-lg p-4 border border-gray-200">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-medium">Music Player</h3>
            <button 
              onClick={() => {
                setShowMusicPlayer(false);
                setIsPlaying(false);
                setSearchQuery('');
                setSongs([]);
              }}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
          
          {/* Search Input */}
          <div className="flex mb-4">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for songs..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              onKeyPress={(e) => e.key === 'Enter' && searchSongs()}
            />
            <button 
              onClick={searchSongs}
              className="bg-purple-600 text-white px-4 py-2 rounded-r-lg hover:bg-purple-700 transition-colors"
            >
              Search
            </button>
          </div>
          
          {/* Song Results */}
          {songs.length > 0 && (
            <div className="max-h-60 overflow-y-auto mb-4">
              {songs.map(song => (
                <div 
                  key={song.id} 
                  className={`p-3 hover:bg-gray-100 rounded-lg cursor-pointer ${currentSong?.id === song.id ? 'bg-purple-50' : ''}`}
                  onClick={() => playSong(song)}
                >
                  <div className="font-medium">{song.title}</div>
                  <div className="text-sm text-gray-600">{song.artist}</div>
                </div>
              ))}
            </div>
          )}
          
          {/* Now Playing */}
          {currentSong && (
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">{currentSong.title}</div>
                  <div className="text-sm text-gray-600">{currentSong.artist}</div>
                </div>
                <button 
                  onClick={togglePlayPause}
                  className="w-10 h-10 rounded-full bg-purple-600 text-white flex items-center justify-center hover:bg-purple-700"
                >
                  {isPlaying ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10 20H6V4H10V20ZM18 20H14V4H18V20Z" fill="currentColor"/>
                    </svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M19.5 12L6 20V4L19.5 12Z" fill="currentColor"/>
                    </svg>
                  )}
                </button>
              </div>
              <audio ref={audioRef} hidden />
            </div>
          )}
        </div>
      )}

      {/* Chatbot Sidebar with click-outside detection */}
      <div 
        ref={chatSidebarRef}
        className={`fixed inset-y-0 right-0 w-80 bg-white/95 backdrop-blur-lg shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${showChatbot ? 'translate-x-0' : 'translate-x-full'} border-l border-gray-200`}
      >
        <div className="h-full flex flex-col">
          {/* Chatbot Header */}
          <div className="bg-black text-white p-4 flex justify-between items-center border-b border-gray-700">
            <h3 className="text-lg font-medium tracking-tight">Art Law Assistant</h3>
            <button 
              onClick={() => setShowChatbot(false)}
              className="text-white/70 hover:text-white transition-colors duration-200"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
          
          {/* Chatbot Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3">
            <div className="bg-gray-100 rounded-xl p-3 max-w-xs">
              <p className="text-gray-800">Hello! How can I help you with art law today?</p>
            </div>
          </div>
          
          {/* Chatbot Input Area */}
          <div className="border-t border-gray-200 p-4 bg-white/50">
            <div className="flex rounded-lg overflow-hidden border border-gray-300 focus-within:ring-2 focus-within:ring-black focus-within:border-transparent transition-all duration-200">
              <input
                type="text"
                placeholder="Type your question..."
                className="flex-1 px-4 py-2 focus:outline-none bg-transparent"
              />
              <button className="bg-black text-white px-4 py-2 hover:bg-gray-800 transition-colors duration-200">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 2L11 13M22 2L15 22L11 13M11 13L2 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">
              Ask me anything about art law, copyright, or legal issues for artists.
            </p>
          </div>
        </div>
      </div>

      {/* CSS for 3D Cube Animation */}
      <style jsx>{`
        .cube-container {
          width: 250px;
          height: 250px;
          perspective: 1000px;
        }

        .cube {
          width: 100%;
          height: 100%;
          position: relative;
          transform-style: preserve-3d;
          animation: rotateCube 15s infinite linear;
        }

        .face {
          position: absolute;
          width: 250px;
          height: 250px;
          background: linear-gradient(45deg, #3b82f6, #1e40af, #1d4ed8);
          border: 2px solid #1e40af;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: Arima, sans-serif;
          box-shadow: 0 0 20px rgba(59, 130, 246, 0.3);
        }

        .face.front {
          transform: translateZ(125px);
        }

        .face.back {
          transform: rotateY(180deg) translateZ(125px);
        }

        .face.right {
          transform: rotateY(90deg) translateZ(125px);
        }

        .face.left {
          transform: rotateY(-90deg) translateZ(125px);
        }

        .face.top {
          transform: rotateX(90deg) translateZ(125px);
        }

        .face.bottom {
          transform: rotateX(-90deg) translateZ(125px);
        }

        @keyframes rotateCube {
          0% { transform: rotateX(0deg) rotateY(0deg); }
          16.66% { transform: rotateX(0deg) rotateY(90deg); }
          33.33% { transform: rotateX(0deg) rotateY(180deg); }
          50% { transform: rotateX(0deg) rotateY(270deg); }
          66.66% { transform: rotateX(90deg) rotateY(270deg); }
          83.33% { transform: rotateX(180deg) rotateY(270deg); }
          100% { transform: rotateX(360deg) rotateY(360deg); }
        }

        @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.7; transform: scale(1.15); }
      }

        .cube:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default HomePage;
