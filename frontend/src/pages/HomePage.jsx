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

  // Array of quotes that will rotate daily
  const quotes = [
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
      author: " Hawkins"
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
    },
    {
       text: "Art is not a mirror to reflect reality, but a hammer with which to shape it.",
       author: "Bertolt Brecht"
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

    console.log(`Searching for: ${searchQuery}`);
    setSongs([
      { id: 1, title: `${searchQuery} Song 1`, artist: 'Artist 1', url: 'https://example.com/song1.mp3' },
      { id: 2, title: `${searchQuery} Song 2`, artist: 'Artist 2', url: 'https://example.com/song2.mp3' },
      { id: 3, title: `${searchQuery} Song 3`, artist: 'Artist 3', url: 'https://example.com/song3.mp3' },
    ]);
  };

  const playSong = (song) => {
    setCurrentSong(song);
    setIsPlaying(true);
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
    <div className="relative bg-white min-h-screen" style={{ fontFamily: 'Helvetica Neue, sans-serif' }}>
      {/* Navbar */}
      {imgLoading && (
        <div className="absolute top-0 left-0 w-full h-full bg-black/70 flex items-center justify-center shimmer -z-10" />
      )}
      <Navbar />

      {/* Top Section */}
      <div
        className={`relative flex flex-col items-center justify-center text-center py-16 sm:py-20 pt-24 sm:pt-32 min-h-screen bg-cover bg-no-repeat ${bgPosition}`}
        style={{
          backgroundImage: `url('./mem.jpg')`,
          filter: 'brightness(0.9) contrast(1.1)',
        }}
      >
        {/* Main Content Container with Blur */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="backdrop-blur-md bg-black/40 p-8 sm:p-10 md:p-12 lg:p-16 rounded-xl border border-white/10 w-full max-w-6xl">
            {/* Quote Section */}
            <div className="mb-12 sm:mb-16 md:mb-20 text-center px-4 sm:px-6">
              <blockquote className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl italic font-serif text-white mb-4 sm:mb-6 max-w-4xl mx-auto leading-relaxed font-light">
                "{dailyQuote.text}"
              </blockquote>
              <cite className="text-sm sm:text-base md:text-xl lg:text-2xl font-serif text-white font-medium tracking-wide">
                - {dailyQuote.author}
              </cite>
            </div>

            {/* Empowering Artists Section */}
            <div className="text-center">
              <div className="space-y-8 sm:space-y-10 md:space-y-12 lg:space-y-14">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 text-white leading-tight tracking-tight">
                  Empowering Artists Legally
                </h1>
                <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/90 leading-relaxed font-light max-w-2xl mx-auto">
                  Our mission is to provide a platform for building discourse on Art Law
                  for serving artists, lawyers, and students of both law and art
                  disciplines, including art market professionals and members of the
                  general public. Importantly, this communion will attempt to bridge
                  the gap between the artistic and legal community.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div
        className="relative py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gray-100"
        style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url('./brown_waves.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        filter: 'brightness(0.8) contrast(1.1)',
      }}
      >
       <div className="max-w-7xl mx-auto text-center">
        <div className="space-y-8 sm:space-y-10 md:space-y-12">
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white leading-relaxed font-light max-w-2xl mx-auto">
           Interested In Art and Art Law? Write to us what you think!
          </p>
          <Link
            to="/contact"
            className="inline-block bg-yellow-400 text-gray-900 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-medium rounded-lg hover:bg-yellow-500 transition-colors duration-200"
          >
            Submit your question
          </Link>
        </div>
      </div>
      </div>

      {/* Chatbot Sidebar with click-outside detection */}
      <div
        ref={chatSidebarRef}
        className={`fixed inset-y-0 right-0 w-full sm:w-80 md:w-96 bg-white/95 backdrop-blur-lg shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${showChatbot ? 'translate-x-0' : 'translate-x-full'} border-l border-gray-200`}
      >
        <div className="h-full flex flex-col">
          {/* Chatbot Header */}
          <div className="bg-black text-white p-4 sm:p-5 flex justify-between items-center border-b border-gray-700">
            <h3 className="text-base sm:text-lg font-medium tracking-tight">Art Law Assistant</h3>
            <button
              onClick={() => setShowChatbot(false)}
              className="text-white/70 hover:text-white transition-colors duration-200"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          {/* Chatbot Input Area */}
          <div className="border-t border-gray-200 p-4 sm:p-5 bg-white/50">
            <div className="flex rounded-lg overflow-hidden border border-gray-300 focus-within:ring-2 focus-within:ring-black focus-within:border-transparent transition-all duration-200">
              <input
                type="text"
                placeholder="Type your question..."
                className="flex-1 px-3 sm:px-4 py-2 text-sm sm:text-base focus:outline-none bg-transparent"
              />
              <button className="bg-black text-white px-3 sm:px-4 py-2 hover:bg-gray-800 transition-colors duration-200">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 2L11 13M22 2L15 22L11 13M11 13L2 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
            <p className="text-xs sm:text-sm text-gray-500 mt-2 text-center">
              Ask me anything about art law, copyright, or legal issues for artists.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;