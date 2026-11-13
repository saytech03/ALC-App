import { useState, useEffect } from 'react';
import { Repeat, ArrowRight, Calendar, User, Clock, Heart, MessageCircle, TrendingUp, Star, ChevronRight, Tag, ChevronLeft, ExternalLink, FileText, CheckCircle, AlertCircle } from 'lucide-react';
import AltNavbar from '../components/AltNavbar';
import { useAuth } from '../store/AuthContext';

const Blogspot = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [popularSlideIndex, setPopularSlideIndex] = useState(0);
  const [imgLoading, setImgLoading] = useState(true);
  const [apiBlogs, setApiBlogs] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const { getAllBlogs } = useAuth();

  useEffect(() => {
    const fetchApiBlogs = async () => {
      try {
        const data = await getAllBlogs();
        if (Array.isArray(data) && data.length > 0) {
          const formatted = data.map((b, idx) => ({
            id: b.id || b.blogId || `db-${idx}`,
            title: b.title,
            author: b.author,
            introduction: b.sections && b.sections.length > 0 ? b.sections[0].body : '',
            category: "ART LAW",
            date: b.createdAt ? new Date(b.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }) : "Recent",
            readTime: "8 min read",
            reposts: "0",
            comments: 0,
            reactions: 1,
            likes: 1,
            popularity: 90,
            featured: idx === 0,
            realUrl: b.sections && b.sections[0]?.references?.[0] ? b.sections[0].references[0] : null,
            image: b.sections && b.sections[0]?.images?.[0] ? b.sections[0].images[0] : "./birlawabs.png",
            subheadings: Array.isArray(b.sections) && b.sections.length > 0
              ? b.sections.map(s => s?.heading || s?.subHeading || 'Overview').filter(Boolean)
              : ["Overview"],
            sections: b.sections
          }));
          setApiBlogs(formatted);
        }
      } catch (err) {
        console.warn('Could not fetch API blogs:', err);
      }
    };
    fetchApiBlogs();
  }, []);

  // Reduced blog data to 7 posts
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
  
  const allBlogPosts = apiBlogs.length > 0 ? [...apiBlogs, ...blogPosts] : blogPosts;

  // Get featured article (highest popularity)
  const featuredArticle = allBlogPosts.find(post => post.featured) || allBlogPosts[0];
  
  // Get popular articles sorted by popularity (top 4 for slider)
  const popularArticles = allBlogPosts
    .filter(post => !post.featured)
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, 4);

  // Filter articles by category
  const filteredArticles = selectedCategory === 'All' 
    ? allBlogPosts.filter(post => !post.featured)
    : allBlogPosts.filter(post => post.category === selectedCategory && !post.featured);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const formatNumber = (num) => {
    const n = Number(num);
    if (isNaN(n)) return '0';
    if (n >= 1000) {
      return (n / 1000).toFixed(1) + 'K';
    }
    return n.toString();
  };

  // Function to handle article click
  const handleArticleClick = (article) => {
    if (article.realUrl) {
      window.open(article.realUrl, '_blank', 'noopener,noreferrer');
    } else {
      setSelectedArticle(article);
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
      {imgLoading && (
					<div className='absolute top-0 left-0 w-full h-full bg-black/70 flex items-center justify-center shimmer -z-10' />
				)}
      {/* Navigation Header */}
      <AltNavbar />
      
      {/* Hero Section with Featured Article */}
      <section className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Featured Article Banner */}
          <div className="mb-16 mt-12 overflow-hidden rounded-2xl border border-white/60 bg-[#fffdf8] shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              {/* Content Side */}
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <div className="flex items-center space-x-3 mb-6">
                  <span className="rounded-full bg-[#fff0e8] px-4 py-2 text-sm font-bold tracking-wide text-[#c94d16]">
                    FEATURED
                  </span>
                {/* <div className="flex items-center space-x-2 text-orange-600">
                    <TrendingUp className="w-4 h-4" />
                    <span className="text-sm font-semibold">Trending Now</span>
                  </div>*/}
                </div>
                
                <h1 className="mb-6 font-serif text-3xl font-semibold leading-tight tracking-tight text-[#211d1a] lg:text-5xl">
                  {featuredArticle.title}
                </h1>
                
                <div className="flex items-center space-x-2 mb-4">
                  <span className="rounded-full bg-[#fff0e8] px-3 py-1 text-xs font-semibold text-[#c94d16]">
                    {featuredArticle.category}
                  </span>
                  <div className="flex items-center space-x-1">
                    {[...Array(4)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#ff6719] text-[#ff6719]" />
                    ))}
                    <span className="ml-2 text-sm text-stone-500">
                      Popularity: {featuredArticle.popularity}%
                    </span>
                  </div>
                </div>
                
                <p className="mb-6 text-lg leading-relaxed text-stone-700">
                  {featuredArticle.introduction}
                </p>
                
                {/* Author and Meta Info */}
                <div className="mb-8 flex flex-wrap items-center gap-4 text-sm text-stone-500">
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4" />
                    <span className="font-semibold text-stone-700">{featuredArticle.author}</span>
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
                <div className="mb-8 flex items-center space-x-6 rounded-xl border border-stone-100 bg-[#f8f6f1] p-4 text-stone-700">
                  <div className="flex items-center space-x-2">
                    <Repeat className="w-5 h-5 text-[#ff6719]" />
                    <span className="font-semibold">{featuredArticle.reposts}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MessageCircle className="w-5 h-5 text-stone-500" />
                    <span className="font-semibold">{featuredArticle.comments}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Heart className="w-5 h-5 text-[#ff6719]" />
                    <span className="font-semibold">{featuredArticle.likes}</span>
                  </div>
                </div>
                
                <button 
                  onClick={() => handleArticleClick(featuredArticle)}
                  className="inline-flex w-fit cursor-pointer items-center space-x-3 rounded-full bg-[#ff6719] px-8 py-4 font-semibold text-white shadow-sm transition-colors duration-200 hover:bg-[#e85b13]"
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
                <div className="absolute top-6 right-6 rounded-full bg-[#fffdf8]/95 p-3 shadow-md backdrop-blur-sm">
                  <div className="flex items-center space-x-2">
                    <div className="h-2.5 w-2.5 rounded-full bg-[#ff6719]"></div>
                    <span className="text-sm font-semibold text-[#211d1a]">
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
              <h2 className="flex items-center space-x-3 font-serif text-3xl font-semibold tracking-tight text-white">
               {/*} <TrendingUp className="w-8 h-8 text-orange-600" />*/}
                <span>Most Popular This Week</span>
              </h2>
              
              {/* Slider Navigation */}
              <div className="flex items-center space-x-3">
                <button
                  onClick={prevSlide}
                  className="rounded-full border border-white/40 bg-[#fffdf8] p-3 shadow-sm transition-colors hover:bg-white"
                >
                  <ChevronLeft className="w-6 h-6 text-stone-700" />
                </button>
                <span className="text-sm font-medium text-white/85">
                  {popularSlideIndex + 1} - {Math.min(popularSlideIndex + 2, popularArticles.length)} of {popularArticles.length}
                </span>
                <button
                  onClick={nextSlide}
                  className="rounded-full border border-white/40 bg-[#fffdf8] p-3 shadow-sm transition-colors hover:bg-white"
                >
                  <ChevronRight className="w-6 h-6 text-stone-700" />
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
                      className="h-full cursor-pointer overflow-hidden rounded-xl border border-stone-200/80 bg-[#fffdf8] shadow-sm transition-shadow duration-300 hover:shadow-lg"
                      onClick={() => handleArticleClick(article)}
                    >
                      <div className="relative h-48">
                        <img
                          src={article.image}
                          alt={article.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-4 left-4 rounded-full bg-[#fff0e8] px-3 py-1 text-xs font-bold text-[#c94d16]">
                          #{index + 1} POPULAR
                        </div>
                        <div className="absolute top-4 right-4 rounded-full bg-[#fffdf8]/90 px-2 py-1 backdrop-blur-sm">
                          <span className="text-xs font-bold text-[#211d1a]">{article.popularity}%</span>
                        </div>
                        {article.realUrl && (
                          <div className="absolute bottom-4 right-4 rounded-full bg-[#ff6719] p-2 text-white">
                            <ExternalLink className="w-4 h-4" />
                          </div>
                        )}
                      </div>
                      
                      <div className="p-6">
                        <div className="flex items-center space-x-2 mb-3">
                          <Tag className="w-4 h-4 text-[#ff6719]" />
                          <span className="rounded-full bg-[#fff0e8] px-2 py-1 text-xs font-semibold text-[#c94d16]">
                            {article.category}
                          </span>
                        </div>
                        
                        <h3 className="mb-3 line-clamp-2 font-serif text-lg font-semibold text-[#211d1a]">
                          {article.title}
                        </h3>
                        
                        <p className="mb-4 line-clamp-2 text-sm text-stone-600">
                          {article.introduction}
                        </p>
                        
                        <div className="mb-4 flex items-center justify-between text-xs text-stone-500">
                          <span className="font-semibold text-stone-700">{article.author}</span>
                          <span>{article.readTime}</span>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 text-xs text-stone-500">
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
                          
                          {article.realUrl ? (
                            <ExternalLink className="w-5 h-5 text-[#ff6719]" />
                          ) : (
                            <ChevronRight className="w-5 h-5 text-[#ff6719]" />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* === SUBMISSION GUIDELINES SECTION === */}
          <div className="mb-16 overflow-hidden rounded-2xl border border-stone-200/80 bg-[#fffdf8] shadow-lg">
            <div className="flex items-center justify-between bg-[#29231f] p-6">
              <div className="flex items-center space-x-3">
                <FileText className="w-8 h-8 text-[#ff9a66]" />
                <h2 className="font-serif text-2xl font-semibold text-white">Submission Guidelines</h2>
              </div>
              <span className="rounded-full bg-white/10 px-3 py-1 text-sm font-semibold text-orange-100">
                Rolling Basis
              </span>
            </div>
            
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                    <CheckCircle className="mr-2 h-5 w-5 text-[#ff6719]" />
                    Key Requirements
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start text-sm text-gray-700">
                      <div className="min-w-6 font-bold text-[#c94d16]">1.</div>
                      <span>Word count: 1,000 - 1,500 words (flexible subject to approval).</span>
                    </li>
                    <li className="flex items-start text-sm text-gray-700">
                      <div className="min-w-6 font-bold text-[#c94d16]">2.</div>
                      <span>Topic must relate to Art & Cultural Heritage Law.</span>
                    </li>
                    <li className="flex items-start text-sm text-gray-700">
                      <div className="min-w-6 font-bold text-[#c94d16]">3.</div>
                      <span>Original and unpublished manuscripts only.</span>
                    </li>
                    <li className="flex items-start text-sm text-gray-700">
                      <div className="min-w-6 font-bold text-[#c94d16]">4.</div>
                      <span>Co-authorship allowed (max 2 authors).</span>
                    </li>
                    <li className="flex items-start text-sm text-gray-700">
                      <div className="min-w-6 font-bold text-[#c94d16]">5.</div>
                      <span>Include at least 3 relevant images with clear sources.</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                    <FileText className="mr-2 h-5 w-5 text-[#ff6719]" />
                    Formatting & Policy
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start text-sm text-gray-700">
                      <div className="min-w-6 font-bold text-[#c94d16]">6.</div>
                      <span>Font: Garamond, Size 12.</span>
                    </li>
                    <li className="flex items-start text-sm text-gray-700">
                      <div className="min-w-6 font-bold text-[#c94d16]">7.</div>
                      <span>Mandatory citations (footnotes + hyperlinks). Uniform style.</span>
                    </li>
                    <li className="flex items-start text-sm text-gray-700">
                      <div className="min-w-6 font-bold text-[#c94d16]">8.</div>
                      <span>Strict no-plagiarism policy. Rejection without review if violated.</span>
                    </li>
                    <li className="flex items-start text-sm text-gray-700">
                      <div className="min-w-6 font-bold text-[#c94d16]">9.</div>
                      <span>Authors are responsible for facts and views stated.</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center rounded-full bg-[#fff0e8] px-4 py-2 text-sm font-medium text-[#b84017]">
                  <AlertCircle className="w-4 h-4 mr-2" />
                  Non-adherence leads to rejection without review.
                </div>
                
                <a 
                  href="https://forms.gle/AdNb8uAFJDxmzvk27" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full bg-[#ff6719] px-8 py-3 font-semibold text-white shadow-sm transition-colors duration-200 hover:bg-[#e85b13]"
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
                      ? 'bg-[#ff6719] text-white shadow-sm'
                      : 'border border-white/60 bg-[#fffdf8] text-stone-700 shadow-sm hover:bg-white'
                  }`}
                >
                  {category}
                  <span className="ml-2 text-xs opacity-75">
                    ({allBlogPosts.filter(post => category === 'All' || post.category === category).length})
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
                className="cursor-pointer overflow-hidden rounded-xl border border-stone-200/80 bg-[#fffdf8] shadow-sm transition-shadow duration-300 hover:shadow-lg"
                onClick={() => handleArticleClick(article)}
              >
                <div className="relative h-48">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                  <div className="absolute top-4 left-4 rounded-full bg-[#fffdf8]/90 px-3 py-1 backdrop-blur-sm">
                    <span className="text-xs font-bold text-[#211d1a]">{article.category}</span>
                  </div>
                  <div className="absolute top-4 right-4 rounded-full bg-[#fff0e8] px-2 py-1 text-[#c94d16]">
                    <span className="text-xs font-bold">{article.popularity}%</span>
                  </div>
                  {article.realUrl && (
                    <div className="absolute bottom-4 right-4 rounded-full bg-[#ff6719] p-2 text-white">
                      <ExternalLink className="w-4 h-4" />
                    </div>
                  )}
                </div>
                
                <div className="p-6">
                  <h3 className="mb-3 font-serif text-xl font-semibold text-[#211d1a] transition-colors hover:text-[#c94d16]">
                    {article.title}
                  </h3>
                  
                  <div className="mb-3 flex items-center space-x-2 text-sm text-stone-500">
                    <User className="w-4 h-4" />
                    <span className="font-semibold text-stone-700">{article.author}</span>
                    <span>•</span>
                    <span>{article.date}</span>
                  </div>
                  
                  <p className="mb-4 line-clamp-3 text-sm text-stone-600">
                    {article.introduction}
                  </p>
                  
                  {/* Subheadings Preview */}
                  {Array.isArray(article.subheadings) && article.subheadings.length > 0 && (
                    <div className="mb-4">
                      <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-stone-500">
                        What You'll Learn:
                      </h4>
                      <ul className="space-y-1 text-xs text-stone-600">
                        {article.subheadings.slice(0, 2).map((heading, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <span className="mt-1 text-[#ff6719]">•</span>
                            <span>{heading}</span>
                          </li>
                        ))}
                        {article.subheadings.length > 2 && (
                          <li className="font-semibold text-[#c94d16]">
                            +{article.subheadings.length - 2} more topics
                          </li>
                        )}
                      </ul>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between border-t border-stone-200 pt-4">
                    <div className="flex items-center space-x-4 text-xs text-stone-500">
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
                    
                    <button className="inline-flex items-center space-x-1 font-semibold text-[#c94d16] transition-colors hover:text-[#a83b10]">
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

      {/* Blog Detail Reader Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm overflow-y-auto">
          <div className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-stone-200 bg-[#fffdf8] p-6 shadow-2xl md:p-8">
            <button 
              onClick={() => setSelectedArticle(null)}
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-stone-100 font-bold text-stone-700 transition-colors hover:bg-stone-200"
            >
              ✕
            </button>
            
            <div className="mb-4 flex items-center space-x-3">
              <span className="rounded-full bg-[#fff0e8] px-3 py-1 text-xs font-bold text-[#c94d16]">
                {selectedArticle.category || 'ART LAW'}
              </span>
              <span className="text-xs text-stone-500">{selectedArticle.date}</span>
            </div>
            
            <h2 className="mb-2 font-serif text-2xl font-semibold text-[#211d1a] md:text-3xl">
              {selectedArticle.title}
            </h2>
            <p className="mb-6 text-sm font-semibold text-stone-600">
              By {selectedArticle.author}
            </p>
            
            {selectedArticle.image && (
              <img 
                src={selectedArticle.image} 
                alt={selectedArticle.title}
                className="mb-6 h-64 w-full rounded-xl object-cover shadow-md md:h-80"
              />
            )}
            
            <div className="prose max-w-none space-y-6 text-stone-700">
              {selectedArticle.introduction && (
                <p className="border-l-4 border-[#ff6719] py-1 pl-4 text-base font-medium italic leading-relaxed text-stone-800">
                  {selectedArticle.introduction}
                </p>
              )}
              
              {selectedArticle.sections && selectedArticle.sections.length > 0 ? (
                selectedArticle.sections.map((sec, idx) => (
                  <div key={idx} className="space-y-3 border-t border-stone-200 pt-4">
                    {sec.heading && <h3 className="font-serif text-xl font-semibold text-[#211d1a]">{sec.heading}</h3>}
                    {sec.subHeading && <h4 className="text-md font-semibold text-stone-700">{sec.subHeading}</h4>}
                    {sec.body && <p className="leading-relaxed whitespace-pre-line text-sm md:text-base">{sec.body}</p>}
                    {sec.images && sec.images.length > 0 && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
                        {sec.images.map((imgUrl, i) => (
                          <img key={i} src={imgUrl} alt={`Section image ${i+1}`} className="h-48 w-full rounded-xl object-cover shadow-sm" />
                        ))}
                      </div>
                    )}
                    {sec.references && sec.references.length > 0 && (
                      <div className="space-y-1 rounded-xl bg-[#f8f6f1] p-4 text-xs">
                        <span className="font-bold text-stone-700">References / Links:</span>
                        {sec.references.map((ref, rIdx) => (
                          <div key={rIdx}>
                            <a href={ref} target="_blank" rel="noopener noreferrer" className="break-all text-[#c94d16] hover:underline">
                              {ref}
                            </a>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <p className="leading-relaxed">{selectedArticle.introduction}</p>
              )}
            </div>
            
            <div className="mt-8 flex justify-end border-t border-stone-200 pt-4">
              <button 
                onClick={() => setSelectedArticle(null)}
                className="rounded-full bg-[#ff6719] px-6 py-2 font-semibold text-white transition-colors hover:bg-[#e85b13]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Blogspot;