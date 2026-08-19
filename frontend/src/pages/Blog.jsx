import { useState } from 'react';
import { ArrowRight, Calendar, User, Clock, Repeat, Heart, MessageCircle, Star, ChevronRight, Tag, ChevronLeft, ExternalLink, FileText, CheckCircle, AlertCircle } from 'lucide-react';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../store/AuthContext';

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [popularSlideIndex, setPopularSlideIndex] = useState(0);
  const [imgLoading, setImgLoading] = useState(true);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

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

  const categories = ['All', 'ART LAW', 'TRIBAL RIGHTS'];

  const featuredArticle = blogPosts.find(post => post.featured) || blogPosts[0];

  // Top 4 non-featured articles sorted by popularity for the slider
  const popularArticles = blogPosts
    .filter(post => !post.featured)
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, 4);

  // Articles filtered by selected category, excluding the featured article
  const filteredArticles = selectedCategory === 'All'
    ? blogPosts.filter(post => !post.featured)
    : blogPosts.filter(post => post.category === selectedCategory && !post.featured);

  const formatNumber = (num) => {
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  // Opens article directly if user is logged in; otherwise prompts login
  const handleArticleClick = (article) => {
    if (user) {
      if (article.realUrl) {
        window.open(article.realUrl, '_blank', 'noopener,noreferrer');
      }
    } else {
      setShowLoginModal(true);
    }
  };

  // Safely wraps slide index regardless of article count
  const maxSlideIndex = Math.max(0, popularArticles.length - 2);

  const nextSlide = () => {
    setPopularSlideIndex(prev => (prev >= maxSlideIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setPopularSlideIndex(prev => (prev <= 0 ? maxSlideIndex : prev - 1));
  };

  const handleLogin = () => {
    navigate('/login');
    setShowLoginModal(false);
  };

  return (
    <div className="relative">
      {imgLoading && (
        <div className='fixed top-0 left-0 w-full h-full bg-black/70 flex items-center justify-center z-50' />
      )}
      <img
        src={featuredArticle.image}
        alt=""
        className="hidden"
        onLoad={() => setImgLoading(false)}
      />

      <Navbar />

      {/* ── Featured Article Hero ── */}
      <div className="relative min-h-screen flex items-center">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-section-image"
          style={{
            backgroundImage: `url('${featuredArticle.image}')`,
            filter: 'brightness(0.9) contrast(1.1)'
          }}
        />
        <div className="absolute inset-0 bg-black/50 md:bg-black/55"></div>

        <div className="container mx-auto px-4 relative z-10 pt-20">
          <div className="max-w-3xl mx-auto text-center backdrop-blur-sm bg-black/30 border border-white/10 p-6 md:p-10 rounded-lg">
            <span className="inline-block bg-blue-500/20 border border-blue-300/30 text-blue-200 px-4 py-2 rounded-full text-xs font-bold tracking-widest mb-6">
              FEATURED
            </span>

            <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-light tracking-wide mb-6">
              {featuredArticle.title}
            </h1>

            <div className="flex items-center justify-center flex-wrap gap-3 mb-6">
              <span className="bg-white/10 border border-white/20 text-blue-100 px-3 py-1 rounded-full text-xs font-semibold tracking-wide">
                {featuredArticle.category}
              </span>
              <div className="flex items-center space-x-1">
                {[...Array(4)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
                <span className="text-sm text-white/70 ml-2">
                  {featuredArticle.popularity}% popularity
                </span>
              </div>
            </div>

            <p className="text-base md:text-lg text-white/90 leading-relaxed mb-8">
              {featuredArticle.introduction}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-white/70 mb-8">
              <div className="flex items-center space-x-2">
                <User className="w-4 h-4" />
                <span className="font-semibold text-white/90">{featuredArticle.author}</span>
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

            <div className="flex items-center justify-center space-x-6 mb-8 text-white/70 text-sm">
              <div className="flex items-center space-x-2">
                <Repeat className="w-4 h-4 text-blue-300" />
                <span className="font-semibold">{featuredArticle.reposts}</span>
              </div>
              <div className="flex items-center space-x-2">
                <MessageCircle className="w-4 h-4 text-blue-300" />
                <span className="font-semibold">{featuredArticle.comments}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Heart className="w-4 h-4 text-blue-300" />
                <span className="font-semibold">{featuredArticle.likes}</span>
              </div>
            </div>

            <button
              onClick={() => handleArticleClick(featuredArticle)}
              className="inline-flex items-center space-x-3 bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-full font-semibold tracking-wide transition-all duration-300 hover:scale-105 shadow-lg"
            >
              <span>READ FULL ARTICLE</span>
              {featuredArticle.realUrl ? (
                <ExternalLink className="w-5 h-5" />
              ) : (
                <ArrowRight className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* ── Most Popular This Week ── */}
      <div className="relative min-h-screen flex items-center">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-section-image"
          style={{
            backgroundImage: "url('./artgallery.jpeg')",
            filter: 'brightness(0.9) contrast(1.1)'
          }}
        />
        <div className="absolute inset-0 bg-black/60 md:bg-black/65"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-white text-3xl md:text-4xl lg:text-5xl font-light tracking-wide mb-4">
                MOST POPULAR THIS WEEK
              </h2>
              <div className="flex items-center justify-center space-x-3">
                <button
                  onClick={prevSlide}
                  className="p-2.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm hover:bg-white/20 transition-all duration-300"
                >
                  <ChevronLeft className="w-5 h-5 text-white" />
                </button>
                <span className="text-sm text-white/70 font-medium">
                  {popularSlideIndex + 1} - {Math.min(popularSlideIndex + 2, popularArticles.length)} of {popularArticles.length}
                </span>
                <button
                  onClick={nextSlide}
                  className="p-2.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm hover:bg-white/20 transition-all duration-300"
                >
                  <ChevronRight className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>

            <div className="relative overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${popularSlideIndex * 50}%)` }}
              >
                {popularArticles.map((article, index) => (
                  <div key={article.id} className="w-1/2 flex-shrink-0 px-3">
                    <div
                      className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl hover:bg-white/15 hover:border-white/25 transition-all duration-300 transform hover:-translate-y-2 overflow-hidden h-full cursor-pointer"
                      onClick={() => handleArticleClick(article)}
                    >
                      <div className="relative h-48">
                        <img
                          src={article.image}
                          alt={article.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        <div className="absolute top-4 left-4 bg-blue-500/80 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-bold">
                          #{index + 1} POPULAR
                        </div>
                        <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm rounded-full px-2 py-1">
                          <span className="text-xs font-bold text-white">{article.popularity}%</span>
                        </div>
                        {article.realUrl && (
                          <div className="absolute bottom-4 right-4 bg-blue-600/90 text-white rounded-full p-2">
                            <ExternalLink className="w-4 h-4" />
                          </div>
                        )}
                      </div>

                      <div className="p-6">
                        <div className="flex items-center space-x-2 mb-3">
                          <Tag className="w-4 h-4 text-blue-300" />
                          <span className="bg-white/10 border border-white/20 text-blue-100 px-2 py-1 rounded-full text-xs font-semibold">
                            {article.category}
                          </span>
                        </div>

                        <h3 className="text-lg font-medium text-white mb-3 line-clamp-2">
                          {article.title}
                        </h3>

                        <p className="text-white/60 text-sm mb-4 line-clamp-2">
                          {article.introduction}
                        </p>

                        <div className="flex items-center justify-between text-xs text-white/50 mb-4">
                          <span className="font-semibold text-white/70">{article.author}</span>
                          <span>{article.readTime}</span>
                        </div>

                        <div className="flex items-center justify-between border-t border-white/10 pt-4">
                          <div className="flex items-center space-x-4 text-xs text-white/50">
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
                            <ExternalLink className="w-5 h-5 text-blue-300" />
                          ) : (
                            <ArrowRight className="w-5 h-5 text-blue-300" />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Write For Us ── */}
      <div className="relative min-h-screen flex items-center">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-section-image"
          style={{
            backgroundImage: "url('./lib.png')",
            filter: 'brightness(0.9) contrast(1.1)'
          }}
        />
        <div className="absolute inset-0 bg-black/55 md:bg-black/60"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto backdrop-blur-sm bg-black/30 border border-white/10 rounded-lg p-6 md:p-10">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
              <div className="flex items-center space-x-3">
                <FileText className="w-7 h-7 text-blue-300" />
                <h2 className="text-white text-2xl md:text-3xl font-light tracking-wide">WRITE FOR US</h2>
              </div>
              <span className="bg-white/10 border border-white/20 text-blue-100 px-3 py-1 rounded-full text-xs font-semibold tracking-wide">
                Rolling Basis
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-base font-semibold text-white mb-4 flex items-center">
                  <CheckCircle className="w-5 h-5 text-blue-300 mr-2" />
                  Key Requirements
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start text-sm text-white/80">
                    <div className="min-w-6 font-bold text-blue-300">1.</div>
                    <span>Word count: 1,000 - 1,500 words (flexible subject to approval).</span>
                  </li>
                  <li className="flex items-start text-sm text-white/80">
                    <div className="min-w-6 font-bold text-blue-300">2.</div>
                    <span>Topic must relate to Art &amp; Cultural Heritage Law.</span>
                  </li>
                  <li className="flex items-start text-sm text-white/80">
                    <div className="min-w-6 font-bold text-blue-300">3.</div>
                    <span>Original and unpublished manuscripts only.</span>
                  </li>
                  <li className="flex items-start text-sm text-white/80">
                    <div className="min-w-6 font-bold text-blue-300">4.</div>
                    <span>Co-authorship allowed (max 2 authors).</span>
                  </li>
                  <li className="flex items-start text-sm text-white/80">
                    <div className="min-w-6 font-bold text-blue-300">5.</div>
                    <span>Include at least 3 relevant images with clear sources.</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-base font-semibold text-white mb-4 flex items-center">
                  <FileText className="w-5 h-5 text-blue-300 mr-2" />
                  Formatting &amp; Policy
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start text-sm text-white/80">
                    <div className="min-w-6 font-bold text-blue-300">6.</div>
                    <span>Font: Garamond, Size 12.</span>
                  </li>
                  <li className="flex items-start text-sm text-white/80">
                    <div className="min-w-6 font-bold text-blue-300">7.</div>
                    <span>Mandatory citations (footnotes + hyperlinks). Uniform style.</span>
                  </li>
                  <li className="flex items-start text-sm text-white/80">
                    <div className="min-w-6 font-bold text-blue-300">8.</div>
                    <span>Strict no-plagiarism policy. Rejection without review if violated.</span>
                  </li>
                  <li className="flex items-start text-sm text-white/80">
                    <div className="min-w-6 font-bold text-blue-300">9.</div>
                    <span>Authors are responsible for facts and views stated.</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center text-red-200 text-sm font-medium bg-red-500/15 border border-red-400/30 px-4 py-2 rounded-lg">
                <AlertCircle className="w-4 h-4 mr-2" />
                Non-adherence leads to rejection without review.
              </div>

              <a
                href="https://forms.gle/AdNb8uAFJDxmzvk27"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
              >
                Submit via Google Form
                <ExternalLink className="w-4 h-4 ml-2" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ── All Articles ── */}
      <div className="relative py-24 md:py-32">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-section-image"
          style={{
            backgroundImage: "url('./ajanta.jpeg')",
            filter: 'brightness(0.85) contrast(1.1)'
          }}
        />
        <div className="absolute inset-0 bg-black/70 md:bg-black/75"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-10">
            <h2 className="text-white text-3xl md:text-4xl lg:text-5xl font-light tracking-wide">ALL ARTICLES</h2>
          </div>

          <div className="mb-10 flex justify-center">
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 border ${
                    selectedCategory === category
                      ? 'bg-blue-600 border-blue-600 text-white shadow-lg'
                      : 'bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm'
                  }`}
                >
                  {category}
                  <span className="ml-2 text-xs opacity-75">
                    ({blogPosts.filter(post => (category === 'All' || post.category === category) && !post.featured).length})
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((article) => (
              <article
                key={article.id}
                className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl hover:bg-white/15 hover:border-white/25 transition-all duration-300 transform hover:-translate-y-1 overflow-hidden cursor-pointer"
                onClick={() => handleArticleClick(article)}
              >
                <div className="relative h-48">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1">
                    <span className="text-xs font-bold text-white">{article.category}</span>
                  </div>
                  <div className="absolute top-4 right-4 bg-blue-500/80 backdrop-blur-sm rounded-full px-2 py-1">
                    <span className="text-xs font-bold text-white">{article.popularity}%</span>
                  </div>
                  {article.realUrl && (
                    <div className="absolute bottom-4 right-4 bg-blue-600/90 text-white rounded-full p-2">
                      <ExternalLink className="w-4 h-4" />
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-medium text-white mb-3 hover:text-blue-300 transition-colors">
                    {article.title}
                  </h3>

                  <div className="flex items-center space-x-2 mb-3 text-sm text-white/60">
                    <User className="w-4 h-4" />
                    <span className="font-semibold text-white/80">{article.author}</span>
                    <span>•</span>
                    <span>{article.date}</span>
                  </div>

                  <p className="text-white/60 text-sm mb-4 line-clamp-3">
                    {article.introduction}
                  </p>

                  <div className="mb-4">
                    <h4 className="text-xs font-semibold text-white/40 uppercase tracking-wide mb-2">
                      What You'll Learn:
                    </h4>
                    <ul className="text-xs text-white/60 space-y-1">
                      {article.subheadings.slice(0, 2).map((heading, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <span className="text-blue-300 mt-1">•</span>
                          <span>{heading}</span>
                        </li>
                      ))}
                      {article.subheadings.length > 2 && (
                        <li className="text-blue-300 font-semibold">
                          +{article.subheadings.length - 2} more topics
                        </li>
                      )}
                    </ul>
                  </div>

                  <div className="flex items-center justify-between border-t border-white/10 pt-4">
                    <div className="flex items-center space-x-4 text-xs text-white/50">
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

                    <button className="inline-flex items-center space-x-1 text-blue-300 font-semibold hover:text-blue-200 transition-colors">
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
      </div>

      {showLoginModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-gray-900 rounded-lg shadow-2xl p-8 w-full max-w-md mx-4 relative border border-gray-700">
            <button
              onClick={() => setShowLoginModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="flex items-center gap-3 mb-6">
              <img src='/alc_logo.png' alt='Art Law Communion' className='w-16' />
              <div className="text-white" style={{ fontFamily: 'Consolas, serif' }}>
                <div className="text-sm font-bold leading-tight">ART</div>
                <div className="text-sm font-bold leading-tight">LAW</div>
                <div className="text-sm font-bold leading-tight">COMMUNION</div>
              </div>
            </div>

            <h2 className="text-white text-xl font-bold mb-2">Login to Read</h2>
            <p className="text-gray-300 mb-6 text-sm leading-relaxed">
              We're glad you're interested! Please login for free to read the full article.
            </p>

            <button
              onClick={handleLogin}
              className="w-full py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors mb-4"
            >
              Login
            </button>

            <div className="text-center text-gray-400 text-sm">
              Don't have an account?{' '}
              <button
                onClick={() => { navigate('/signup'); setShowLoginModal(false); }}
                className="text-blue-500 hover:underline"
              >
                Register Now
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .bg-section-image {
          transition: background-image 0.3s ease-in-out;
        }
        @media (max-width: 768px) {
          .bg-section-image {
            background-attachment: scroll;
            background-size: cover;
            background-position: center center;
          }
        }
      `}</style>
    </div>
  );
};

export default Blog;
