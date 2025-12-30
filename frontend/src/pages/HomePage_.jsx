import { useState, useEffect, useRef } from 'react';
import { ChevronRight, Users, BookOpen, FileText, MessageCircle, Scale, Palette, Shield, Globe, Search, Music, Facebook, Instagram, Youtube } from 'lucide-react';
import AltNavbar from '../components/AltNavbar';
import { Link } from "react-router-dom";

const HomePage_ = () => {
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

  useEffect(() => {
    const today = new Date();
    const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
    const quoteIndex = dayOfYear % quotes.length;
    setDailyQuote(quotes[quoteIndex]);
  }, []);

  return (
    <div 
      className="min-h-screen py-20 px-8 relative home-bg" 
    >
      <AltNavbar />

      {/* Main Centered Content — Font Style 100% Preserved, Only Sizes Reduced */}
      <div className="max-w-4xl mx-auto space-y-12 py-20 px-8 flex flex-col justify-center items-center text-center">

        {/* Daily Quote — Same italic, font-light, tracking — just smaller */}
        <div className="px-4">
          <blockquote className="text-xl sm:text-2xl md:text-3xl lg:text-4xl italic font-serif text-white mb-6 leading-relaxed font-light tracking-wide">
            "{dailyQuote.text}"
          </blockquote>
          <cite className="block text-lg sm:text-xl md:text-2xl font-serif text-white font-medium tracking-wide">
            — {dailyQuote.author}
          </cite>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center backdrop-blur-sm bg-black/30 p-6 md:p-8 rounded-lg">
        {/* Main Title — Same bold, tight tracking — just smaller */}
        <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-light tracking-wide mb-6 md:mb-8">
          Empowering Artists Legally
        </h1>

        {/* Description — Same font-light, relaxed leading — just readable size */}
        <p className="space-y-4 md:space-y-6 text-base md:text-lg text-white">
          Our mission is to provide a platform for building discourse on Art Law in India and the Global South for serving artists, lawyers, and students of both law and art disciplines, including art market professionals and members of the general public. Importantly, we will attempt to bridge the gap between the artistic and legal community.
        </p>
          </div>
        </div>
        {/* CTA Button — Same style, just comfortable size */}
        <div className="pt-8">
          <Link
            to="https://forms.gle/sU34TSnJWsmNNM3E8"
            className="inline-block bg-gray-800 hover:bg-black text-white px-8 py-4 text-lg font-medium rounded-lg transition-colors duration-200"
          >
            Contact Us
          </Link>
        </div>
      </div>

      {/* Chatbot Sidebar — Completely unchanged */}
      <div
        ref={chatSidebarRef}
        className={`fixed inset-y-0 right-0 w-full sm:w-80 md:w-96 bg-white/95 backdrop-blur-lg shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${showChatbot ? 'translate-x-0' : 'translate-x-full'} border-l border-gray-200`}
      >
        <div className="h-full flex flex-col">
          <div className="bg-black text-white p-4 sm:p-5 flex justify-between items-center border-b border-gray-700">
            <h3 className="text-base sm:text-lg font-medium tracking-tight">Art Law Assistant</h3>
            <button onClick={() => setShowChatbot(false)} className="text-white/70 hover:text-white">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
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

export default HomePage_;