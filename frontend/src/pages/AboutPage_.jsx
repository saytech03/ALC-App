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
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('./sistine-1.jpg')",
            filter: 'brightness(0.9) contrast(1.1)'
          }}
        />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center backdrop-blur-sm bg-black/30 p-8 rounded-lg">
            <h1 className="text-white text-4xl md:text-5xl font-light tracking-wide mb-8">OUR VISION</h1>
            <div className="space-y-6 text-lg text-white">
               <p>
                The secret of getting ahead is getting started.
                <br/>- Mark Twain
              </p>
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

      {/* Section 2 - What We Mean By Art */}
      <div className="relative min-h-screen flex items-center">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('./monalisa-blur.jpeg')",
            filter: 'brightness(0.9) contrast(1.1)'
          }}
        />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center backdrop-blur-sm bg-black/30 p-8 rounded-lg">
            <h1 className="text-white text-4xl md:text-5xl font-light tracking-wide mb-8">WHAT WE MEAN BY ART?</h1>
            <div className="space-y-6 text-lg text-white">
              <p>
               We believe, Art is both expression and resistance, heritage and innovation. From a legal standpoint, Art includes inter alia artistic, literary, musical and dramatic work. It thus entails a wide spectrum of human expression, from folk songs to classical compositions, from ephemeral street performances to enduring sculptures, from indigenous crafts to NFTs, from paintings to AI Generated content, and from sacred rituals to rebellious graffiti. Our understanding of art includes both contemporary creative practices and historical cultural heritage[ Cultural Heritage, an integral part of 'Art' includes both the tangible and intangible aspects that connect us to our past, defines our present and informs our future. It includes traditional knowledge systems, ceremonial practices, oral traditions, historical monuments including the historical artifacts. ]—recognizing the legal challenges unique to each while acknowledging their interconnection in shaping India's cultural landscape.
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
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('./sistine-2.jpg')",
            filter: 'brightness(0.9) contrast(1.1)'
          }}
        />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center backdrop-blur-sm bg-black/30 p-8 rounded-lg">
            <h1 className="text-white text-4xl md:text-5xl font-light tracking-wide mb-8">OUR TARGET STAKEHOLDERS</h1>
            <div className="space-y-6 text-lg text-white">
              <p>
                The Art Law Communion seeks to engage a diverse and intersectional range of stakeholders including and not limited to – 
                <br/>I. Performers – includes, actors, singers, musicians, dancers, acrobat, juggler, conjurer, snake charmer, or any other person who makes a performance; 
                <br/>II. Artists – includes painter, sculptor, photographer, or any other person who creates art.
                <br/>III. Other stakeholders – includes dealers, collectors, museums, and trustees. 
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutPage_;