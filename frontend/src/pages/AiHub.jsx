import React from 'react';
import { Link, useParams } from 'react-router-dom'; // Import useParams
import { ShieldAlert, MessageSquare } from 'lucide-react';

const AiHub = () => {
  // Grab the patronId from the URL to build correct links
  const { patronId } = useParams();

  return (
    <div className="min-h-screen bg-gray-50 p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-serif font-bold text-gray-900 mb-4">
            Art Law Communion <span className="text-purple-600">AI Agents</span>
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Leverage our specialized AI agents to protect your creative legacy. 
            Draft contracts, audit risks, and get instant legal guidance.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          
          {/* Card 1: Contract Scanner */}
          <Link to={`/${patronId}/ai/scanner`} className="group bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all border border-gray-100 hover:border-purple-200">
            <div className="bg-purple-100 w-14 h-14 rounded-full flex items-center justify-center mb-6 group-hover:bg-purple-600 transition-colors">
              <ShieldAlert className="w-8 h-8 text-purple-600 group-hover:text-white transition-colors" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Contract Risk Scanner</h2>
            <p className="text-gray-500 mb-4">
              Paste any gallery agreement or consignment contract. Our agent identifies dangerous clauses, missing protections, and gives a risk score.
            </p>
            <span className="text-purple-600 font-semibold group-hover:translate-x-2 inline-flex items-center transition-transform">
              Start Audit &rarr;
            </span>
          </Link>

          {/* Card 2: General Counsel Chat */}
          <Link to={`/${patronId}/ai/chat`} className="group bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all border border-gray-100 hover:border-blue-200">
            <div className="bg-blue-100 w-14 h-14 rounded-full flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors">
              <MessageSquare className="w-8 h-8 text-blue-600 group-hover:text-white transition-colors" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Art Counsel Chat</h2>
            <p className="text-gray-500 mb-4">
              Ask specific questions about copyright, estate planning, or provenance. Trained on Kenyon Clarke’s legal frameworks.
            </p>
            <span className="text-blue-600 font-semibold group-hover:translate-x-2 inline-flex items-center transition-transform">
              Start Chat &rarr;
            </span>
          </Link>

        </div>
      </div>
    </div>
  );
};

export default AiHub;