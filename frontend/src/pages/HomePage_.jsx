import { useState, useEffect, useRef } from 'react';
import { ChevronRight, ChevronLeft, Users, BookOpen, FileText, MessageCircle, Scale, Palette, Shield, Globe, Search, Music, Facebook, Instagram, Youtube } from 'lucide-react';
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
  const [patronId, setPatronId] = useState("user"); // Added for dynamic linking
  const [currentSlide, setCurrentSlide] = useState(0);
  const [visibleCards, setVisibleCards] = useState(1);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

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

  // Array of quotes that will rotate daily
  const testimonials = [
    {
      name: "Debottam Bose",
      title: "India's First Art Lawyer",
      text: "Your collective initiative, ALC is timely and valuable - India's growing art market with jaw dropping auction prices in one hand and brazen fakes & forgeries market in another hand desperately need specialized legal expertise. You are filling a critical gap in the legal & cultural ecosystem.",
      initial: "DB",
      image: "/Debottam_test.jpeg" // replace with Debottam's image path
    },
    {
      name: "Dr. (Prof). Somabha Bandopadhyay",
      title: "Asst. Professor, Dept. of Law, NFSU, Delhi",
      text: "ALC is an initiative that bridges the law and society. It is indeed a timely initiative at a juncture that very rarely has been explored in India. The best part about this initiative is that it is student led, which means that there is a lot of passion and zeal to work and contribute meaningfully. I sincerely hope that ALC has a wonderful journey connecting all different stakeholders of the legal and artistic fraternity and helps those at the grassroots and otherwise. I wish them all the very best in each of their endeavours.",
      initial: "SB",
      image: "/Somabha_test.jpeg" // replace with Somabha's image path
    },
    {
      name: "Dr. Subha Majumdar",
      title: "Superintending Archaeologist (ASI), Vadodara Circle",
      text: "In search of objectivity, Art Law Communion emerges as a space of inquiry and dialogue. It approaches art, heritage and law not as rigid disciplines, but as evolving conversations shaped by ethics, context, and care. It is a rare initiative that invites thought before opinion.",
      initial: "SM",
      image: "/Subha_test.jpeg" // replace with Subha's image path
    },
    {
      name: "Dr. Arshiya Sethi",
      title: "Founder, Kri Foundation & Co-founder, Unmute.help",
      text: "I am very happy to learn about this student-led initiative, Art Law Communion, which looks at the intersection of Law and Art in the Global South. I do believe that COVID-19 changed things around and made us realise that there is more to the arts than production, presentation, and performance. I wish the founders the very best and look forward to inclusive articles that will help move the discourse in the right direction in our art- and culture-rich region.",
      initial: "AS",
      image: "/Arshiya_test.jpeg" // replace with Arshiya's image path
    },
    {
      name: "Mr. Chandril Chattopadhyay",
      title: "Managing Partner, CPC Satya Inc. Law Chambers",
      text: "It is with immense pleasure that I take this opportunity to congratulate Priyanshu and his team for bringing out this one of a kind newsletter. As Art Law navigates through the stage of nascent blooming to a global stage that commands a spotlight of its own, ALC's newsletter marks a path of its own that shall help students to understand the various aspects of art law and keep the handful of practitioners in this space equipped with the developments. I wish them luck for bigger projects, collaborative practices across interdisciplinary medium of art, literature and law and I wish that the journey of ALC runs long, embedded and sublime like Mark Rothko's colour palette.",
      initial: "CC",
      image: "/Chandril_test.jpeg" // replace with Chandril's image path
    }
  ];

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
    },
    {
       text: "Like	law,	art	was	once	a	rule-based	activity.	In	classical	antiquity,	the	word	'art'	(Greek,'tekne',	Latin,	'ars')	was	the	name	given	to	any	activity	governed	by	rules.",
       author: "Paul Kearns"
    },
    {
      text: "The artist must be not merely creator but also conjurer. Art, by its very nature, is illusion.",
      author: "Jessica Daraby"
    }
  ];

  useEffect(() => {
    const today = new Date();
    const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
    const quoteIndex = dayOfYear % quotes.length;
    setDailyQuote(quotes[quoteIndex]);
  }, []);

  // Handle responsive visible cards count
  useEffect(() => {
    const updateVisibleCards = () => {
      if (window.innerWidth >= 1024) setVisibleCards(3);
      else if (window.innerWidth >= 768) setVisibleCards(2);
      else setVisibleCards(1);
    };
    updateVisibleCards();
    window.addEventListener('resize', updateVisibleCards);
    return () => window.removeEventListener('resize', updateVisibleCards);
  }, []);

  const totalDots = Math.max(1, testimonials.length - visibleCards + 1);

  // Clamp currentSlide when visibleCards changes
  useEffect(() => {
    if (currentSlide >= totalDots) {
      setCurrentSlide(totalDots - 1);
    }
  }, [totalDots, currentSlide]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalDots);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalDots) % totalDots);
  };

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
        
        {/* CTA Buttons */}
        <div className="pt-8 flex flex-wrap justify-center gap-4">
          <Link
            to="https://forms.gle/sU34TSnJWsmNNM3E8"
            className="inline-block bg-gray-800 hover:bg-black text-white px-8 py-4 text-lg font-medium rounded-lg transition-colors duration-200"
          >
            Write To Us
          </Link>
          <Link
            to={`/${patronId}/blog`}
            className="inline-block bg-gray-800 hover:bg-black text-white px-8 py-4 text-lg font-medium rounded-lg transition-colors duration-200"
          >
            Contribute to our Blog - ALC Fenestra
          </Link>
        </div>
      </div>

      {/* ===== Testimonials Section — Glass Transparent ===== */}
      <div className="w-full py-16 md:py-20 relative overflow-hidden">
        {/* Glass background */}
        <div className="absolute inset-0 backdrop-blur-md bg-black/20"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section Title */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">
              Words of Praise from Leaders
            </h2>
            <div className="h-1 w-20 bg-white/60 mx-auto rounded-full"></div>
          </div>

          <div className="relative">
            {/* Carousel Container */}
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * (100 / visibleCards)}%)` }}
              >
                {testimonials.map((testimonial, index) => (
                  <div
                    key={index}
                    className="flex-shrink-0 px-3"
                    style={{ width: `${100 / visibleCards}%` }}
                  >
                    <div className="h-full backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-8 flex flex-col justify-between hover:bg-white/15 transition-all duration-300 shadow-lg shadow-black/10">
                      <div>
                        {/* Quote Icon */}
                        <div className="text-white/50 mb-5">
                          <svg width="36" height="36" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
                          </svg>
                        </div>

                        {/* Testimonial Text */}
                        <p className="text-white/90 text-sm md:text-base leading-relaxed mb-6 font-light">
                          "{testimonial.text}"
                        </p>
                      </div>

                      {/* Profile Section */}
                      <div className="flex items-center gap-4 pt-5 border-t border-white/15">
                        <div className="h-12 w-12 overflow-hidden rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white font-semibold text-base border border-white/30 flex-shrink-0">
                          {testimonial.image ? (
                            <img
                              src={testimonial.image}
                              alt={testimonial.name}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <span>{testimonial.initial}</span>
                          )}
                        </div>
                        <div className="min-w-0">
                          <h4 className="text-white font-semibold text-sm md:text-base line-clamp-2">
                            {testimonial.name}
                          </h4>
                          <p className="text-white/60 text-xs md:text-sm line-clamp-3">
                            {testimonial.title}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Desktop Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 md:-translate-x-14 backdrop-blur-sm bg-white/10 hover:bg-white/25 text-white p-3 rounded-full border border-white/20 transition-all duration-200 z-10 hidden md:flex items-center justify-center"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={22} />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 md:translate-x-14 backdrop-blur-sm bg-white/10 hover:bg-white/25 text-white p-3 rounded-full border border-white/20 transition-all duration-200 z-10 hidden md:flex items-center justify-center"
              aria-label="Next testimonial"
            >
              <ChevronRight size={22} />
            </button>
          </div>

          {/* Mobile Navigation Arrows */}
          <div className="flex justify-center gap-4 mt-8 md:hidden">
            <button
              onClick={prevSlide}
              className="backdrop-blur-sm bg-white/10 hover:bg-white/25 text-white p-3 rounded-full border border-white/20 transition-all duration-200"
            >
              <ChevronLeft size={22} />
            </button>
            <button
              onClick={nextSlide}
              className="backdrop-blur-sm bg-white/10 hover:bg-white/25 text-white p-3 rounded-full border border-white/20 transition-all duration-200"
            >
              <ChevronRight size={22} />
            </button>
          </div>

          {/* Dots Indicator — Correctly calculated */}
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: totalDots }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  idx === currentSlide
                    ? 'w-8 bg-white/80'
                    : 'w-2 bg-white/30 hover:bg-white/50'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
        
      </div>

      {/* Simplistic Magnifying Glass Icon (Redirects to AI Chat) */}
      { /*
      <Link 
        to={`/${patronId}/ai/chat`}
        className="fixed bottom-8 right-8 bg-white/90 hover:bg-white text-black p-4 rounded-full shadow-lg transition-all duration-300 z-50 flex items-center justify-center border border-gray-200"
        title="Search Art Law AI"
      >
        <Search size={24} strokeWidth={2} />
      </Link>
      */ }
    </div>
  );
};

export default HomePage_;