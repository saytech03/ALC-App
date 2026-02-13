import { useState, useEffect } from 'react';
import { ArrowRight, Calendar, User, Clock, Repeat, Heart, MessageCircle, TrendingUp, Star, ChevronRight, Tag, ChevronLeft, ExternalLink, Lock, FileText, CheckCircle, AlertCircle } from 'lucide-react';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

const Blog = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [popularSlideIndex, setPopularSlideIndex] = useState(0);
  const [imgLoading, setImgLoading] = useState(true);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const navigate = useNavigate();

  // Blog data (same as Blogspot)
  const blogPosts = [
    {
      id: 1,
      title: "How A Bird Transformed Art Law Forever: The Brâncuși vs. United States Case",
      author: "Priyanshu Kar",
      introduction: "In 1926, Constantin Brâncuși's abstract sculpture 'Bird in Space' was seized by U.S. customs officials who refused to recognize it as art, leading to a landmark legal battle that would forever change how courts define artistic expression and reshape the boundaries of modern art.",
      category: "ART LAW",
      date: "June 3, 2025",
      readTime: "12 min read",
      reposts: "4",
      comments: 0,
      reactions: 5,
      likes: 5,
      popularity: 99,
      featured: true,
      realUrl: "https://substack.com/@artlawcommunion/note/p-165113912?r=5s5n5l",
      image: "./birlawabs.png",
      subheadings: [
        "The Customs Controversy: When Art Becomes 'Metal Manufacture'",
        "The Legal Battle: Defining Art in Court",
        "Expert Testimony and Artistic Recognition",
        "The Verdict That Changed Everything",
        "Legacy and Impact on Modern Art Law"
      ]
    },
    {
      id: 2,
      title: "Suppression of Vice: The Tussle Between Artistic Freedom and Moral Policing",
      author: "Aritro Banerjee",
      introduction: "From colonial courtrooms to today's digital platforms, the battle between artistic freedom and moral policing rages on. This examination of censorship's evolution reveals how laws designed to protect 'public morality' have consistently been weaponized against creative expression, from the trials of Ismat Chughtai and Saadat Hasan Manto to modern content moderation policies.",
      category: "ART LAW",
      date: "July 9, 2025",
      readTime: "18 min read",
      reposts: "1",
      comments: 0,
      reactions: 3,
      likes: 3,
      popularity: 98,
      featured: false,
      realUrl: "https://open.substack.com/pub/artlawcommunion/p/suppression-of-vice?utm_source=share&utm_medium=android&r=5s5n5l",
      image: "./tree_blog.png",
      subheadings: [
        "The Myth of Virtuosity: Chughtai and Manto on Trial",
        "The Mark of Obscenity: 300 Years of Legal Battles",
        "From Hicklin to Miller: The Evolution of Obscenity Tests",
        "India's Colonial Legacy in Censorship",
        "Landmark Cases: Udeshi, Bandit Queen, and Beyond"
      ]
    },
      {
        id: 3,
        title: "The House That Clive Did Not Build",
        author: "Priyanshu Kar",
        introduction: "The Clive House in London stands as a testament to colonial wealth, but its true origins reveal a more complex story of appropriation and legal maneuvering that challenges traditional notions of ownership and cultural heritage in art and architecture.",
        category: "ART LAW",
        date: "August 3, 2025",
        readTime: "15 min read",
        reposts: "1",
        comments: 0,
        reactions: 1,
        likes: 1,
        popularity: 96,
        featured: false,
        realUrl: "https://open.substack.com/pub/artlawcommunion/p/the-house-that-clive-did-not-build?r=5s5n5l&utm_campaign=post&utm_medium=web&showWelcomeOnShare=true",
        image: "./clivehouse.png",
        subheadings: [
          "The Illusion of Creation: Clive's 'Architectural Vision'",
          "Deconstructing the Provenance: Tracing the True Builders",
          "Legal Alchemy: How Plunder Became Property",
          "The Silent Witnesses: Artifacts That Tell Another Story",
          "Contemporary Reckonings: The House in Modern Legal Context"
        ]
    },
    {
      id: 4,
      title: "Anklets of Oppression: The Fight against Sexual Harassment in India's Classical Dance Community",
      author: "Ishika Hazra and Auronisha Roy",
      introduction: "Existing jurisprudence has long neglected the plight of female dancers in the Indian classical dance community who face sexual harassment. This must stop giving way to deliberation and understanding.",
      category: "ART LAW",
      date: "August 3, 2025",
      readTime: "15 min read",
      reposts: "1",
      comments: 0,
      reactions: 1,
      likes: 1,
      popularity: 97,
      featured: false,
      realUrl: "https://open.substack.com/pub/artlawcommunion/p/anklets-of-oppression-the-fight-against?r=5s5n5l&utm_campaign=post&utm_medium=web&showWelcomeOnShare=true",
      image: "./dance.png",
      subheadings: [
        "International Instances of Sexual Abuse in the Dance Community",
        "History of Female Indian Dancers: From Purity to Prostitution",
        "Can Legal Remedies Effectively Combat Sexual Harassment?",
        "The #MeToo Movement and Its Impact",
        "Navigating Consent in Traditional Dance Settings",
        "Way Forward: Beyond Mechanical Legislation"
      ]
  },
  {
      id: 5,
      title: "Digitising Tribal Art Archives in India: Consent, Ownership, and the Problem of Data Colonialism",
      author: "Divija Manaktala",
      introduction: "The digitisation of tribal and indigenous art across India takes many forms, ranging from Gond paintings and Warli murals to ritual performances and oral narratives documented by museums, universities, individual collectors, and other cultural institutions around the world. Digitisation is discussed as a harmless preservation process2 aimed at protecting against cultural loss and material degradation. Nevertheless, in cases where tribal art is uploaded into digital collections without any substantive permission or benefit-sharing, preservation starts to seem like extraction.",
      category: "TRIBAL RIGHTS",
      date: "February 3, 2026",
      readTime: "5 min read",
      reposts: "1",
      comments: 0,
      reactions: 1,
      likes: 1,
      popularity: 92,
      featured: false,
      realUrl: "https://substack.com/@artlawcommunion/note/c-209218438?r=5s5n5l",
      image: "./thaler.webp", 
      subheadings: [
        "Data Colonialism in the Digitisation of Indigenous Art",
        "The Absence of Community Consent and Benefit-Sharing",
        "Legal Gaps in Copyright, Constitutional, and Heritage Frameworks",
        "From Extraction to Ethical Preservation"
      ]
    }
  ];

  const categories = ['All', 'ART LAW', 'TRIBAL RIGHTS' ];
  
  // Get featured article (highest popularity)
  const featuredArticle = blogPosts.find(post => post.featured) || blogPosts[0];
  
  // Get popular articles sorted by popularity (top 4 for slider)
  const popularArticles = blogPosts
    .filter(post => !post.featured)
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, 4);

  // Filter articles by category
  const filteredArticles = selectedCategory === 'All' 
    ? blogPosts.filter(post => !post.featured)
    : blogPosts.filter(post => post.category === selectedCategory && !post.featured);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const formatNumber = (num) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  // Function to handle article click
  const handleArticleClick = (article) => {
    setShowLoginModal(true);
  };

  // Slider navigation functions (updated for 4 articles)
  const nextSlide = () => {
    setPopularSlideIndex((prevIndex) => 
      prevIndex >= popularArticles.length - 2 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setPopularSlideIndex((prevIndex) => 
      prevIndex <= 0 ? popularArticles.length - 2 : prevIndex - 1
    );
  };

  const handleLogin = () => {
    navigate('/login');
    setShowLoginModal(false);
  };

  return (
    <div className='min-h-screen w-full ai-bg'>
      {imgLoading && (
        <div className='absolute top-0 left-0 w-full h-full bg-black/70 flex items-center justify-center shimmer -z-10' />
      )}
      
      {/* Navigation Header */}
      <Navbar />
      
      {/* Hero Section with Featured Article */}
      <section className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Featured Article Banner */}
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden mb-16 mt-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              {/* Content Side */}
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <div className="flex items-center space-x-3 mb-6">
                  <span className="bg-red-100 text-red-800 px-4 py-2 rounded-full text-sm font-bold tracking-wide">
                    FEATURED
                  </span>
                 {/* <div className="flex items-center space-x-2 text-orange-600">
                    <TrendingUp className="w-4 h-4" />
                    <span className="text-sm font-semibold">Trending Now</span>
                  </div>*/}
                </div>
                
                <h1 className="text-3xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6">
                  {featuredArticle.title}
                </h1>
                
                <div className="flex items-center space-x-2 mb-4">
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-semibold">
                    {featuredArticle.category}
                  </span>
                  <div className="flex items-center space-x-1">
                    {[...Array(4)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                    <span className="text-sm text-gray-600 ml-2">
                      Popularity: {featuredArticle.popularity}%
                    </span>
                  </div>
                </div>
                
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  {featuredArticle.introduction}
                </p>
                
                {/* Author and Meta Info */}
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-8">
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4" />
                    <span className="font-semibold">{featuredArticle.author}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4" />
                    <span>{featuredArticle.date}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4" />
                    <span>{featuredArticle.readTime}</span>
                  </div>
                </div>
                
                {/* Engagement Stats */}
                <div className="flex items-center space-x-6 mb-8 p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Repeat className="w-5 h-5 text-blue-600" />
                    <span className="font-semibold">{featuredArticle.reposts}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MessageCircle className="w-5 h-5 text-green-600" />
                    <span className="font-semibold">{featuredArticle.comments}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Heart className="w-5 h-5 text-red-600" />
                    <span className="font-semibold">{featuredArticle.likes}</span>
                  </div>
                </div>
                
                <button 
                  onClick={() => handleArticleClick(featuredArticle)}
                  className="inline-flex items-center space-x-3 bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-4 rounded-xl font-bold hover:from-red-700 hover:to-red-800 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl w-fit cursor-pointer"
                >
                  <span>READ FULL ARTICLE</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
              
              {/* Image Side */}
              <div className="relative h-64 lg:h-auto">
                <img
                  src={featuredArticle.image}
                  alt={featuredArticle.title}
                  className="w-full h-full object-cover"
                  onLoad={() => setImgLoading(false)}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                
                {/* Floating Popularity Badge */}
                <div className="absolute top-6 right-6 bg-white/95 backdrop-blur-sm rounded-full p-3 shadow-lg">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-bold text-gray-900">
                      {featuredArticle.popularity}% Popular
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Popular Articles Horizontal Slider */}
          <div className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-white flex items-center space-x-3">
               {/*} <TrendingUp className="w-8 h-8 text-orange-600" />*/}
                <span>Most Popular This Week</span>
              </h2>
              
              {/* Slider Navigation */}
              <div className="flex items-center space-x-3">
                <button
                  onClick={prevSlide}
                  className="p-3 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-gray-50"
                >
                  <ChevronLeft className="w-6 h-6 text-gray-600" />
                </button>
                <span className="text-sm text-gray-600 font-medium">
                  {popularSlideIndex + 1} - {Math.min(popularSlideIndex + 2, popularArticles.length)} of {popularArticles.length}
                </span>
                <button
                  onClick={nextSlide}
                  className="p-3 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-gray-50"
                >
                  <ChevronRight className="w-6 h-6 text-gray-600" />
                </button>
              </div>
            </div>
            
            {/* Slider Container */}
            <div className="relative overflow-hidden">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${popularSlideIndex * 50}%)` }}
              >
                {popularArticles.map((article, index) => (
                  <div key={article.id} className="w-1/2 flex-shrink-0 px-4">
                    <div 
                      className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden h-full cursor-pointer"
                      onClick={() => handleArticleClick(article)}
                    >
                      <div className="relative h-48">
                        <img
                          src={article.image}
                          alt={article.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-4 left-4 bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-xs font-bold">
                          #{index + 1} POPULAR
                        </div>
                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1">
                          <span className="text-xs font-bold text-gray-900">{article.popularity}%</span>
                        </div>
                      </div>
                      
                      <div className="p-6">
                        <div className="flex items-center space-x-2 mb-3">
                          <Tag className="w-4 h-4 text-blue-600" />
                          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-semibold">
                            {article.category}
                          </span>
                        </div>
                        
                        <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2">
                          {article.title}
                        </h3>
                        
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                          {article.introduction}
                        </p>
                        
                        <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                          <span className="font-semibold">{article.author}</span>
                          <span>{article.readTime}</span>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 text-xs">
                            <span className="flex items-center space-x-1">
                              <Repeat className="w-3 h-3" />
                              <span>{formatNumber(parseInt(article.reposts))}</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <MessageCircle className="w-3 h-3" />
                              <span>{article.comments}</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <Heart className="w-3 h-3" />
                              <span>{article.likes}</span>
                            </span>
                          </div>
                          
                          <ArrowRight className="w-5 h-5 text-blue-600" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* === SUBMISSION GUIDELINES SECTION === */}
          <div className="mb-16 bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
            <div className="bg-blue-900 p-6 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <FileText className="w-8 h-8 text-blue-300" />
                <h2 className="text-2xl font-bold text-white">Submission Guidelines</h2>
              </div>
              <span className="bg-blue-800 text-blue-200 px-3 py-1 rounded-full text-sm font-semibold">
                Rolling Basis
              </span>
            </div>
            
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                    Key Requirements
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start text-sm text-gray-700">
                      <div className="min-w-6 font-bold text-blue-600">1.</div>
                      <span>Word count: 1,000 - 1,500 words (flexible subject to approval).</span>
                    </li>
                    <li className="flex items-start text-sm text-gray-700">
                      <div className="min-w-6 font-bold text-blue-600">2.</div>
                      <span>Topic must relate to Art & Cultural Heritage Law.</span>
                    </li>
                    <li className="flex items-start text-sm text-gray-700">
                      <div className="min-w-6 font-bold text-blue-600">3.</div>
                      <span>Original and unpublished manuscripts only.</span>
                    </li>
                    <li className="flex items-start text-sm text-gray-700">
                      <div className="min-w-6 font-bold text-blue-600">4.</div>
                      <span>Co-authorship allowed (max 2 authors).</span>
                    </li>
                    <li className="flex items-start text-sm text-gray-700">
                      <div className="min-w-6 font-bold text-blue-600">5.</div>
                      <span>Include at least 3 relevant images with clear sources.</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                    <FileText className="w-5 h-5 text-blue-600 mr-2" />
                    Formatting & Policy
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start text-sm text-gray-700">
                      <div className="min-w-6 font-bold text-blue-600">6.</div>
                      <span>Font: Garamond, Size 12.</span>
                    </li>
                    <li className="flex items-start text-sm text-gray-700">
                      <div className="min-w-6 font-bold text-blue-600">7.</div>
                      <span>Mandatory citations (footnotes + hyperlinks). Uniform style.</span>
                    </li>
                    <li className="flex items-start text-sm text-gray-700">
                      <div className="min-w-6 font-bold text-blue-600">8.</div>
                      <span>Strict no-plagiarism policy. Rejection without review if violated.</span>
                    </li>
                    <li className="flex items-start text-sm text-gray-700">
                      <div className="min-w-6 font-bold text-blue-600">9.</div>
                      <span>Authors are responsible for facts and views stated.</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center text-red-600 text-sm font-medium bg-red-50 px-4 py-2 rounded-lg">
                  <AlertCircle className="w-4 h-4 mr-2" />
                  Non-adherence leads to rejection without review.
                </div>
                
                <a 
                  href="https://forms.gle/AdNb8uAFJDxmzvk27" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
                >
                  Submit via Google Form
                  <ExternalLink className="w-4 h-4 ml-2" />
                </a>
              </div>
            </div>
          </div>
          {/* === END SUBMISSION GUIDELINES SECTION === */}

          {/* Category Filter */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-blue-50 shadow-md hover:shadow-lg'
                  }`}
                >
                  {category}
                  <span className="ml-2 text-xs opacity-75">
                    ({blogPosts.filter(post => category === 'All' || post.category === category).length})
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* All Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {filteredArticles.map((article) => (
              <article 
                key={article.id} 
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden cursor-pointer"
                onClick={() => handleArticleClick(article)}
              >
                <div className="relative h-48">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                    <span className="text-xs font-bold text-gray-900">{article.category}</span>
                  </div>
                  <div className="absolute top-4 right-4 bg-green-100 text-green-800 rounded-full px-2 py-1">
                    <span className="text-xs font-bold">{article.popularity}%</span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 hover:text-blue-600 transition-colors">
                    {article.title}
                  </h3>
                  
                  <div className="flex items-center space-x-2 mb-3 text-sm text-gray-600">
                    <User className="w-4 h-4" />
                    <span className="font-semibold">{article.author}</span>
                    <span>•</span>
                    <span>{article.date}</span>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {article.introduction}
                  </p>
                  
                  {/* Subheadings Preview */}
                  <div className="mb-4">
                    <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                      What You'll Learn:
                    </h4>
                    <ul className="text-xs text-gray-600 space-y-1">
                      {article.subheadings.slice(0, 2).map((heading, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <span className="text-blue-600 mt-1">•</span>
                          <span>{heading}</span>
                        </li>
                      ))}
                      {article.subheadings.length > 2 && (
                        <li className="text-blue-600 font-semibold">
                          +{article.subheadings.length - 2} more topics
                        </li>
                      )}
                    </ul>
                  </div>
                  
                  <div className="flex items-center justify-between border-t pt-4">
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <span className="flex items-center space-x-1">
                        <Repeat className="w-3 h-3" />
                        <span>{formatNumber(parseInt(article.reposts))}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <MessageCircle className="w-3 h-3" />
                        <span>{article.comments}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Heart className="w-3 h-3" />
                        <span>{article.likes}</span>
                      </span>
                    </div>
                    
                    <button className="inline-flex items-center space-x-1 text-blue-600 font-semibold hover:text-blue-700 transition-colors">
                      <span className="text-sm">Read</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                <Lock className="w-8 h-8 text-red-500" />
              </div>
            </div>
            
            <div className="text-center mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                We are glad you are interested to read on, please login for free to read the full article!
              </h2>
              <p className="text-gray-600">
                You need to be logged in to read full blog articles.
              </p>
            </div>
            
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowLoginModal(false)}
                className="px-6 py-2 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleLogin}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Blog;