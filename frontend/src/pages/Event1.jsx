import React from 'react';
import AltNavbar from '../components/AltNavbar';
import {Link} from "react-router-dom";

function Event1() {
    return (
        <div className="relative min-h-screen bg-black">
            {/* Geometric Doodled Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-400 to-blue-400 z-0">
                {/* Geometric Pattern Overlay */}
                <div className="absolute inset-0 opacity-10"
                    style={{
                        backgroundImage: `
                            radial-gradient(circle at 20% 80%, #145fd6ff 0px, transparent 50%),
                            radial-gradient(circle at 80% 20%, #10b981 0px, transparent 50%),
                            radial-gradient(circle at 40% 40%, #8b5cf6 0px, transparent 50%),
                            linear-gradient(45deg, transparent 49%, #ef4444 49%, #ef4444 51%, transparent 51%),
                            linear-gradient(-45deg, transparent 49%, #f59e0b 49%, #f59e0b 51%, transparent 51%)
                        `,
                        backgroundSize: '400px 400px, 300px 300px, 500px 500px, 60px 60px, 60px 60px',
                        backgroundPosition: '0% 0%, 100% 100%, 30% 70%, 0% 0%, 0% 0%'
                    }}
                ></div>
            </div>

            {/* Navbar */}
            <AltNavbar />

            {/* Content Container */}
            <div className="relative z-10 pt-24 pb-16 px-4 max-w-4xl mx-auto">
                {/* Event Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                       In Conversation with Dr. Shubha Majumdar, Superintending Archaeologist, ASI
                    </h1>
                    <div className="flex flex-col md:flex-row justify-center items-center gap-4 text-gray-600">
                        <p className="text-lg font-medium">Dr. Shubha Majumdar</p>
                        <span className="hidden md:block">•</span>
                        <p className="text-lg">Superintending Archaeologist, ASI</p>
                        <span className="hidden md:block">•</span>
                        <p className="text-lg">August 26, 2025</p>
                    </div>
                </div>

                {/* Image Placeholder 1 */}
                <div className="mb-8 bg-gray-200 rounded-lg h-64 md:h-80 flex items-center justify-center">
                    <img 
                    src="./event1_img.jpg" 
                    alt="Event thumbnail" 
                    className="w-full h-48 md:h-full object-cover"
                  />
                </div>

                {/* Event Content */}
                <div className="prose prose-lg max-w-none">
                    <p className="text-gray-700 leading-relaxed mb-6">
                        On 26 August 2025, the Art Law Communion (ALC) hosted an engaging session with 
                        Dr. Shubha Majumdar, Superintending Archaeologist, Archaeological Survey of India (ASI). 
                        The discussion, "Paper to Practice: Heritage Conservation in the Trenches," offered 
                        participants a rare opportunity to understand the ground realities of heritage governance in India.
                    </p>

                    <p className="text-gray-700 leading-relaxed mb-6">
                        This interactive session offered participants a rare insider's view into the workings of the ASI, 
                        shedding light on the complexities of excavation, conservation, and legal protection. It offered 
                        a valuable opportunity to understand the realities of safeguarding India's cultural heritage.
                    </p>

                    <div className="bg-blue-50 border-l-4 border-blue-500 pl-6 py-4 mb-6">
                        <p className="text-gray-700 italic">
                            Dr. Majumdar highlighted ASI's evolution from a colonial-era institution to an independent 
                            guardian of heritage, its major conservation initiatives in India and abroad, and its pivotal 
                            role in the 2023 repatriation of 99 artifacts from the USA.
                        </p>
                    </div>

                    <p className="text-gray-700 leading-relaxed mb-6">
                        He also elaborated on ASI's 2024 conservation policy, which emphasizes traditional restoration 
                        materials, and the critical legal and non-legal challenges that are faced on the issues of 
                        encroachment, workforce shortages, and the loss of archaeological sites to modern development.
                    </p>

                    {/* Image Placeholder 2 */}
                    <div className="my-8 bg-gray-200 rounded-lg h-64 w-full md:h-80 flex items-center justify-center">
                         <img 
                    src="./event1_img2.jpg" 
                    alt="Event thumbnail" 
                    className="w-full h-48 md:h-full object-cover"
                  />
                    </div>

                    <p className="text-gray-700 leading-relaxed mb-6">
                        The session shed light on the legal and policy gaps that hinder India's World Heritage nominations, 
                        the importance of community engagement, and the urgent need for site-specific frameworks. 
                        Dr. Majumdar underscored ASI's commitment to a scientific, neutral approach in excavations, 
                        free from political or religious bias.
                    </p>

                    <div className="bg-green-50 border-l-4 border-green-500 pl-6 py-4 mb-6">
                        <p className="text-gray-700 font-semibold">
                            The discussion concluded with a call to students, practitioners, and citizens alike: to recognize 
                            the value of India's cultural heritage and actively contribute to its protection.
                        </p>
                    </div>
                </div>

                {/* Key Takeaways Section */}
                <div className="mt-12 bg-gray-50 rounded-xl p-6 border border-gray-200">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Key Takeaways</h2>
                    <ul className="space-y-3 text-gray-700">
                        <li className="flex items-start">
                            <span className="text-blue-500 mr-3">•</span>
                            ASI's transformation from colonial institution to heritage guardian
                        </li>
                        <li className="flex items-start">
                            <span className="text-blue-500 mr-3">•</span>
                            Successful repatriation of 99 artifacts from USA in 2023
                        </li>
                        <li className="flex items-start">
                            <span className="text-blue-500 mr-3">•</span>
                            2024 conservation policy focusing on traditional materials
                        </li>
                        <li className="flex items-start">
                            <span className="text-blue-500 mr-3">•</span>
                            Challenges: encroachment, workforce shortages, urban development
                        </li>
                        <li className="flex items-start">
                            <span className="text-blue-500 mr-3">•</span>
                            Need for site-specific frameworks and community engagement
                        </li>
                    </ul>
                </div>

                {/* Back to Events Link */}
                <div className="mt-12 text-center">
                     <Link
                        to="/eventsh"
                        className="self-start inline-block bg-blue-800 hover:bg-blue-900 text-white px-8 py-4 text-lg font-medium rounded-lg transition-colors duration-200"
                    >
                        Back to Events
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Event1;