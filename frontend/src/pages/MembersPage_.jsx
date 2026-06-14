import { useState } from 'react';
import AltNavbar from '../components/AltNavbar';

const MembersPage_ = () => {
  const [selectedMember, setSelectedMember] = useState(null);
  const [imgLoading, setImgLoading] = useState(true);

   const coreMembers = [
    // === Your 7 members (unchanged) ===
    {
      id: 1,
      name: "Budhaditya Ghosh",
      position: "Co-Founder & Co-Chairperson",
      info: "Final year student of law at the WB National University of Juridical Sciences, Kolkata",
      detailedInfo: "Budhaditya Ghosh is a final-year law student at West Bengal National University of Juridical Sciences, Kolkata. A literature connoisseur, writer, and poet committed to protecting artistic expression, he's interested in environmentalism, public policy, political theory, and decolonial studies, publishing multiple blogs and papers.",
      image: "./member3.png"
    },
    {
      id: 2,
      name: "Priyanshu Kar",
      position: "Founder & Chairperson",
      info: "Incoming Associate at Nishith Desai Associates",
      detailedInfo: "Priyanshu Kar is an incoming associate at Nishith Desai Associates and an alumnus of the WB National University of Juridical Sciences, Kolkata. He is a heritage and art enthusiast by passion and a lawyer by profession. His enthusiasm for studying the legal aspects of art and culture has prompted the foundation of the Art Law Communion.",
      image: "./member1.png"
    },
    {
      id: 3,
      name: "Aritro Banerjee",
      position: "Co-Founder & Co-Chairperson",
      info: "Fifth-year law student at St. Xavier's University, Kolkata",
      detailedInfo: "Aritro Banerjee is a fifth-year law student at St. Xavier's University, Kolkata, and member of the Art Law Communion. His passion for art and history drives his commitment to protecting artistic expression through legal advocacy. He believes law serves as a collective guardian of creativity and cultural heritage. Through the Art Law Communion, Aritro champions the principle that legal frameworks must shield and advocate for artistic freedom.",
      image: "./member2.png"
    },
    {
      id: 4,
      name: "Ishika Hazra",
      position: "Founding Member",
      info: "Second year student of law at the WB National University of Juridical Sciences, Kolkata",
      detailedInfo: "Ishika Hazra is a 2nd year law student at West Bengal National University of Juridical Sciences. She is an avid art enthusiast fascinated by the diverse stories that different artists tell through their creative expressions and believes such art forms are an invaluable part of any community.",
      image: "./member4.jpeg"
    },
    {
      id: 5,
      name: "Kapu Vinuthna",
      position: "Founding Member",
      info: "Second year student of law at the WB National University of Juridical Sciences, Kolkata",
      detailedInfo: "Kapu Vinuthna is a second year student of law at the WB National University of Juridical Sciences. She engages in different forms of writing and has a great appreciation for the passion and work that goes into art. She is very enthusiastic about contributing to the artistic community using her legal education, for she believes art is what makes us human.",
      image: "./member5.png"
    },
    {
      id: 6,
      name: "Abhishikta Das",
      position: "Member",
      info: "Law student at Jogesh Chandra Chaudhuri Law College, Kolkata",
      detailedInfo: "Abhishikta Das is a law student with a deep passion for art and creativity. Beyond legal studies, she enjoys singing, dancing, drawing, making crafts, and discovering new music. Her fascination with the intersection of law and culture naturally drew her to the field of Art Law. She is enthusiastic about exploring the history of art, contemporary developments in the art world, and the legal issues surrounding them. She believes that creativity, culture, and a touch of legal drama make her imperfectly perfect.",
      image: "./member6.jpeg"
    },
    {
      id: 7,
      name: "Vidushi Pandey",
      position: "Member",
      info: "Second year law student at the National Forensic Sciences University, Delhi",
      detailedInfo: "Vidushi Pandey is a second year law student at the National Forensic Sciences University, Delhi. Having pursued Kathak for several years, she has developed a deep appreciation for the cultural and creative value of the arts. She is particularly interested in exploring how law can engage with and support artistic and cultural spaces.",
      image: "./member7.jpeg"
    }
  ];

  // === New Web Team Members (Placeholders) ===
  const webMembers = [
    {
      id: 8,
      name: "Debdutta Basu",
      position: "Backend Developer",
      info: "Programmer Analyst Trainee at Cognizant",
      detailedInfo: "Debdutta Basu completed his Bachelor's degree from the University of Engineering and Management, Kolkata. A passionate software engineer specializing in Java Spring Boot, he architected and developed the robust backend system for the Art Law Communion. His technical expertise ensures the digital platform runs seamlessly, supporting the organization's mission to bridge the legal and artistic communities",
      image: "./webmember1.jpeg" 
    },
    {
      id: 9,
      name: "Sayantan Pramanik",
      position: "Frontend Developer",
      info: "First year masters student in Computer Science & Engineering at Jadavpur University.",
      detailedInfo: "Sayantan Pramanik is currently pursuing his Master's degree at Jadavpur University, having completed his Bachelor's from the Heritage Institute of Technology. Deeply devoted to enriching his knowledge in Machine Learning, he is also a passionate application developer. For the Art Law Communion, he spearheaded the frontend development and managed the seamless integration of backend systems, bringing the digital platform to life.",
      image: "./webmember2.jpeg" // Placeholder image
    }
  ];

  // Combine arrays so the modal can find data for any ID
  const allMembers = [...coreMembers, ...webMembers];
  const selectedMemberData = allMembers.find(m => m.id === selectedMember);

  return (
    <div className="min-h-screen py-20 px-8 relative rainbow-bg">
       {imgLoading && (
        <div className='absolute top-0 left-0 w-full h-full bg-black/70 flex items-center justify-center shimmer -z-10' />
      )}
      <AltNavbar/>
      {imgLoading && (
        <div className='absolute top-0 left-0 w-full h-full bg-black/70 flex items-center justify-center shimmer -z-10' />
      )}

      <div className="max-w-7xl mx-auto">
        {/* === Header: The Team === */}
        <div className="mb-14 mt-20">
          <h1 className="text-white text-5xl md:text-6xl font-light tracking-wide">
            The Team
          </h1>
        </div>

        {/* === Core Members Grid === */}
        <div className="space-y-12">
          {/* Top Row - cards 1-3, aligned between the bottom row cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-8 gap-8 max-w-[100rem] mx-auto">
            {coreMembers.slice(0, 3).map((member, index) => {
              const startClass = index === 0 ? 'lg:col-start-2' : index === 1 ? 'lg:col-start-4' : 'lg:col-start-6';
              return (
                <div
                  key={member.id}
                  className={`${startClass} lg:col-span-2 relative group cursor-pointer`}
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
              );
            })}
          </div>

          {/* Bottom Row - cards 4-7 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-8 gap-8 max-w-[100rem] mx-auto">
            {Array.from({ length: 4 }).map((_, index) => {
              const member = coreMembers[3 + index];
              return member ? (
                <div
                  key={member.id}
                  className="relative group cursor-pointer lg:col-span-2"
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
              ) : (
                <div key={`empty-${index}`} className="hidden lg:block" />
              );
            })}
          </div>
        </div>

        {/* === Header: The Web Team === */}
        <div className="mb-14 mt-20">
          <h1 className="text-white text-5xl md:text-6xl font-light tracking-wide">
            The Web Team
          </h1>
        </div>

        {/* === Web Team Grid - 2 cards using same grid system as core members === */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-8 gap-8 max-w-[100rem] mx-auto pb-20">
          <div className="lg:col-start-3 lg:col-span-2 relative group cursor-pointer" onClick={() => setSelectedMember(webMembers[0].id)}>
            <div className="relative overflow-hidden bg-gray-800 aspect-[3/4] rounded-lg transition-transform duration-300 group-hover:scale-105">
              <img
                src={webMembers[0].image}
                alt={webMembers[0].name}
                className="w-full h-full object-cover grayscale-[80%]"
                onLoad={() => webMembers[0].id === 9 && setImgLoading(false)}
              />
              <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 text-white">
                <h3 className="text-xl font-semibold mb-2">{webMembers[0].name}</h3>
                <p className="text-sm text-gray-300 mb-3 font-medium">{webMembers[0].position}</p>
                <p className="text-xs text-gray-400 leading-relaxed">{webMembers[0].info}</p>
              </div>
            </div>
          </div>
          
          <div className="lg:col-start-5 lg:col-span-2 relative group cursor-pointer" onClick={() => setSelectedMember(webMembers[1].id)}>
            <div className="relative overflow-hidden bg-gray-800 aspect-[3/4] rounded-lg transition-transform duration-300 group-hover:scale-105">
              <img
                src={webMembers[1].image}
                alt={webMembers[1].name}
                className="w-full h-full object-cover grayscale-[80%]"
                onLoad={() => webMembers[1].id === 9 && setImgLoading(false)}
              />
              <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 text-white">
                <h3 className="text-xl font-semibold mb-2">{webMembers[1].name}</h3>
                <p className="text-sm text-gray-300 mb-3 font-medium">{webMembers[1].position}</p>
                <p className="text-xs text-gray-400 leading-relaxed">{webMembers[1].info}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* === Modal (Unchanged functionality) === */}
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

export default MembersPage_;