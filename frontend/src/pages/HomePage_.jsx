import { useState, useEffect} from 'react'; 
import { ChevronRight, Users, BookOpen, FileText, MessageCircle, Scale, Palette, Shield, Globe, Search } from 'lucide-react'; 
import AltNavbar from '../components/AltNavbar';
import { Link } from "react-router-dom";

const HomePage_ = () => {
  const [email, setEmail] = useState('');
  const [imgLoading, setImgLoading] = useState(true);
  const [dailyQuote, setDailyQuote] = useState({ text: '', author: '' });
   const [showChatbot, setShowChatbot] = useState(false);
     
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

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
      {imgLoading && (
          <div className='absolute top-0 left-0 w-full h-full bg-black/70 flex items-center justify-center shimmer -z-10' />
        )}
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
{/* Magnifying Glass Icon - Only shown when chatbot is closed */}
      {!showChatbot && (
        <div className="fixed bottom-10 right-10 z-40">
          <button 
            onClick={() => setShowChatbot(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg transition-all duration-300 hover:scale-110"
            aria-label="Open chatbot"
          >
            <Search size={24} />
          </button>
        </div>
      )}

      {/* Chatbot Sidebar */}
      <div className={`fixed inset-y-0 right-0 w-96 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${showChatbot ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="h-full flex flex-col">
          {/* Chatbot Header */}
          <div className="bg-blue-600 text-white p-4 flex justify-between items-center">
            <h3 className="text-xl font-bold">Art Law Assistant</h3>
            <button 
              onClick={() => setShowChatbot(false)}
              className="text-white hover:text-gray-200 text-2xl"
            >
              &times;
            </button>
          </div>
          
          {/* Chatbot Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto">
            <div className="bg-gray-100 rounded-lg p-3 mb-3 max-w-xs">
              <p>Hello! How can I help you with art law today?</p>
            </div>
          </div>
          
          {/* Chatbot Input Area */}
          <div className="border-t p-4">
            <div className="flex">
              <input
                type="text"
                placeholder="Type your question..."
                className="flex-1 border rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700">
                Send
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Ask me anything about art law, copyright, or legal issues for artists.
            </p>
          </div>
        </div>
      </div>

      

      {/* CSS for 3D Cube Animation */}
       <style jsx>{`
        .cube-container {
          width: 250px; /* Changed from 300px */
          height: 250px; /* Changed from 300px */
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
          width: 250px; /* Changed from 300px */
          height: 250px; /* Changed from 300px */
          background: linear-gradient(45deg, #3b82f6, #1e40af, #1d4ed8);
          border: 2px solid #1e40af;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: Arima, sans-serif;
          box-shadow: 0 0 20px rgba(59, 130, 246, 0.3);
        }

        .face.front {
          transform: translateZ(125px); /* Changed from 150px */
        }

        .face.back {
          transform: rotateY(180deg) translateZ(125px); /* Changed from 150px */
        }

        .face.right {
          transform: rotateY(90deg) translateZ(125px); /* Changed from 150px */
        }

        .face.left {
          transform: rotateY(-90deg) translateZ(125px); /* Changed from 150px */
        }

        .face.top {
          transform: rotateX(90deg) translateZ(125px); /* Changed from 150px */
        }

        .face.bottom {
          transform: rotateX(-90deg) translateZ(125px); /* Changed from 150px */
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