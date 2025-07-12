import AltNavbar from '../components/AltNavbar';

function AboutPage_() {
  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-no-repeat relative"
      style={{
        backgroundImage: "url('./desert_.jpg')"
      }}
    >
      {/* Navbar */}
      <AltNavbar />
      
      {/* Section 1 - Our Vision */}
      <div className="pt-20 min-h-screen flex items-center">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-start"> {/* Changed to items-start */}
          {/* Left Column - Space for Image */}
          <div className="w-full md:w-1/2 mb-8 md:mb-0 flex items-start">
          <div className="bg-opacity-30 rounded-lg flex items-center justify-center w-full h-64 md:h-96 relative overflow-hidden"
            style={{
              backgroundImage: "url('./warli_law.png')",
              backgroundSize: "contain",  // Changed from default 'cover' to 'contain'
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat"
            }}>
          </div>
        </div>

          {/* Right Column - Vision Content */}
          <div className="w-full md:w-1/2 md:pl-12 text-white">
            <h1 className="text-white text-4xl md:text-5xl font-light tracking-wide mb-8">OUR VISION</h1> {/* Added mb-8 */}
            <div className="space-y-6 text-lg"> {/* Increased space-y value */}
              <p>
                The Art Law Communion is a leading platform for promoting interdisciplinary learning and discourse on the intersection of arts and the law in India and the Global South.
                We aim to promote deeper understanding of art law through academic exploration, advocacy and collaboration, while empowering the public to engage with critical legal issues impacting artists, collectors, cultural institutions and the global art market. This is a space for deliberation and knowledge sharing to equip the next generation of legal professionals with the expertise and insight to navigate and shape the evolving landscape of art law in India, where context-specific legal challenges to the same remain underrepresented in mainstream discourse. 
              </p>
              <p>
                We seek to combine legal scholarship with grassroots-level empowerment. Our approach blends rigorous research with on-the-ground interaction with art communities—from gallery owners to street performers—ensuring that legal access, awareness, and advocacy reach all corners of the creative economy.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Section 2 - Text on Left, Image on Right */}
      <div className="min-h-screen flex items-center">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-start"> {/* Changed to items-start */}
          {/* Left Column - Text Content */}
          <div className="w-full md:w-1/2 mb-8 md:mb-0 md:pr-12 text-white">
            <h1 className="text-white text-4xl md:text-5xl font-light tracking-wide mb-8">WHAT WE MEAN BY ART?</h1> {/* Added mb-8 */}
            <div className="space-y-6 text-lg"> {/* Increased space-y value */}
              <p>
               We believe, Art is both expression and resistance, heritage and innovation. From a legal standpoint, Art includes inter alia artistic, literary, musical and dramatic work. It thus entails a wide spectrum of human expression, from folk songs to classical compositions, from ephemeral street performances to enduring sculptures, from indigenous crafts to NFTs, from paintings to AI Generated content, and from sacred rituals to rebellious graffiti. Our understanding of art includes both contemporary creative practices and historical cultural heritage[ Cultural Heritage, an integral part of 'Art' includes both the tangible and intangible aspects that connect us to our past, defines our present and informs our future. It includes traditional knowledge systems, ceremonial practices, oral traditions, historical monuments including the historical artifacts. ]—recognizing the legal challenges unique to each while acknowledging their interconnection in shaping India's cultural landscape.
              </p>
              <p>
                Art, we believe transcends canvas and stage. It encompasses the living traditions, gestures, objects, performances, and digital expressions through which individuals and communities shape meaning, identity, and memory. Embracing this plurality, The Art Law Communion recognizes all forms of artistic and cultural expression as worthy of legal attention, critical discourse, and institutional support.
              </p>
            </div>
          </div>

          {/* Right Column - Space for Image */}
          <div className="w-full md:w-1/2 flex items-start"> {/* Added flex items-start */}
          <div className="bg-opacity-30 rounded-lg flex items-center justify-center w-full h-64 md:h-96 relative overflow-hidden"
            style={{
              backgroundImage: "url('./warli_law.png')",
              backgroundSize: "contain",  // Changed from default 'cover' to 'contain'
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat"
            }}>
            </div>
          </div>
        </div>
      </div>

      {/* Section 3 - Image on Left, Text on Right */}
      <div className="min-h-screen flex items-center">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-start"> {/* Changed to items-start */}
          {/* Left Column - Space for Image */}
          <div className="w-full md:w-1/2 mb-8 md:mb-0 flex items-start"> {/* Added flex items-start */}
            <div className="bg-gray-200 bg-opacity-30 h-64 md:h-96 rounded-lg flex items-center justify-center w-full">
              <span className="text-white">Section 3 Image will be placed here</span>
            </div>
          </div>

          {/* Right Column - Text Content */}
          <div className="w-full md:w-1/2 md:pl-12 text-white">
            <h1 className="text-white text-4xl md:text-5xl font-light tracking-wide mb-8">OUR TARGET STAKEHOLDERS</h1> {/* Added mb-8 */}
            <div className="space-y-6 text-lg"> {/* Increased space-y value */}
              <p>
                The Art Law Communion seeks to engage a diverse and intersectional range of stakeholders including and not limited to – 
                I.Performers – includes, actors, singers, musicians, dancers, acrobat, juggler, conjurer, snake charmer, or any other person who makes a performance; 
                II.Artists – includes painter, sculptor, photographer, or any other person who creates art.
                III.Other stakeholders – includes dealers, collectors, museums, and trustees. 
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutPage_;