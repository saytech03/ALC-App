import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, ArrowLeft, Trash2, Plus, MessageSquare, X, Menu, Copy, Edit, Paperclip } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import toast from 'react-hot-toast';

const AiChat = () => {
  const { patronId } = useParams();
  const bottomRef = useRef(null);
  const fileInputRef = useRef(null);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [attachedFile, setAttachedFile] = useState(null);
  const [editingMessage, setEditingMessage] = useState(null);

  // Default welcome messages
  const getWelcomeMessages = () => [
    { 
      role: 'assistant', 
      content: "I am ManjuLex, the AI knowledge assistant of the Art Law Communion. My name draws inspiration from Manjushree, the Bodhisattva of wisdom in Buddhist tradition, revered across South and East Asia as a symbol of intellectual clarity and insight. Often depicted with a flaming sword that cuts through ignorance and a sacred manuscript representing knowledge, Manjushree embodies the pursuit of understanding. Guided by this spirit, I assist artists, scholars, collectors, and cultural institutions in navigating the legal worlds of art, heritage, and creativity.",
      timestamp: Date.now()
    },
    { 
      role: 'assistant', 
      content: "How may I help you?",
      timestamp: Date.now() + 1
    }
  ];

  // Initialize state
  const [chats, setChats] = useState([]);
  const [currentChatId, setCurrentChatId] = useState(null);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Load from localStorage
  useEffect(() => {
    const savedData = localStorage.getItem(`manjulex_chats_${patronId}`);
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        if (parsed.chats && parsed.chats.length > 0) {
          setChats(parsed.chats);
          setCurrentChatId(parsed.currentChatId || parsed.chats[0].id);
        } else {
          createNewChat(false);
        }
      } catch (e) {
        console.error("Error loading chats:", e);
        createNewChat(false);
      }
    } else {
      createNewChat(false);
    }
  }, [patronId]);

  // Save to localStorage whenever chats change
  useEffect(() => {
    if (chats.length > 0) {
      localStorage.setItem(`manjulex_chats_${patronId}`, JSON.stringify({
        chats,
        currentChatId
      }));
    }
  }, [chats, currentChatId, patronId]);

  // Auto-scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chats, currentChatId]);

  const createNewChat = (switchToIt = true) => {
    const newChat = {
      id: Date.now().toString(),
      title: 'New Conversation',
      createdAt: Date.now(),
      messages: getWelcomeMessages()
    };
    setChats(prev => [newChat, ...prev]);
    if (switchToIt) {
      setCurrentChatId(newChat.id);
      setIsSidebarOpen(false);
    }
    return newChat.id;
  };

  const deleteChat = (e, chatId) => {
    e.stopPropagation();
    if (window.confirm('Delete this conversation?')) {
      setChats(prev => {
        const filtered = prev.filter(c => c.id !== chatId);
        if (filtered.length === 0) {
          const newId = Date.now().toString();
          const newChat = {
            id: newId,
            title: 'New Conversation',
            createdAt: Date.now(),
            messages: getWelcomeMessages()
          };
          setCurrentChatId(newId);
          return [newChat];
        }
        if (currentChatId === chatId) {
          setCurrentChatId(filtered[0].id);
        }
        return filtered;
      });
    }
  };

  const selectChat = (chatId) => {
    setCurrentChatId(chatId);
    setIsSidebarOpen(false);
  };

  const getCurrentChat = () => {
    return chats.find(c => c.id === currentChatId) || chats[0];
  };

  const updateChatTitle = (chatId, firstMessage) => {
    setChats(prev => prev.map(chat => {
      if (chat.id === chatId && chat.title === 'New Conversation') {
        const title = firstMessage.length > 30 ? firstMessage.substring(0, 30) + '...' : firstMessage;
        return { ...chat, title };
      }
      return chat;
    }));
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) setAttachedFile(file);
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() && !attachedFile) return;

    const userContent = input.trim();
    const userMsg = { 
      role: 'user', 
      content: userContent,
      file: attachedFile ? attachedFile.name : null,
      timestamp: Date.now()
    };

    setChats(prev => prev.map(chat => {
      if (chat.id === currentChatId) {
        return { ...chat, messages: [...chat.messages, userMsg] };
      }
      return chat;
    }));

    const currentChat = getCurrentChat();
    if (currentChat.messages.filter(m => m.role === 'user').length === 0) {
      updateChatTitle(currentChatId, userContent || "Document Review");
    }

    setInput('');
    setAttachedFile(null);
    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append('user_message', userContent);
      if (attachedFile) formData.append('file', attachedFile);

      const res = await fetch('/api/chat', {
        method: 'POST',
        body: formData
      });

      const data = await res.json();
      
      const aiMsg = {
        role: 'assistant',
        content: data.reply,
        timestamp: Date.now()
      };

      setChats(prev => prev.map(chat => {
        if (chat.id === currentChatId) {
          return { ...chat, messages: [...chat.messages, aiMsg] };
        }
        return chat;
      }));

    } catch (error) {
      console.error(error);
      setChats(prev => prev.map(chat => {
        if (chat.id === currentChatId) {
          return { ...chat, messages: [...chat.messages, { 
            role: 'assistant', 
            content: "I'm having trouble connecting to the legal database right now. Please try again.",
            timestamp: Date.now()
          }]};
        }
        return chat;
      }));

    } finally {
      setIsLoading(false);
    }
  };

  const currentChat = getCurrentChat();

  // Background pattern with art/law doodles (scales, brush, document, gavel)
  const doodlePattern = `url(./doodleartlaw.webp)`;

  return (
    <div className="flex h-screen bg-zinc-900 font-sans">
      
      {/* Hidden file input */}
      <input 
        ref={fileInputRef} 
        type="file" 
        accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
        className="hidden"
        onChange={handleFileSelect}
      />

      {/* Sidebar - Chat History (Darker theme) */}
      <div className={`${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} fixed inset-y-0 left-0 z-50 w-64 bg-zinc-800 border-r border-zinc-700 transform transition-transform duration-200 ease-in-out md:relative md:translate-x-0 flex flex-col`}>
        
        <div className="p-4 border-b border-zinc-700 bg-zinc-900">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-serif font-bold text-lg text-white">ManjuLex</h2>
            <button onClick={() => setIsSidebarOpen(false)} className="md:hidden text-zinc-400">
              <X size={20} />
            </button>
          </div>
          <button 
            onClick={() => createNewChat(true)}
            className="w-full flex items-center justify-center gap-2 bg-zinc-700 text-white py-2 px-4 rounded hover:bg-zinc-600 transition text-sm font-medium border border-zinc-600"
          >
            <Plus size={16} /> New Chat
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {chats.map(chat => (
            <div 
              key={chat.id}
              onClick={() => selectChat(chat.id)}
              className={`group flex items-center justify-between p-3 rounded cursor-pointer transition text-sm ${
                currentChatId === chat.id 
                  ? 'bg-zinc-700 border border-zinc-600 shadow-sm text-white' 
                  : 'hover:bg-zinc-700/50 text-zinc-300'
              }`}
            >
              <div className="flex items-center gap-2 overflow-hidden">
                <MessageSquare size={14} className="shrink-0" />
                <span className="truncate font-medium">{chat.title}</span>
              </div>
              <button 
                onClick={(e) => deleteChat(e, chat.id)}
                className="opacity-0 group-hover:opacity-100 text-zinc-500 hover:text-red-400 transition p-1"
                title="Delete chat"
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-zinc-700 bg-zinc-900 text-xs text-zinc-500 text-center">
          Conversations saved locally
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col h-full bg-zinc-900">
        
        {/* Header */}
        <div className="bg-zinc-800/80 backdrop-blur border-b border-zinc-700 px-4 py-3 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <button onClick={() => setIsSidebarOpen(true)} className="md:hidden text-zinc-400 p-1">
              <Menu size={20} />
            </button>
            <Link to={`/${patronId}/h`} className="text-zinc-400 hover:text-white transition">
              <ArrowLeft size={20} />
            </Link>
            <div>
              <h1 className="text-lg font-bold font-serif text-white">
                {currentChat?.title || 'ManjuLex'}
              </h1>
              <p className="text-xs text-zinc-400 flex items-center gap-1">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span> Online
              </p>
            </div>
          </div>
        </div>

        {/* Messages with Doodle Background */}
        <div 
          className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6 relative"
          style={{ 
            backgroundColor: '#5f5f6a', // zinc-900
            backgroundImage: doodlePattern,
            backgroundRepeat: 'repeat'
          }}
        >
          {currentChat?.messages.map((msg, idx) => (
            <div key={idx} className={`flex gap-4 group ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              
              {msg.role === 'assistant' && (
                <div className="w-8 h-8 rounded-full bg-zinc-700 flex items-center justify-center shrink-0 border border-zinc-600 mt-1">
                  <Bot size={16} className="text-zinc-200" />
                </div>
              )}

              <div className={`max-w-[85%] md:max-w-[75%] p-4 shadow-lg text-sm leading-relaxed ${
                msg.role === 'user' 
                  ? 'bg-black text-white rounded-tr-lg rounded-bl-lg rounded-tl-lg border border-zinc-800' 
                  : 'bg-zinc-800 text-zinc-100 rounded-tl-lg rounded-br-lg rounded-tr-lg border border-zinc-700'
              }`}>

                {msg.file && <div className="text-xs mb-2 opacity-70 flex items-center gap-1">📎 {msg.file}</div>}

                {msg.role === 'assistant' ? (
                  <div className="prose prose-sm max-w-none prose-p:my-1 prose-ul:my-1 prose-ol:my-1 prose-li:my-0.5 prose-invert">
                    <ReactMarkdown 
                      components={{
                        strong: ({node, ...props}) => <span className="font-bold text-white" {...props} />,
                        em: ({node, ...props}) => <span className="italic text-zinc-300" {...props} />,
                        ul: ({node, ...props}) => <ul className="list-disc pl-4 my-2 space-y-1 text-zinc-300" {...props} />,
                        ol: ({node, ...props}) => <ol className="list-decimal pl-4 my-2 space-y-1 text-zinc-300" {...props} />,
                        li: ({node, ...props}) => <li className="text-zinc-300" {...props} />,
                        p: ({node, ...props}) => <p className="mb-2 last:mb-0 text-zinc-200" {...props} />,
                      }}
                    >
                      {msg.content}
                    </ReactMarkdown>
                  </div>
                ) : (
                  <div className="whitespace-pre-wrap">{msg.content}</div>
                )}

                {/* Message Action Buttons */}
                <div className="mt-2 flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={() => copyToClipboard(msg.content)}
                    className="p-1 text-zinc-500 hover:text-white transition"
                    title="Copy"
                  >
                    <Copy size={14} />
                  </button>
                  {msg.role === 'user' && (
                    <button 
                      onClick={() => setInput(msg.content)}
                      className="p-1 text-zinc-500 hover:text-white transition"
                      title="Edit and resend"
                    >
                      <Edit size={14} />
                    </button>
                  )}
                </div>

              </div>

              {msg.role === 'user' && (
                <div className="w-8 h-8 rounded-full bg-zinc-700 flex items-center justify-center shrink-0 border border-zinc-600 mt-1">
                  <User size={16} className="text-zinc-200" />
                </div>
              )}
            </div>
          ))}
          
          {isLoading && (
            <div className="flex gap-4 justify-start">
              <div className="w-8 h-8 rounded-full bg-zinc-700 flex items-center justify-center border border-zinc-600">
                <Bot size={16} className="text-zinc-200" />
              </div>
              <div className="bg-zinc-800 p-4 rounded-tl-lg rounded-br-lg rounded-tr-lg border border-zinc-700">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce delay-75"></div>
                  <div className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce delay-150"></div>
                </div>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input Area */}
        <div className="bg-zinc-900 p-4 border-t border-zinc-700 shrink-0">

          {attachedFile && (
            <div className="max-w-4xl mx-auto mb-2 flex items-center justify-between bg-zinc-800 p-2 rounded text-xs text-zinc-300 border border-zinc-700">
              <span>📎 {attachedFile.name}</span>
              <button onClick={() => setAttachedFile(null)} className="text-zinc-400 hover:text-white">✕</button>
            </div>
          )}

          <form onSubmit={handleSend} className="max-w-4xl mx-auto flex gap-3">
            <button 
              type="button"
              onClick={() => fileInputRef.current.click()}
              className="bg-zinc-800 text-zinc-300 p-3 rounded-lg hover:bg-zinc-700 transition border border-zinc-700"
              title="Attach file"
            >
              <Paperclip size={20} />
            </button>

            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about art law..." 
              className="flex-1 bg-zinc-800 border border-zinc-700 rounded-lg px-6 py-3 focus:ring-1 focus:ring-zinc-500 focus:border-zinc-500 outline-none transition-all text-white placeholder-zinc-500"
            />
            <button 
              type="submit" 
              disabled={isLoading}
              className="bg-zinc-700 text-white p-3 px-6 rounded-lg hover:bg-zinc-600 disabled:opacity-50 disabled:cursor-not-allowed transition border border-zinc-600"
            >
              <Send size={20} />
            </button>
          </form>
          <p className="text-xs text-zinc-600 text-center mt-2">
            ManjuLex can make mistakes. Please verify important legal information.
          </p>
        </div>

      </div>
    </div>
  );
};

export default AiChat;