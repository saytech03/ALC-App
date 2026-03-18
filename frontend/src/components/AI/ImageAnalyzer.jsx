import React, { useState } from 'react';

const ImageAnalyzer = () => {
  const [analysis, setAnalysis] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('art_image', file);

    // Call backend agent
    const res = await fetch('YOUR_RENDER_BACKEND/api/agent/analyze-image', {
        method: 'POST',
        body: formData
    });
    const data = await res.json();
    setAnalysis(data); // Backend returns structured risk assessment
  };

  return (
    <div className="p-4 bg-white rounded shadow">
        <h3 className="font-bold text-lg mb-4">Copyright Risk Agent</h3>
        <input type="file" onChange={handleImageUpload} className="mb-4" />
        
        {analysis && (
            <div className="border-l-4 border-yellow-500 pl-4 bg-yellow-50 p-4">
                <p className="font-bold">Agent Risk Assessment:</p>
                <p>Confidence: {analysis.confidenceScore}%</p>
                <p>Potential Infringement: {analysis.flagged ? "Yes" : "No"}</p>
                <p className="text-sm text-gray-600">{analysis.reasoning}</p>
            </div>
        )}
    </div>
  );
};