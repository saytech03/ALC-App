import { useState } from 'react';
import AltNavbar from '../components/AltNavbar';

const MembersPage_ = () => {
  const [selectedMember, setSelectedMember] = useState(null);
  const [imgLoading, setImgLoading] = useState(true);

  // Sample member data - you can replace with your actual data
  const coreMembers = [
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
      name: "Aritro Banerjee",
      position: "Founding Member",
      info: "Fifth-year law student at St. Xavier’s University, Kolkata",
      detailedInfo: "Aritro Banerjee is a fifth-year law student at St. Xavier’s University, Kolkata, and member of the Art Law Communion. His passion for art and history drives his commitment to protecting artistic expression through legal advocacy. He believes law serves as a collective guardian of creativity and cultural heritage. Through the Art Law Communion, Aritro champions the principle that legal frameworks must shield and advocate for artistic freedom.",
      image: "./member2.png"
    },
    {
      id: 3,
      name: "Budhaditya Ghosh",
      position: "Founding Member",
      info: "Final year student of law at the WB National University of Juridical Sciences, Kolkata",
      detailedInfo: "Budhaditya Ghosh is a final-year law student at West Bengal National University of Juridical Sciences, Kolkata. A literature connoisseur, writer, and poet committed to protecting artistic expression, he’s interested in environmentalism, public policy, political theory, and decolonial studies, publishing multiple blogs and papers.",
      image: "./member3.png"
    },
    {
      id: 4,
      name: "Swaprabha Chattopadhyay",
      position: "Founding Member",
      info: "Final year student of law at the WB National University of Juridical Sciences, Kolkata",
      detailedInfo: "Swaprabha Chattopadhyay is a writer, poet, and artist pursuing law at West Bengal National University of Juridical Sciences, Kolkata. His poetry appears in reputed anthologies, he explores Cubism through geometric abstraction, practices traditional music, and advocates for traditional artists’ and folk singers’ rights.",
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
      name: "Mehak Losalka",
      position: "Founding Member",
      info: "Law student at St. Xavier’s University, Kolkata",
      detailedInfo: "Mehak Losalka is a law student at St. Xavier’s University, Kolkata, with a deep interest in art, fashion, and the law. Passionate about protecting creative expression, she explores how legal frameworks influence contemporary visual culture. Besides enjoying painting, fashion and visual storytelling, she finds academic interest in intellectual property and cultural heritage.",
      image: "./member7.png"
    },
    {
      id: 8,
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
      <AltNavbar/>
      {/* COOL OPTIMIZATION HACK FOR IMAGES */}
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

        {/* Members Grid */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {coreMembers.map((member) => (
            <div
              key={member.id}
              className="relative group cursor-pointer"
              onClick={() => setSelectedMember(member.id)}
            >
              {/* Member Image */}
              <div className="relative overflow-hidden bg-gray-800 aspect-[3/4] rounded-lg transition-transform duration-300 group-hover:scale-105">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
                
                {/* Basic Info Overlay */}
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

      {/* Enlarged Member Detail Modal */}
      {selectedMember && selectedMemberData && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-8"
          onClick={() => setSelectedMember(null)}
        >
          <div 
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-auto transform transition-all duration-300 scale-100"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
              {/* Left Side - Image */}
              <div className="relative">
                <img
                  src={selectedMemberData.image}
                  alt={selectedMemberData.name}
                  className="w-full h-full object-cover rounded-l-2xl md:min-h-[600px]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-l-2xl"></div>
              </div>

              {/* Right Side - Detailed Info */}
              <div className="p-8 md:p-12">
                {/* Header Section */}
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
                  {/* Detailed Description */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">About</h3>
                    <p className="text-gray-700 leading-relaxed">
                      {selectedMemberData.detailedInfo}
                    </p>
                  </div>

                  {/* Contact Information - Only show if email or phone exists */}
                  {(selectedMemberData.email || selectedMemberData.phone) && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Contact</h3>
                      <div className="space-y-2">
                        {selectedMemberData.email && (
                          <p className="text-gray-700 flex items-center">
                            <span className="w-20 text-sm font-medium">Email:</span>
                            <span className="text-blue-600">{selectedMemberData.email}</span>
                          </p>
                        )}
                        {selectedMemberData.phone && (
                          <p className="text-gray-700 flex items-center">
                            <span className="w-20 text-sm font-medium">Phone:</span>
                            <span>{selectedMemberData.phone}</span>
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Achievements - Only show if achievements exist */}
                  {selectedMemberData.achievements && selectedMemberData.achievements.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Key Achievements</h3>
                      <div className="space-y-2">
                        {selectedMemberData.achievements.map((achievement, index) => (
                          <div key={index} className="flex items-center">
                            <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                            <span className="text-gray-700 text-sm">{achievement}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Close instruction */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <p className="text-sm text-gray-500 text-center">
                    Click anywhere outside to close
                  </p>
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