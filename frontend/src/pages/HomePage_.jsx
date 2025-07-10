import { useState, useEffect} from 'react'; 
import { ChevronRight, Users, BookOpen, FileText, MessageCircle, Scale, Palette, Shield, Globe } from 'lucide-react'; 
import AltNavbar from '../components/AltNavbar';
import { Link } from "react-router-dom";

const HomePage_ = () => {
  const [email, setEmail] = useState('');
  const [imgLoading, setImgLoading] = useState(true);
  const [dailyQuote, setDailyQuote] = useState({ text: '', author: '' });
     
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

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
    // Handle form submission here
  };
    
  return (
    <div className="relative bg-white min-h-screen" style={{fontFamily: 'Helvetica Neue, sans-serif'}}>
      {/* Navbar */}
      <AltNavbar/>
      
      {/* COOL OPTIMIZATION HACK FOR IMAGES */}
      {imgLoading && (
        <div className='absolute top-0 left-0 w-full h-full bg-black/70 flex items-center justify-center shimmer -z-10' />
      )}

      {/* Hero Section */}
      <div 
        className="relative flex flex-col items-center justify-center text-center py-20 pt-32 min-h-screen bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('./gallery_.jpeg')` // Replace YOUR_IMAGE_URL_HERE with your actual image URL
        }}
      >
        {/* pink Overlay */}
        <div className="absolute inset-0 bg-pink-200/50"></div>
                
        {/* Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-4">
          {/* Quote Section */}
          <div className="mb-16 text-center">
            <blockquote className="text-2xl md:text-3xl italic font-serif text-black mb-6 max-w-4xl mx-auto leading-relaxed" style={{fontFamily: 'Playfair Display, serif'}}>
              "{dailyQuote.text}"
            </blockquote>
            <cite className="text-xl md:text-2xl font-serif text-black" style={{fontFamily: 'Playfair Display, serif'}}>
              - {dailyQuote.author}
            </cite>
          </div>

          {/* Main Content Grid */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Side - Text Content */}
            <div className="text-left">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-black" style={{fontFamily: 'Arial, sans-serif'}}>
                Empowering<br/>
                Artists<br/>
                Legally
              </h1>
              <p className="text-lg text-black mb-8 leading-relaxed">
                Our mission is to provide a platform for building discourse on Art Law 
                for serving artists, lawyers, and students of both law and art 
                disciplines, including art market professionals and members of the 
                general public. Importantly, this communion will attempt to bridge 
                the gap between the artistic and the legal community.
              </p>
            </div>

            {/* Right Side - 3D Animated Cube */}
            <div className="flex justify-center md:justify-end">
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

      {/* CSS for 3D Cube Animation */}
      <style jsx>{`
        .cube-container {
          width: 300px;
          height: 300px;
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
          width: 300px;
          height: 300px;
          background: linear-gradient(45deg, #3b82f6, #1e40af, #1d4ed8);
          border: 2px solid #1e40af;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: Arial, sans-serif;
          box-shadow: 0 0 20px rgba(59, 130, 246, 0.3);
        }

        .face.front {
          transform: translateZ(150px);
        }

        .face.back {
          transform: rotateY(180deg) translateZ(150px);
        }

        .face.right {
          transform: rotateY(90deg) translateZ(150px);
        }

        .face.left {
          transform: rotateY(-90deg) translateZ(150px);
        }

        .face.top {
          transform: rotateX(90deg) translateZ(150px);
        }

        .face.bottom {
          transform: rotateX(-90deg) translateZ(150px);
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

        .cube:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default HomePage_;