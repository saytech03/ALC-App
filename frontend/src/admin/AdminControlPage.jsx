import { useState, useEffect } from 'react';
import { 
  FileText, 
  Calendar, 
  Globe, 
  ShieldCheck, 
  Terminal, 
  ExternalLink,
  Cpu,
  Database,
  ArrowUpRight,
  RefreshCw,
  Sliders
} from 'lucide-react';
import AdNavbar from '../components/AdNavbar';
import { Link } from "react-router-dom";
import { useAuth } from '../store/AuthContext';

const Adcontrol = () => {
  const [blogCount, setBlogCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const { getAllBlogs } = useAuth();

  useEffect(() => {
    fetchQuickData();
  }, []);

  const fetchQuickData = async () => {
    setLoading(true);
    try {
      const data = await getAllBlogs();
      if (Array.isArray(data)) {
        setBlogCount(data.length);
      } else if (data && Array.isArray(data.data)) {
        setBlogCount(data.data.length);
      }
    } catch (e) {
      console.warn('Admin quick data fetch error:', e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full ai-bg text-gray-100 font-sans">
      <AdNavbar />

      <div className="max-w-6xl mx-auto px-6 py-8 pt-32 space-y-8">
        
        {/* DEVELOPER HEADER */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-semibold text-blue-400 mb-1">
              <Terminal className="w-4 h-4" />
              <span>DEVELOPER ADMIN CONSOLE</span>
            </div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">
              Platform Control Panel
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchQuickData}
              disabled={loading}
              className="flex items-center gap-2 px-3.5 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs font-mono text-gray-300 transition-colors"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span>Sync</span>
            </button>
            <Link
              to="/"
              target="_blank"
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold transition-colors"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>View Main Site</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* CORE MANAGEMENT DIRECTORY */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Card 1: Blog Management */}
          <div className="bg-black/60 backdrop-blur-md rounded-2xl border border-white/10 p-6 flex flex-col justify-between hover:border-blue-500/40 transition-colors">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-blue-500/10 text-blue-400 rounded-xl border border-blue-500/20">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-white">Blog Manager</h2>
                    <p className="text-xs text-gray-400">CRUD operations & Markdown editor</p>
                  </div>
                </div>
                <span className="text-xs font-mono px-2.5 py-1 bg-blue-950/60 text-blue-300 border border-blue-800/40 rounded-md">
                  {blogCount} Posts
                </span>
              </div>
              <p className="text-sm text-gray-300">
                Create new articles, edit existing blog entries, manage section images, and update references.
              </p>
            </div>

            <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs font-mono text-gray-500">Route: /cb</span>
              <Link
                to="/cb"
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-lg transition-colors"
              >
                <span>Manage Blogs</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 2: Event Management */}
          <div className="bg-black/60 backdrop-blur-md rounded-2xl border border-white/10 p-6 flex flex-col justify-between hover:border-indigo-500/40 transition-colors">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-indigo-500/10 text-indigo-400 rounded-xl border border-indigo-500/20">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-white">Event Manager</h2>
                    <p className="text-xs text-gray-400">Upcoming & archived event controls</p>
                  </div>
                </div>
                <span className="text-xs font-mono px-2.5 py-1 bg-indigo-950/60 text-indigo-300 border border-indigo-800/40 rounded-md">
                  Events API
                </span>
              </div>
              <p className="text-sm text-gray-300">
                Configure upcoming events, manage speaker bios, update registration windows, and view participant lists.
              </p>
            </div>

            <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs font-mono text-gray-500">Route: /ce</span>
              <Link
                to="/ce"
                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-lg transition-colors"
              >
                <span>Manage Events</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Adcontrol;
