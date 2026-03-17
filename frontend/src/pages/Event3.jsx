import React, { useState, useEffect } from 'react';
import AltNavbar from '../components/AltNavbar';
import { Link } from "react-router-dom";

function Event3() {
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
                       In Conversation with Dr. Arshiya Sethi
                    </h1>
                    <div className="flex flex-col md:flex-row justify-center items-center gap-4 text-gray-600">
                        <p className="text-lg font-medium">Dr. Arshiya Sethi</p>
                        <span className="hidden md:block">•</span>
                        <p className="text-lg">Hands On: Sexual Harassment in the Creative Industry</p>
                        <span className="hidden md:block">•</span>
                        <p className="text-lg">February 20, 2026</p>
                    </div>
                </div>

                {/* Image Placeholder 1 - Fixed to show full image 
                <div className="mb-8 bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden">
                    <img 
                    src="./event2_img.jpeg" 
                    alt="Dr. Arshiya Sethi Event" 
                    className="w-full h-auto object-contain"
                  />
                </div>*/}

                {/* Event Content */}
                <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-6">
                    <p className="font-semibold text-gray-700">
                        On 20 February, the Art Law Communion (ALC), in collaboration with the NUJS Weekend Lecture Series, hosted a powerful and deeply reflective session titled “In Conversation With: Dr. Arshiya Sethi – Hands On: Sexual Harassment in the Creative Industry.”
                    </p>

                    <p className="text-gray-700">
                        The discussion brought together students, scholars, and members of the artistic community to examine a critical but often under-discussed issue within the cultural sector: the realities of harassment, power, and accountability in the arts.
                    </p>

                    <p className="text-gray-700">
                        The session featured Dr. Arshiya Sethi, a leading artivist, independent scholar, cultural administrator, and advocate for equity in the performing arts. Known for her work at the intersection of culture, activism, and scholarship, Dr. Sethi has long been a prominent voice addressing structural challenges within artistic spaces. The conversation drew on her extensive experience as a trained Kathak practitioner, critic, academic, and founder of initiatives such as the Kri Foundation and the advocacy platform Unmute.
                    </p>

                    <div className="bg-blue-50 border-l-4 border-blue-500 pl-6 py-4 my-8">
                        <p className="text-gray-700 italic">
                            Dr. Sethi unpacked the idea of “artivism”—a term she uses to describe the intersection of artistic practice and social activism. She emphasized that art is not merely an aesthetic pursuit but also a site of social power, responsibility, and dialogue. Through artivism, artists and cultural workers can challenge entrenched hierarchies and address systemic inequities that often remain invisible within creative industries.
                        </p>
                    </div>

                    {/* Image Placeholder 2 - Fixed to show full image */}  
                    <div className="my-8 bg-gray-200 rounded-lg w-full flex items-center justify-center overflow-hidden">
                         <img 
                    src="./Arshiya2.jpeg" 
                    alt="Event Discussion" 
                    className="w-full h-auto object-contain"
                  />
                    </div>
                     <div className="bg-green-50 border-l-4 border-green-500 pl-6 py-4 my-8">


                    <p className="text-gray-700">
                        A central theme of the discussion was the persistence of harassment and exploitation within artistic spaces, particularly where traditional hierarchies of mentorship and authority exist. Dr. Sethi spoke about how power structures embedded in the guru–shishya tradition and other forms of artistic training can sometimes blur the boundaries between mentorship, authority, and consent. She stressed that reverence for artistic lineage must never come at the cost of personal autonomy or safety.
                    </p>

                    <p className="text-gray-700">
                        The conversation also explored the legal frameworks available to address harassment in creative workplaces. While India’s Sexual Harassment of Women at Workplace (Prevention, Prohibition and Redressal) Act, 2013 provides an important statutory mechanism, Dr. Sethi pointed out that the informal and decentralized nature of many artistic environments often complicates its implementation. Many performers, especially freelancers and independent artists, operate outside formal institutional structures, making access to redressal mechanisms uneven and sometimes inaccessible.
                    </p>

                    <p className="text-gray-700">
                        In this context, the discussion addressed the issue of grooming, highlighting how prolonged mentorship relationships may sometimes create environments where emotional dependence and professional aspiration can be manipulated. Dr. Sethi noted that awareness, transparency, and institutional accountability are essential to ensuring that artistic training spaces remain safe and ethical.
                    </p>

                        <p className="text-gray-700 font-semibold mb-2">
                             Another important dimension of the session was the need to recognize and protect individuals across the gender spectrum within creative industries.
                        </p>
                        <p className="text-gray-700">
                             Many performance traditions involve physical proximity and bodily expression, which makes questions of consent, respect, and inclusivity especially significant. Dr. Sethi emphasized that conversations around harassment must include the experiences of diverse gender identities and acknowledge the vulnerabilities that may arise in such contexts.
                        </p>

                    <p className="text-gray-700">
                         The session also reflected on how arts organizations and collectives can develop internal accountability structures even when formal mechanisms are absent. Dr. Sethi highlighted the importance of community-driven redressal systems, ethical guidelines, and greater awareness about legal rights within the cultural sector. Initiatives such as Unmute, she noted, attempt to bridge the gap between artists and legal knowledge by fostering advocacy, dialogue, and support networks.
                    </p>

                    <p className="text-gray-700">
                        The conversation concluded with an engaging Q&A session, where participants raised thoughtful questions about institutional reform, artistic pedagogy, and the evolving role of law in safeguarding creative communities. The dialogue underscored the need for sustained engagement between artists, legal scholars, and cultural institutions to build safer and more equitable artistic ecosystems.
                    </p>

                    <p className="font-semibold text-gray-900 mt-6">
                        Through this session, the Art Law Communion reaffirmed its commitment to creating spaces where law and culture intersect in meaningful ways. By facilitating conversations on pressing issues such as harassment and accountability in the arts, ALC seeks to nurture a growing community dedicated to critical reflection, legal awareness, and ethical artistic practice.
                    </p>
                    </div>
                </div>

                {/* Key Takeaways Section */}
                <div className="mt-12 bg-gray-50 rounded-xl p-6 border border-gray-200">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Key Takeaways</h2>
                    <ul className="space-y-3 text-gray-700">
                        <li className="flex items-start">
                            <span className="text-blue-500 mr-3">•</span>
                            <strong>Concept of "Artivism":</strong> Intersection of artistic practice and social activism to challenge hierarchies.
                        </li>
                        <li className="flex items-start">
                            <span className="text-blue-500 mr-3">•</span>
                            <strong>Power Dynamics:</strong> Examining how traditional mentorship (guru-shishya) can blur boundaries of consent.
                        </li>
                        <li className="flex items-start">
                            <span className="text-blue-500 mr-3">•</span>
                            <strong>Legal Gaps:</strong> Informal nature of creative work complicates implementation of the POSH Act, 2013.
                        </li>
                        <li className="flex items-start">
                            <span className="text-blue-500 mr-3">•</span>
                            <strong>Inclusivity:</strong> Need to protect individuals across the gender spectrum given physical nature of performance.
                        </li>
                        <li className="flex items-start">
                            <span className="text-blue-500 mr-3">•</span>
                            <strong>Community Solutions:</strong> Importance of internal accountability structures and initiatives like 'Unmute'.
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

export default Event3;