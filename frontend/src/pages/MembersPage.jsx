import { useState } from 'react';
import Navbar from '../components/Navbar';

const MembersPage = () => {
  const [selectedMember, setSelectedMember] = useState(null);
  const [imgLoading, setImgLoading] = useState(true);

  const coreMembers = [
    // === Your 7 members (unchanged) ===
    {
      id: 1,
      name: "Priyanshu Kar",
      position: "Founder",
      info: "Final year student of law at the WB National University of Juridical Sciences, Kolkata",
      detailedInfo: "Priyanshu Kar is a final year student of law at the WB National University of Juridical Sciences, Kolkata. He is a heritage and art enthusiast by passion and a lawyer by profession. His enthusiasm for studying the legal aspects of art and culture has prompted the foundation of the Art Law Communion.",
      image: "./member1.png"
    },
    {
      id: 2,
      name: "Budhaditya Ghosh",
      position: "Co-Founder",
      info: "Final year student of law at the WB National University of Juridical Sciences, Kolkata",
      detailedInfo: "Budhaditya Ghosh is a final-year law student at West Bengal National University of Juridical Sciences, Kolkata. A literature connoisseur, writer, and poet committed to protecting artistic expression, he's interested in environmentalism, public policy, political theory, and decolonial studies, publishing multiple blogs and papers.",
      image: "./member3.png"
    },
    {
      id: 3,
      name: "Aritro Banerjee",
      position: "Founding Member",
      info: "Fifth-year law student at St. Xavier's University, Kolkata",
      detailedInfo: "Aritro Banerjee is a fifth-year law student at St. Xavier's University, Kolkata, and member of the Art Law Communion. His passion for art and history drives his commitment to protecting artistic expression through legal advocacy. He believes law serves as a collective guardian of creativity and cultural heritage. Through the Art Law Communion, Aritro champions the principle that legal frameworks must shield and advocate for artistic freedom.",
      image: "./member2.png"
    },
    {
      id: 4,
      name: "Swaprabha Chattopadhyay",
      position: "Founding Member",
      info: "Final year student of law at the WB National University of Juridical Sciences, Kolkata",
      detailedInfo: "Swaprabha Chattopadhyay is a writer, poet, and artist pursuing law at West Bengal National University of Juridical Sciences, Kolkata. His poetry appears in reputed anthologies, he explores Cubism through geometric abstraction, practices traditional music, and advocates for traditional artists' and folk singers' rights.",
      image: "./member4.png"
    },
    {
      id: 5,
      name: "Auronisha Roy",
      position: "Founding Member",
      info: "Second year student of law at the WB National University of Juridical Sciences, Kolkata",
      detailedInfo: "Auronisha Roy is a second year student of law at the WB National University of Juridical Sciences. She belongs to a family of music lovers and is a student of Bharatnatyam dance. She believes that art is an inseparable part of any society and wants to use her legal education to work for the community that has influenced her life profoundly.",
      image: "./member5.png"
    },
    {
      id: 6,
      name: "Ishika Hazra",
      position: "Founding Member",
      info: "Second year student of law at the WB National University of Juridical Sciences, Kolkata",
      detailedInfo: "Ishika Hazra is a 2nd year law student at West Bengal National University of Juridical Sciences. She is an avid art enthusiast fascinated by the diverse stories that different artists tell through their creative expressions and believes such art forms are an invaluable part of any community.",
      image: "./member6.png"
    },
    {
      id: 7,
      name: "Kapu Vinuthna",
      position: "Founding Member",
      info: "Second year student of law at the WB National University of Juridical Sciences, Kolkata",
      detailedInfo: "Kapu Vinuthna is a second year student of law at the WB National University of Juridical Sciences. She engages in different forms of writing and has a great appreciation for the passion and work that goes into art. She is very enthusiastic about contributing to the artistic community using her legal education, for she believes art is what makes us human.",
      image: "./member8.png"
    }
  ];

  const selectedMemberData = coreMembers.find(m => m.id === selectedMember);

  return (
    <div className="min-h-screen py-20 px-8 relative rainbow-bg">
      <Navbar/>
      {imgLoading && (
        <div className='absolute top-0 left-0 w-full h-full bg-black/70 flex items-center justify-center shimmer -z-10' />
      )}

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-14 mt-20">
          <h1 className="text-white text-5xl md:text-6xl font-light tracking-wide">
            The Team
          </h1>
        </div>

        {/* Members Grid - Top 4 (unchanged), Bottom 3 (centered & evenly spaced) */}
        <div className="space-y-12">
          {/* Top Row - 4 cards (exactly as before) */}
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {coreMembers.slice(0, 4).map((member) => (
              <div
                key={member.id}
                className="relative group cursor-pointer"
                onClick={() => setSelectedMember(member.id)}
              >
                <div className="relative overflow-hidden bg-gray-800 aspect-[3/4] rounded-lg transition-transform duration-300 group-hover:scale-105">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover grayscale-[80%]"
                    onLoad={() => member.id === 7 && setImgLoading(false)}
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 text-white">
                    <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                    <p className="text-sm text-gray-300 mb-3 font-medium">{member.position}</p>
                    <p className="text-xs text-gray-400 leading-relaxed">{member.info}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Row - 3 cards, perfectly centered and evenly spaced */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {coreMembers.slice(4, 7).map((member) => (
              <div
                key={member.id}
                className="relative group cursor-pointer"
                onClick={() => setSelectedMember(member.id)}
              >
                <div className="relative overflow-hidden bg-gray-800 aspect-[3/4] rounded-lg transition-transform duration-300 group-hover:scale-105">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover grayscale-[80%]"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 text-white">
                    <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                    <p className="text-sm text-gray-300 mb-3 font-medium">{member.position}</p>
                    <p className="text-xs text-gray-400 leading-relaxed">{member.info}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal - 100% unchanged */}
      {selectedMember && selectedMemberData && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-8"
          onClick={() => setSelectedMember(null)}
        >
          <div 
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-auto transform transition-all duration-300 scale-100 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedMember(null)}
              className="absolute top-4 right-4 z-10 w-8 h-8 bg-black bg-opacity-50 hover:bg-opacity-70 rounded-full flex items-center justify-center transition-all duration-200 text-white hover:scale-110"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
              <div className="relative">
                <img
                  src={selectedMemberData.image}
                  alt={selectedMemberData.name}
                  className="w-full h-full object-cover rounded-l-2xl md:min-h-[600px]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-l-2xl"></div>
              </div>

              <div className="p-8 md:p-12">
                <div className="mb-6">
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    {selectedMemberData.name}
                  </h2>
                  <p className="text-lg text-blue-600 font-semibold mb-4">
                    {selectedMemberData.position}
                  </p>
                  <div className="w-16 h-1 bg-blue-600 rounded-full"></div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">About</h3>
                    <p className="text-gray-700 leading-relaxed">
                      {selectedMemberData.detailedInfo}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MembersPage;