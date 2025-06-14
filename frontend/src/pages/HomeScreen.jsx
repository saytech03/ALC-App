import { useState} from 'react';
import { ChevronRight, Users, BookOpen, FileText, MessageCircle, Scale, Palette, Shield, Globe } from 'lucide-react';
import Navbar from '../components/Navbar';

const HomeScreen = () => {
  const [email, setEmail] = useState('');
  const [imgLoading, setImgLoading] = useState(true);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

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
    <div className="relative bg-white min-h-screen" style={{fontFamily: 'Arima, sans-serif'}}>
      {/* Navbar */}
      <Navbar/>
      {/* COOL OPTIMIZATION HACK FOR IMAGES */}
				{imgLoading && (
					<div className='absolute top-0 left-0 w-full h-full bg-black/70 flex items-center justify-center shimmer -z-10' />
				)}
      {/* Hero Section */}
      <div 
        className="relative flex flex-col items-center justify-center text-center py-20 pt-32 min-h-screen bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('./hero_.png')` // Replace YOUR_IMAGE_URL_HERE with your actual image URL
        }}
      >
        {/* Blue Overlay */}
        <div className="absolute inset-0 bg-blue-900/70"></div>
        
        {/* Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white drop-shadow-lg">
            Navigating Legal Complexities 
          </h1>
          <p className="text-lg md:text-xl mb-6 text-white/90 max-w-3xl drop-shadow-md">
           Helping galleries and institutions understand the intersection of art and law.
          </p>

          <div className="flex flex-col md:flex-row gap-4 w-full max-w-md">
            
            <button 
              onClick={handleFormSubmit}
              className="bg-blue-200 hover:bg-blue-400 text-black text-lg px-6 py-3 rounded-lg flex justify-center items-center transition-colors shadow-lg"
            >
              Get Started
              <ChevronRight className="w-5 h-5 ml-2" />
            </button>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900">
                  Empowering Artists Legally
                </h2>
                <p className="text-lg text-gray-700 mb-6 max-w-lg">
                  Our mission is to provide a platform for artists and legal experts to engage in meaningful discussions, enhancing artistic freedom and protecting intellectual property in the vibrant cultural landscape of India.
                </p>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg transition-colors font-semibold">
                  Learn More
                </button>
              </div>
              
              {/* Stats */}
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-black text-white rounded-full w-16 h-16 flex items-center justify-center font-bold text-xl shrink-0">
                    500
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Artists Supported</h3>
                    <p className="text-gray-600">
                      We have successfully supported over 500 artists in understanding their legal rights and navigating complex regulations.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-black text-white rounded-full w-16 h-16 flex items-center justify-center font-bold text-xl shrink-0">
                    20
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Workshops Held</h3>
                    <p className="text-gray-600">
                      The Art Law Communion has organized 20 informative workshops aimed at educating artists and institutions about art law.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-black text-white rounded-full w-16 h-16 flex items-center justify-center font-bold text-xl shrink-0">
                    1000
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Resources Provided</h3>
                    <p className="text-gray-600">
                      We have distributed over 1000 resources, including guides and toolkits, to assist stakeholders in the art community.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right Image */}
            <div className="relative">
              <img 
                src="./lib.png" 
                alt="Artist portrait"
                className="w-140 h-140 rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Why Art Law Section */}
      <div className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            {/* Left Card - Why Art Law */}
            <div className="bg-blue-200 p-4 rounded-lg max-h-80 flex flex-col justify-center">
              <h2 className="text-xl md:text-2xl font-bold mb-3 text-gray-900">Why Art Law?</h2>
              <p className="text-gray-700 mb-3 text-xs leading-relaxed">
                Discover how Art Law Communion empowers artists and institutions by bridging the gap between legal knowledge and creative expression in the arts.
              </p>
              <button className="bg-blue-400 hover:bg-blue-500 text-white px-3 py-1.5 rounded-lg transition-colors text-xs w-fit">
                Learn More
              </button>
            </div>

            {/* Right Image */}
            <div className="flex items-center justify-center bg-gray-100 rounded-lg min-h-[500px]">
              <img 
                src="./question.png" 
                alt="Question marks design"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Why Choose Us Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-black-600">Why Choose Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <Shield className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Expert Legal Guidance</h3>
              <p className="text-gray-600">
                Expert legal guidance tailored specifically for artists and cultural professionals navigating complex legal landscapes.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <Users className="w-12 h-12 text-red-700 mb-4" />
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Collaborative Workshops</h3>
              <p className="text-gray-600">
                Interdisciplinary workshops and seminars foster vital dialogue between artists and legal experts, enhancing collective knowledge.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <Globe className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Supportive Community</h3>
              <p className="text-gray-600">
                A supportive community that encourages collaboration among artists, galleries, collectors, and legal professionals in the arts sector.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <FileText className="w-12 h-12 text-red-700 mb-4" />
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Comprehensive Resources</h3>
              <p className="text-gray-600">
                Access to a wealth of information on art law issues, empowering individuals to make informed decisions in the creative field.
              </p>
            </div>
          </div>
        </div>
      </div>

     {/* Services Section */}
      <div className="py-16 bg-gradient-to-br from-blue-100 to-cyan-100">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">Our Services</h2>
            <p className="text-lg text-gray-700 max-w-4xl mx-auto">
              Our services are customized to meet your unique financial needs. We offer real-time tracking, personalized budgeting, automated expense management, and detailed reporting.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <FileText className="w-8 h-8 text-pink-500" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900 text-center">Legal Advisory</h3>
              <p className="text-gray-600 text-sm text-center">
                We provide expert legal advice tailored to artists and cultural institutions on their rights and obligations.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <FileText className="w-8 h-8 text-pink-500" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900 text-center">Workshops</h3>
              <p className="text-gray-600 text-sm text-center">
                Our interactive workshops educate participants about art law, fostering practical skills and knowledge.
              </p>
            </div>
            
            
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <FileText className="w-8 h-8 text-pink-500" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900 text-center">Consultations</h3>
              <p className="text-gray-600 text-sm text-center">
                Personalized consultations help artists and galleries resolve specific legal challenges and develop strategies.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <FileText className="w-8 h-8 text-pink-500" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900 text-center">Resources</h3>
              <p className="text-gray-600 text-sm text-center">
                We offer a wealth of resources including guides, articles, and templates for navigating art-related legal issues.
              </p>
            </div>
            
          </div>
         
            <div className="flex justify-center items-center">
              <img 
                src="./yellowabs.png" 
                alt="Yellow design"
                className="w-80 h-80 object-cover justify-center rounded-lg"
              />
            </div>
          
          <div className="text-center mt-12">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
              View All
            </button>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default HomeScreen;