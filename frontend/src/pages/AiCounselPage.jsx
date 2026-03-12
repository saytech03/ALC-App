import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import AgentChatWindow from '../components/Ai/AgentChatWindow';
import ContractPreview from '../components/Ai/ContractPreview';

const AiCounselPage = () => {
  // Agentic State
  const [messages, setMessages] = useState([
    { role: 'agent', content: "I am your Art Law Counsel. Do you need to draft a Consignment Agreement or review a Sale Contract?" }
  ]);
  const [generatedContract, setGeneratedContract] = useState(null); // The "Tool" output
  const [isThinking, setIsThinking] = useState(false);

  const handleSendMessage = async (userText) => {
    // 1. Add user message to UI
    setMessages(prev => [...prev, { role: 'user', content: userText }]);
    setIsThinking(true);

    // 2. Call your friend's Backend
    try {
      const response = await fetch('YOUR_RENDER_BACKEND_URL/api/agent/draft', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: userText, history: messages })
      });
      
      const data = await response.json();

      // 3. AGENTIC LOGIC: Check if the AI decided to use a "Tool"
      if (data.action === 'DRAFT_CONTRACT') {
        // The agent didn't just talk, it created a document
        setGeneratedContract(data.contractData);
        setMessages(prev => [...prev, { role: 'agent', content: "I've drafted a preliminary agreement based on your terms. You can view it on the right." }]);
      } else {
        // Normal conversation
        setMessages(prev => [...prev, { role: 'agent', content: data.reply }]);
      }
    } catch (error) {
      console.error("Agent failed", error);
    } finally {
      setIsThinking(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <div className="flex flex-1 p-6 gap-6 max-w-7xl mx-auto w-full">
        {/* Left: Chat Interface */}
        <div className="w-1/2 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
            <AgentChatWindow 
                messages={messages} 
                onSend={handleSendMessage} 
                isThinking={isThinking} 
            />
        </div>

        {/* Right: Agent's Workspace (Where the magic happens) */}
        <div className="w-1/2">
            {generatedContract ? (
                <ContractPreview data={generatedContract} />
            ) : (
                <div className="h-full flex items-center justify-center text-gray-400 border-2 border-dashed border-gray-300 rounded-xl">
                    <p>Agent workspace empty. Ask to draft a document.</p>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default AiCounselPage;