import { useState } from 'react';
import Navbar from '../components/Navbar';
import { Mail, Download, ArrowRight, BookOpen, Calendar } from 'lucide-react';

const Newsletter = () => {
  const [imgLoading, setImgLoading] = useState(true);
  const [email, setEmail] = useState('');

  // Current Edition data - PLACEHOLDER: Update with actual content
  const currentEdition = {
    editionNumber: "Edition 01",
    editionDate: "February",
    coverImage: "./edition1_cover.jpg", // PLACEHOLDER: Add your image path
    description: "Welcome to the very first edition of our bimonthly newsletter, where we dive into the urgent questions of authorship, AI, and copyright reshaping the contemporary art world. Alongside these conversations, we spotlight key developments in art law from India and across the globe, keeping you connected to a rapidly evolving field. This founding edition also features thoughtful testimonials from distinguished voices in the Indian art market, marking the beginning of a space dedicated to law, culture, and creative futures.",
    pdfLink: "/The_Newsletter_ArtLawCommunion_February_issue.pdf" // FIXED: Changed from "./" to "/" for absolute path
  };

  // Past Editions data - PLACEHOLDER: Add past editions when available
  /*const pastEditions = [
    {
      editionNumber: "Edition 01",
      editionDate: "February 2025",
      coverImage: "./edition1_cover.jpg",
      pdfLink: "/kala_samvad_edition1.pdf"
    }
  ];*/

  const handleSubscribe = (e) => {
    e.preventDefault();
    // PLACEHOLDER: Add subscription logic here
    console.log('Subscribing email:', email);
    setEmail('');
    alert('Thank you for subscribing!');
  };

  return (
    <div className="relative min-h-screen bg-gray-900">
      {imgLoading && (
        <div className='absolute top-0 left-0 w-full h-full bg-black/70 flex items-center justify-center shimmer -z-10' />
      )}
      
      {/* Navbar */}
      <Navbar />
      
      {/* Background Image - PLACEHOLDER: Update with your image */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url('./Newsletter.jpg')`, // PLACEHOLDER: Add your background image path
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed'
        }}
      >
        {/* Dark Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Optional: Decorative Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
      </div>
      
      {/* Content */}
      <div className="relative pt-28 min-h-screen z-10">
        <div className="container mx-auto px-4 pb-16">
          
          {/* ============================================= */}
          {/* HERO SECTION - Newsletter Info (Reduced Size) */}
          {/* ============================================= */}
          <section className="max-w-4xl mx-auto mb-16">
            <div className="bg-gradient-to-br from-indigo-900/40 to-purple-900/30 backdrop-blur-sm rounded-2xl overflow-hidden border border-indigo-500/20 shadow-2xl">
              
              {/* Newsletter Info - Centered */}
              <div className="p-8 lg:p-10 text-center">
                
                {/* Frequency Badge */}
                <div className="inline-flex items-center gap-2 bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 px-4 py-2 rounded-full text-sm font-medium mb-6">
                  <Calendar className="w-4 h-4" />
                  Bimonthly newsletter
                </div>
                
                {/* Title (H1) */}
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight">
                  कला  SAMVĀD
                </h1>
                
                {/* Subtitle (H2) */}
                <h2 className="text-xl md:text-2xl text-indigo-300 font-medium mb-2">
                  The Art Law Communion Newsletter
                </h2>
                
                {/* Tagline (Italics) */}
                <p className="text-gray-400 italic text-lg mb-6">
                  Where Art Meets Law | Creativity Advocacy Empowerment
                </p>
                
                {/* Description */}
                <p className="text-gray-300 text-base lg:text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
                  Each issue brings together sharp legal insights, field perspectives, and voices from across the Global South. Thoughtful, accessible, and urgent. It is for anyone who believes art and law are deeply intertwined.
                </p>
                
                {/* Subscribe Section */}
                {/*<div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50 max-w-xl mx-auto">
                  <p className="text-gray-300 text-sm mb-4">
                    Sign up for our newsletter to stay updated on the art and law discourses in India and the Global South
                  </p>
                  
                  <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-grow">
                      <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        required
                        className="w-full pl-12 pr-4 py-3 bg-gray-900/80 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                      />
                    </div>
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-indigo-500/30 group"
                    >
                      <span>Subscribe</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </form>
                </div>*/}
              </div>
              
              {/* Right Side - Current Edition Cover Thumbnail - COMMENTED OUT */}
              {/*
              <div className="lg:w-2/5 relative min-h-[300px] lg:min-h-[500px]">
                <img 
                  src={currentEdition.coverImage}
                  alt="Current Edition Cover"
                  className="w-full h-full object-cover"
                  onLoad={() => setImgLoading(false)}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/60 via-transparent to-transparent lg:bg-gradient-to-l" />
                <div className="absolute bottom-4 right-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-lg">
                  {currentEdition.editionNumber} — {currentEdition.editionDate}
                </div>
              </div>
              */}
            </div>
          </section>

          {/* ============================================= */}
          {/* CURRENT EDITION SECTION - Detailed View */}
          {/* ============================================= */}
          <section className="max-w-7xl mx-auto mb-24">
            {/* Section Header */}
            <div className="flex items-center justify-center gap-4 mb-12">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-indigo-500/50" />
              <h2 className="text-white font-light text-3xl md:text-4xl tracking-wide text-center flex items-center gap-3">
                <BookOpen className="w-8 h-8 text-indigo-400" />
                CURRENT EDITION
              </h2>
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-indigo-500/50" />
            </div>

            {/* Current Edition Card - Two Column Layout */}
            <div className="bg-gradient-to-br from-gray-800/70 to-gray-900/70 backdrop-blur-sm rounded-2xl overflow-hidden border border-indigo-500/30 shadow-2xl hover:border-indigo-400/50 transition-all duration-300">
              <div className="flex flex-col lg:flex-row">
                
                {/* Left Side - Edition Cover Image */}
                <div className="lg:w-2/5 relative group overflow-hidden">
                  <img 
                    src='./Newslet_ED1.png'
                    alt={`${currentEdition.editionNumber} Cover`}
                    className="w-full h-full min-h-[400px] lg:min-h-[500px] object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-indigo-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                
                {/* Right Side - Edition Details */}
                <div className="lg:w-3/5 p-8 lg:p-12 flex flex-col justify-center">
                  
                  {/* Edition Badge - CHANGED TO GOLDEN */}
                  <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-600 to-yellow-500 text-gray-900 px-4 py-2 rounded-full text-sm font-bold mb-6 w-fit shadow-lg">
                    <BookOpen className="w-4 h-4" />
                    LATEST EDITION
                  </div>
                  
                  {/* Edition Number & Date */}
                  <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">
                    {currentEdition.editionNumber}
                  </h3>
                  <p className="text-xl text-amber-300 font-medium mb-6">
                    {currentEdition.editionDate}
                  </p>
                  
                  {/* Divider - CHANGED TO GOLDEN */}
                  <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-yellow-400 rounded-full mb-6" />
                  
                  {/* Edition Description */}
                  <p className="text-gray-300 text-base lg:text-lg leading-relaxed mb-8">
                    {currentEdition.description}
                  </p>
                  
                  {/* Download Button - CHANGED TO GOLDEN */}
                  <div className="flex flex-wrap items-center gap-4">
                    <a
                      href={currentEdition.pdfLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-3 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-gray-900 px-8 py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-amber-500/30 group"
                    >
                      <Download className="w-5 h-5" />
                      <span>Download PDF</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ============================================= */}
          {/* PAST EDITIONS SECTION - PLACEHOLDER */}
          {/* ============================================= */}
          {/*
          <section className="max-w-7xl mx-auto mb-24">
            <div className="flex items-center justify-center gap-4 mb-12">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-gray-500/50" />
              <h2 className="text-white font-light text-3xl md:text-4xl tracking-wide text-center">
                PAST EDITIONS
              </h2>
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-gray-500/50" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {pastEditions.map((edition, index) => (
                <div 
                  key={index}
                  className="bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700/50 hover:border-indigo-500/30 transition-all duration-300 group"
                >
                  <div className="relative overflow-hidden">
                    <img 
                      src={edition.coverImage}
                      alt={`${edition.editionNumber} Cover`}
                      className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-white mb-1">
                      {edition.editionNumber}
                    </h3>
                    <p className="text-gray-400 text-sm mb-4">
                      {edition.editionDate}
                    </p>
                    <a
                      href={edition.pdfLink}
                      download
                      className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 text-sm font-medium transition-colors group/link"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download PDF</span>
                      <ArrowRight className="w-3 h-3 group-hover/link:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>
          */}

        </div>
      </div>
    </div>
  );
}

export default Newsletter;