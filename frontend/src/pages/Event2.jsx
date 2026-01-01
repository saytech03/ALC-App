import React, { useState, useEffect } from 'react';
import AltNavbar from '../components/AltNavbar';
import { Link } from "react-router-dom";

function Event2() {
    // NEW: State to determine the correct back path based on auth status
    const [backPath, setBackPath] = useState("/events");
    const [imgLoading, setImgLoading] = useState(true);

    useEffect(() => {
        try {
            const storedUser = localStorage.getItem('currentUser');
            if (storedUser) {
                const user = JSON.parse(storedUser);
                const id = user.alc_patronid || user.membershipId || "user";
                // If logged in, go back to the authenticated events page with dynamic ID
                setBackPath(`/${id}/eventsh`);
            } else {
                // If public, go back to public events page
                setBackPath("/events");
            }
        } catch (e) {
            setBackPath("/events");
        }
    }, []);

    return (
        <div className="relative min-h-screen bg-black">
             {imgLoading && (
        <div className='absolute top-0 left-0 w-full h-full bg-black/70 flex items-center justify-center shimmer -z-10' />
      )}
            {/* Geometric Doodled Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-400 to-blue-400 z-0">
                {/* Geometric Pattern Overlay */}
                {/* Minimalist background with subtle pattern */}
                    <div 
                        className="absolute inset-0 bg-gray-600 opacity-100 z-0"
                        style={{
                        backgroundImage: `url('./shrine.jpg')`,
                        filter: 'brightness(0.9) contrast(1.1)',
                        }}
                        onLoad={() => setImgLoading(false)}
                    />
                    </div>

            {/* Navbar */}
            <AltNavbar />

            {/* Content Container */}
            <div className="relative z-10 pt-24 pb-16 px-4 max-w-4xl mx-auto">
                {/* Event Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                       In Conversation with Dr. Somabha Bandopadhyay
                    </h1>
                    <div className="flex flex-col md:flex-row justify-center items-center gap-4 text-gray-600">
                        <p className="text-lg font-medium">Dr. Somabha Bandopadhyay</p>
                        <span className="hidden md:block">•</span>
                        <p className="text-lg">Assistant Professor, NFSU, Delhi</p>
                        <span className="hidden md:block">•</span>
                        <p className="text-lg">November 2, 2025</p>
                    </div>
                </div>

                {/* Image Placeholder 1 - Fixed to show full image */}
                <div className="mb-8 bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden">
                    <img 
                    src="./event2_img.jpeg" 
                    alt="Event thumbnail" 
                    className="w-full h-auto object-contain"
                  />
                </div>

                {/* Event Content */}
                <div className="prose prose-lg max-w-none">
                    <p className="text-gray-700 leading-relaxed mb-6 font-semibold">
                        On 2nd November, 2025 we turned off the spotlights, so the shadows may speak.
                    </p>

                    <p className="text-gray-700 leading-relaxed mb-6">
                        With the successful conclusion of our second "In Conversation With" series, the Art Law Communion (ALC) 
                        delved into the dark underbelly of the performing arts industry, shedding light on regulatory lacunae 
                        and exploitative culture alike. Dr. Somabha Bandopadhay's raw insights, delivered straight from her 
                        years of experience backstage, opened ears, hearts, and minds alike and sparked conversations that were 
                        only matched in their importance by our societal unwillingness to have them.
                    </p>

                    <p className="text-gray-700 leading-relaxed mb-6">
                        We spoke about the performing arts industry - not the polished, glittering part we usually see, 
                        but the quieter, messier underside that carries stories of exploitation, silence, and systemic gaps 
                        we rarely acknowledge.
                    </p>

                    <div className="bg-blue-50 border-l-4 border-blue-500 pl-6 py-4 mb-6">
                        <p className="text-gray-700 italic">
                            Listening to ma'am was an experience in itself. Her honesty came from years spent as a 
                            professional Manipuri dance performer herself, really seeing what happens behind the scenes. 
                            Her words didn’t just inform us—they opened doors to conversations we should have been having much earlier.
                        </p>
                    </div>

                    {/* Image Placeholder 2 - Fixed to show full image */}
                    <div className="my-8 bg-gray-200 rounded-lg w-full flex items-center justify-center overflow-hidden">
                         <img 
                    src="./event2_img2.jpeg" 
                    alt="Event thumbnail" 
                    className="w-full h-auto object-contain"
                  />
                    </div>

                

                    <div className="bg-green-50 border-l-4 border-green-500 pl-6 py-4 mb-6">
                        <p className="text-gray-700 font-semibold">
                            As we continue building the Art Law Communion (ALC), moments like this remind us why these 
                            conversations matter. Here’s to many more spaces where we can talk, listen, question, and 
                            hopefully do better together!
                        </p>
                        <p className="text-gray-700 font-semibold">
                            What made the session even more meaningful was the people in the room. The audience was curious, 
                            generous, and so deeply engaged. We are grateful to everyone who brought their questions, 
                            their attentiveness, and their openness into the session.
                        </p>
                    </div>
                </div>

                {/* Key Takeaways Section */}
                <div className="mt-12 bg-gray-50 rounded-xl p-6 border border-gray-200">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Key Takeaways</h2>
                    <ul className="space-y-3 text-gray-700">
                        <li className="flex items-start">
                            <span className="text-blue-500 mr-3">•</span>
                            Shedding light on regulatory lacunae and exploitative culture in performing arts
                        </li>
                        <li className="flex items-start">
                            <span className="text-blue-500 mr-3">•</span>
                            Raw insights from a professional Manipuri dance performer's perspective
                        </li>
                        <li className="flex items-start">
                            <span className="text-blue-500 mr-3">•</span>
                            Addressing the "quieter, messier underside" of the industry behind the spotlight
                        </li>
                        <li className="flex items-start">
                            <span className="text-blue-500 mr-3">•</span>
                            Highlighting systemic gaps and silence that are rarely acknowledged
                        </li>
                        <li className="flex items-start">
                            <span className="text-blue-500 mr-3">•</span>
                            The importance of audience curiosity and open dialogue in driving change
                        </li>
                    </ul>
                </div>

                {/* Back to Events Link */}
                <div className="mt-12 text-center">
                     <Link
                        to={backPath}
                        className="self-start inline-block bg-blue-800 hover:bg-blue-900 text-white px-8 py-4 text-lg font-medium rounded-lg transition-colors duration-200"
                    >
                        Back to Events
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Event2;