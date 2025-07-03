import { useState, useEffect } from 'react';
import { ArrowRight, Calendar, User, Clock, Eye, Heart, MessageCircle, TrendingUp, Star, ChevronRight, Tag, ChevronLeft, ExternalLink } from 'lucide-react';
import AltNavbar from '../components/AltNavbar';

const Blogspot_ = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [popularSlideIndex, setPopularSlideIndex] = useState(0);

  // Reduced blog data to 7 posts
  const blogPosts = [
   {
      id: 1,
      title: "NFT Legal Issues: SEC Enforcement and the Future of Digital Art",
      author: "Law of The Ledger",
      introduction: "The SEC has ramped up enforcement efforts against digital asset marketplaces for selling NFTs that are allegedly securities. Recent developments include Wells notices to OpenSea and class action lawsuits, creating uncertainty for the NFT art market.",
      category: "NFT LAW",
      date: "December 31, 2024",
      readTime: "15 min read",
      views: "24.7K",
      comments: 156,
      reactions: 542,
      likes: 398,
      popularity: 98,
      featured: true,
      realUrl: "https://www.lawoftheledger.com/2024/12/articles/nfts/nft-legal-issues/",
      image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2232&q=80",
      subheadings: [
        "Recent SEC NFT Enforcements",
        "Civil Class Action Lawsuits",
        "NFT Artists Fight Back",
        "What to Expect in 2025"
      ]
    },
    {
      id: 2,
      title: "The Intellectual Property Challenges of Artworks Turned into NFTs",
      author: "Schoenherr Legal",
      introduction: "When an artist sells an NFT depicting their work, they retain the copyright unless there is a specific agreement for the transfer of those rights. Understanding IP rights in NFT transactions is crucial for both artists and collectors.",
      category: "COPYRIGHT",
      date: "March 20, 2024",
      readTime: "12 min read",
      views: "18.3K",
      comments: 89,
      reactions: 367,
      likes: 278,
      popularity: 94,
      realUrl: "https://schoenherr.eu/content/the-intellectual-property-challenges-of-artworks-turned-into-nfts",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      subheadings: [
        "Copyright Retention in NFT Sales",
        "Commercial Exploitation Rights",
        "WIPO Copyright Treaty Implications",
        "Best Practices for Artists"
      ]
    },
    {
      id: 3,
      title: "U.S. Government Study: No NFT-Specific Legislation Needed Yet",
      author: "CoinDesk Legal Analysis",
      introduction: "A comprehensive U.S. government study concludes that current intellectual property laws are adequate to deal with copyright and trademark concerns associated with NFTs, avoiding the need for new legislation.",
      category: "NFT LAW",
      date: "March 13, 2024",
      readTime: "8 min read",
      views: "16.9K",
      comments: 124,
      reactions: 298,
      likes: 189,
      popularity: 91,
      featured: false,
      realUrl: "https://www.coindesk.com/policy/2024/03/13/us-govt-study-concludes-no-nft-specific-legislation-needed-yet-current-copyright-laws-adequate",
      image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?ixlib=rb-4.0.3&auto=format&fit=crop&w=2012&q=80",
      subheadings: [
        "USPTO and Copyright Office Joint Study",
        "Current Laws vs New Legislation",
        "Industry Implications",
        "Future Regulatory Outlook"
      ]
    },
    {
      id: 4,
      title: "It Takes Two to Tango: The Importance of Artist-Gallery Contracts",
      author: "Scotti Hill, Center for Art Law",
      introduction: "Beneath the veneer of originality and artistic merit lie monetarily-driven representation agreements and consignment contracts. This comprehensive analysis explores why carefully crafted contracts between artists and galleries are both practical and imperative for successful commercial relationships.",
      category: "CONTRACTS",
      date: "August 15, 2016",
      readTime: "12 min read",
      views: "8.7K",
      comments: 34,
      reactions: 156,
      likes: 112,
      popularity: 87,
      featured: false,
      realUrl: "https://itsartlaw.org/2016/08/15/it-takes-two-to-tango-the-importance-of-artist-gallery-contracts/",
      image: "https://images.unsplash.com/photo-1578321272176-b7bbc0679853?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80",
      subheadings: [
        "Standard Artist-Gallery Contract Elements",
        "UCC Section 9-102 and NY Arts Law",
        "The Richard Prince-Gagosian Gallery Case Study",
        "Practical Protections for Artists"
      ]
    },
    {
      id: 5,
      title: "Spanish Court Rules in Favor of NFTs Over Authors in Landmark Copyright Case",
      author: "Kluwer Copyright Blog Legal Analysis",
      introduction: "In the first major European court decision involving NFTs and copyright law, a Spanish court has ruled that NFT creation does not necessarily infringe authors' rights, setting important precedent for the relationship between blockchain technology and intellectual property.",
      category: "NFT LAW",
      date: "April 22, 2024",
      readTime: "7 min read",
      views: "12.3K",
      comments: 89,
      reactions: 267,
      likes: 203,
      popularity: 89,
      featured: false,
      realUrl: "https://copyrightblog.kluweriplaw.com/2024/04/22/first-duel-between-nfts-and-copyright-before-the-spanish-courts-nfts-1-authors-0/",
      image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2032&q=80",
      subheadings: [
        "Understanding NFTs as Digital Metadata",
        "The Court's Reasoning and Legal Framework",
        "Implications for EU Copyright Law",
        "Future NFT Litigation Outlook"
      ]
    },
    {
      id: 6,
      title: "How A Bird Transformed Art Law Forever: The Brâncuși vs. United States Case",
      author: "Priyanshu Kar",
      introduction: "In 1926, Constantin Brâncuși's abstract sculpture 'Bird in Space' was seized by U.S. customs officials who refused to recognize it as art, leading to a landmark legal battle that would forever change how courts define artistic expression and reshape the boundaries of modern art.",
      category: "ART LAW",
      date: "June 3, 2025",
      readTime: "12 min read",
      views: "100",
      comments: 0,
      reactions: 3,
      likes: 3,
      popularity: 99,
      featured: false,
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
  ];

  const categories = ['All', 'ART LAW', 'COPYRIGHT', 'NFT LAW', 'CONTRACTS', 'AUTHENTICATION'];
  
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
    if (article.realUrl) {
      window.open(article.realUrl, '_blank', 'noopener,noreferrer');
    } else {
      // Handle internal article navigation here if needed
      console.log('Navigate to internal article:', article.id);
    }
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

  return (
    <div className='min-h-screen w-full ai-bg'>
      {/* Navigation Header */}
      <AltNavbar />
      
      {/* Hero Section with Featured Article */}
      <section className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Featured Article Banner */}
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              {/* Content Side */}
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <div className="flex items-center space-x-3 mb-6">
                  <span className="bg-red-100 text-red-800 px-4 py-2 rounded-full text-sm font-bold tracking-wide">
                    FEATURED
                  </span>
                  <div className="flex items-center space-x-2 text-orange-600">
                    <TrendingUp className="w-4 h-4" />
                    <span className="text-sm font-semibold">Trending Now</span>
                  </div>
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
                    <Eye className="w-5 h-5 text-blue-600" />
                    <span className="font-semibold">{featuredArticle.views}</span>
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
                  {featuredArticle.realUrl ? (
                    <ExternalLink className="w-5 h-5" />
                  ) : (
                    <ArrowRight className="w-5 h-5" />
                  )}
                </button>
              </div>
              
              {/* Image Side */}
              <div className="relative h-64 lg:h-auto">
                <img
                  src={featuredArticle.image}
                  alt={featuredArticle.title}
                  className="w-full h-full object-cover"
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
              <h2 className="text-3xl font-bold text-gray-900 flex items-center space-x-3">
                <TrendingUp className="w-8 h-8 text-orange-600" />
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
                        {article.realUrl && (
                          <div className="absolute bottom-4 right-4 bg-blue-600 text-white rounded-full p-2">
                            <ExternalLink className="w-4 h-4" />
                          </div>
                        )}
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
                              <Eye className="w-3 h-3" />
                              <span>{formatNumber(parseInt(article.views))}</span>
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
                          
                          {article.realUrl ? (
                            <ExternalLink className="w-5 h-5 text-blue-600" />
                          ) : (
                            <ChevronRight className="w-5 h-5 text-blue-600" />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

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
                  {article.realUrl && (
                    <div className="absolute bottom-4 right-4 bg-blue-600 text-white rounded-full p-2">
                      <ExternalLink className="w-4 h-4" />
                    </div>
                  )}
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
                        <Eye className="w-3 h-3" />
                        <span>{formatNumber(parseInt(article.views))}</span>
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
                      {article.realUrl ? (
                        <ExternalLink className="w-4 h-4" />
                      ) : (
                        <ArrowRight className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blogspot_;