import { useState } from 'react';
import AltNavbar from '../components/AltNavbar';

function AboutPage_() {
  const [imgLoading, setImgLoading] = useState(true);
  
  return (
    <div className="relative">
      {imgLoading && (
        <div className='absolute top-0 left-0 w-full h-full bg-black/70 flex items-center justify-center shimmer -z-10' />
      )}
      {/* Navbar */}
      <AltNavbar />
      
      {/* Section 1 - Our Vision */}
      <div className="relative pt-20 min-h-screen flex items-center">
        {/* Responsive Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('./monum.jpg')",
            filter: 'brightness(0.9) contrast(1.1)'
          }}
          onLoad={() => setImgLoading(false)}
        />
        {/* Mobile-optimized background overlay */}
        <div className="absolute inset-0 bg-black/20 md:bg-black/30"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center backdrop-blur-sm bg-black/30 p-6 md:p-8 rounded-lg">
            <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-light tracking-wide mb-6 md:mb-8">OUR VISION</h1>
            <div className="space-y-4 md:space-y-6 text-base md:text-lg text-white">
              <p className="text-lg md:text-xl italic">
                The secret of getting ahead is getting started.
                <br/>~ Mark Twain
              </p>
              <p>
                The Art Law Communion is an initiative started by students of law with the passion for arts for promoting interdisciplinary learning and discourse on the intersection of arts and the law in India and the Global South.
                We aim to promote deeper understanding of art law through academic exploration, advocacy and collaboration, while empowering the public to engage with critical legal issues impacting artists, collectors, cultural institutions and the global art market. This is a space for deliberation and knowledge sharing to equip the next generation of legal professionals with the expertise and insight to navigate and shape the evolving landscape of art law in India, where context-specific legal challenges to the same remain underrepresented in mainstream discourse. 
              </p>
              <p>
                We seek to combine legal scholarship with grassroots level empowerment. Our approach blends rigorous research with on-the-ground interaction with art communities: from gallery owners to street performers ensuring that legal access, awareness, and advocacy reach all corners of the creative economy.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Section 2 - What We Mean By Art */}
      <div className="relative min-h-screen flex items-center">
        {/* Responsive Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('./photo_mem.jpg')",
            filter: 'brightness(0.9) contrast(1.1)'
          }}
        />
        {/* Mobile-optimized background overlay */}
        <div className="absolute inset-0 bg-black/20 md:bg-black/30"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center backdrop-blur-sm bg-black/30 p-6 md:p-8 rounded-lg">
            <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-light tracking-wide mb-6 md:mb-8">WHAT WE MEAN BY ART?</h1>
            <div className="space-y-4 md:space-y-6 text-base md:text-lg text-white">
              <p>
               We believe, Art is both expression and resistance, heritage and innovation. From a legal standpoint, Art includes inter alia artistic, literary, musical and dramatic work. It thus entails a wide spectrum of human expression, from folk songs to classical compositions, from ephemeral street performances to enduring sculptures, from indigenous crafts to NFTs, from paintings to AI Generated content, and from sacred rituals to rebellious graffiti. Our understanding of art includes both contemporary creative practices and historical cultural heritage[ Cultural Heritage, an integral part of 'Art' includes both the tangible and intangible aspects that connect us to our past, defines our present and informs our future. It includes traditional knowledge systems, ceremonial practices, oral traditions, historical monuments including the historical artifacts. ] recognizing the legal challenges unique to each while acknowledging their interconnection in shaping India's cultural landscape.
              </p>
              <p>
                Art, we believe transcends canvas and stage. It encompasses the living traditions, gestures, objects, performances, and digital expressions through which individuals and communities shape meaning, identity, and memory. Embracing this plurality, The Art Law Communion recognizes all forms of artistic and cultural expression as worthy of legal attention, critical discourse, and institutional support.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Section 3 - Our Target Stakeholders */}
      <div className="relative min-h-screen flex items-center">
        {/* Responsive Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('./durga_puja.jpg')",
            filter: 'brightness(0.9) contrast(1.1)'
          }}
        />
        {/* Mobile-optimized background overlay */}
        <div className="absolute inset-0 bg-black/20 md:bg-black/30"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center backdrop-blur-sm bg-black/30 p-6 md:p-8 rounded-lg">
            <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-light tracking-wide mb-6 md:mb-8">OUR TARGET STAKEHOLDERS</h1>
            <div className="space-y-4 md:space-y-6 text-base md:text-lg text-white">
              <p>
                The Art Law Communion seeks to engage a diverse and intersectional range of stakeholders including and not limited to:
              </p>
              <div className="text-left space-y-3 md:space-y-4">
                <p className="flex items-start">
                  <span className="font-bold min-w-[2rem]"></span>
                  <span className="ml-2">
                    <strong>Performers:</strong> includes actors, singers, musicians, dancers, acrobats, jugglers, conjurers, snake charmers, or any other person who makes a performance.
                  </span>
                </p>
                <p className="flex items-start">
                  <span className="font-bold min-w-[2rem]"></span>
                  <span className="ml-2">
                    <strong>Artists:</strong> includes painters, sculptors, photographers, or any other person who creates art.
                  </span>
                </p>
                <p className="flex items-start">
                  <span className="font-bold min-w-[2rem]"></span>
                  <span className="ml-2">
                    <strong>Other stakeholders:</strong> includes dealers, collectors, museums, and trustees.
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Responsive CSS for background images */}
      <style jsx>{`
        @media (max-width: 768px) {
          /* Optimize background images for mobile */
          .relative.min-h-screen .absolute.inset-0 {
            background-attachment: scroll;
            background-size: cover;
            background-position: center center;
          }
        }
        
        @media (min-width: 769px) and (max-width: 1024px) {
          /* Tablet optimizations */
          .relative.min-h-screen .absolute.inset-0 {
            background-size: cover;
            background-position: center center;
          }
        }
        
        @media (min-width: 1025px) {
          /* Desktop optimizations */
          .relative.min-h-screen .absolute.inset-0 {
            background-size: cover;
            background-position: center center;
          }
        }
        
        /* Ensure proper image loading and fallback */
        .relative.min-h-screen .absolute.inset-0 {
          transition: background-image 0.3s ease-in-out;
        }
      `}</style>
    </div>
  );
}

export default AboutPage_;