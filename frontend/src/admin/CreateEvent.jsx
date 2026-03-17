import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Calendar, MapPin, Upload, X, Save, 
  Search, Trash2, Edit, Archive, CheckCircle, 
  Clock, Type
} from 'lucide-react';
// import { useAuth } from '../store/AuthContext'; // Uncomment when connecting API
import { toast } from 'react-hot-toast';
import AdNavbar from '../components/AdNavbar';

const CreateEvent = () => {
  const navigate = useNavigate();
  // const { createEvent, ... } = useAuth(); // Placeholder for Auth Context

  // State to switch between "Create" and "Manage" views based on your requirements
  const [activeTab, setActiveTab] = useState('create'); 
  const [loading, setLoading] = useState(false);

  // --- CREATE FORM STATE ---
  const [eventData, setEventData] = useState({
    title: '',
    date: '',
    time: '',
    location: '',
    description: '',
    status: 'upcoming', // Default status
    image: null
  });
  const [imagePreview, setImagePreview] = useState(null);

  // --- MANAGE/SEARCH STATE ---
  const [searchParams, setSearchParams] = useState({
    eventId: '',
    status: 'all' 
  });
  const [searchResults, setSearchResults] = useState(null); // To store found events

  // --- HANDLERS FOR CREATE ---
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEventData({ ...eventData, image: file });
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // VALIDATION
      if (!eventData.title || !eventData.date) {
        throw new Error("Title and Date are required");
      }

      // API CALL PLACEHOLDER
      console.log("Creating Event:", eventData);
      // await createEvent(eventData);

      toast.success('Event created successfully!');
      
      // Reset Form
      setEventData({
        title: '', date: '', time: '', location: '', description: '', status: 'upcoming', image: null
      });
      setImagePreview(null);
      
    } catch (error) {
      console.error(error);
      toast.error(error.message || 'Failed to create event');
    } finally {
      setLoading(false);
    }
  };

  // --- HANDLERS FOR MANAGE (Based on screenshot requirements) ---
  const handleSearch = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate search API call
    setTimeout(() => {
      setLoading(false);
      toast.success("Search functionality will connect to API");
      // Mock result for UI demonstration
      setSearchResults({ 
        id: searchParams.eventId || 'EVT-123', 
        title: 'Mock Event Result', 
        status: 'upcoming' 
      });
    }, 500);
  };

  const handleDelete = (id) => {
    if(window.confirm(`Are you sure you want to delete Event ID: ${id}?`)) {
      toast.success(`Event ${id} deleted`);
      // Call Delete API here
    }
  };

  const handleChangeStatus = (id, newStatus) => {
    toast.success(`Event ${id} status changed to ${newStatus}`);
    // Call Update Status API here
  }

  return (
    <div className='min-h-screen w-full ai-bg'> {/* Placeholder class for BG */}
      <AdNavbar />
      
      {/* Container with pt-32 spacing matching CreateBlog */}
      <div className="max-w-6xl mx-auto px-6 py-8 pt-32"> 
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden">
          
          {/* Header & Tabs */}
          <div className="p-8 pb-0 border-b border-gray-200">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Events API (Admin Only)</h1>
            
            <div className="flex space-x-6">
              <button 
                onClick={() => setActiveTab('create')}
                className={`pb-4 px-2 text-sm font-medium transition-colors border-b-2 ${
                  activeTab === 'create' 
                    ? 'border-blue-600 text-blue-600' 
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Create Upcoming Event
                </div>
              </button>
              <button 
                onClick={() => setActiveTab('manage')}
                className={`pb-4 px-2 text-sm font-medium transition-colors border-b-2 ${
                  activeTab === 'manage' 
                    ? 'border-blue-600 text-blue-600' 
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                 <div className="flex items-center gap-2">
                  <Search className="w-4 h-4" />
                  Manage, Edit & Search
                </div>
              </button>
            </div>
          </div>

          <div className="p-8">
            
            {/* ================= TAB 1: CREATE EVENT ================= */}
            {activeTab === 'create' && (
              <form onSubmit={handleCreateSubmit} className="space-y-8 animate-in fade-in duration-300">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Title */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Event Title *</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Type className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        value={eventData.title}
                        onChange={(e) => setEventData({ ...eventData, title: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white/80"
                        placeholder="Ex: Art Law Symposium 2024"
                        required
                      />
                    </div>
                  </div>

                  {/* Date */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Date *</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Calendar className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="date"
                        value={eventData.date}
                        onChange={(e) => setEventData({ ...eventData, date: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white/80"
                        required
                      />
                    </div>
                  </div>

                  {/* Time */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Clock className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="time"
                        value={eventData.time}
                        onChange={(e) => setEventData({ ...eventData, time: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white/80"
                      />
                    </div>
                  </div>

                  {/* Location */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Location / Link</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <MapPin className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        value={eventData.location}
                        onChange={(e) => setEventData({ ...eventData, location: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white/80"
                        placeholder="Ex: Zoom Link or Physical Address"
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                    <textarea
                      value={eventData.description}
                      onChange={(e) => setEventData({ ...eventData, description: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 resize-none bg-white/80"
                      rows={4}
                      placeholder="Event details..."
                    />
                  </div>

                  {/* Image Upload */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Event Poster/Image</label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center bg-white/50 hover:border-blue-500 transition-colors">
                      {imagePreview ? (
                        <div className="relative w-full max-w-sm">
                          <img src={imagePreview} alt="Preview" className="w-full h-48 object-cover rounded-lg" />
                          <button 
                            type="button"
                            onClick={() => { setImagePreview(null); setEventData({...eventData, image: null}) }}
                            className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-1 shadow-md hover:bg-red-700"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <label className="cursor-pointer flex flex-col items-center">
                          <Upload className="w-10 h-10 text-gray-400 mb-2" />
                          <span className="text-sm text-gray-500">Click to upload image</span>
                          <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                        </label>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex items-center space-x-2 px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors shadow-lg"
                  >
                    {loading ? (
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    ) : (
                      <>
                        <Save className="w-5 h-5" />
                        <span>Create Upcoming Event</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}

            {/* ================= TAB 2: MANAGE / EDIT / DELETE / ARCHIVE ================= */}
            {activeTab === 'manage' && (
              <div className="space-y-8 animate-in fade-in duration-300">
                
                {/* Search Section */}
                <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Search className="w-5 h-5" /> Search Events
                  </h3>
                  <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <input 
                      type="text" 
                      placeholder="Enter Event ID"
                      value={searchParams.eventId}
                      onChange={(e) => setSearchParams({...searchParams, eventId: e.target.value})}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                    <select 
                      value={searchParams.status}
                      onChange={(e) => setSearchParams({...searchParams, status: e.target.value})}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="all">All Status</option>
                      <option value="upcoming">Upcoming</option>
                      <option value="archived">Archived</option>
                    </select>
                    <button type="submit" className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-black transition-colors">
                      Search
                    </button>
                  </form>
                </div>

                {/* Mock Results Area */}
                {searchResults && (
                  <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                      <div>
                        <h4 className="font-bold text-xl">{searchResults.title}</h4>
                        <p className="text-sm text-gray-500">ID: {searchResults.id}</p>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mt-2
                          ${searchResults.status === 'upcoming' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                          {searchResults.status.toUpperCase()}
                        </span>
                      </div>

                      <div className="flex gap-3">
                        {/* Action Buttons from Screenshot Requirements */}
                        
                        {/* 1. Change Status */}
                        {searchResults.status === 'upcoming' ? (
                          <button 
                            onClick={() => handleChangeStatus(searchResults.id, 'archived')}
                            className="flex items-center gap-1 px-3 py-2 bg-amber-100 text-amber-800 rounded-lg hover:bg-amber-200 transition-colors text-sm"
                            title="Move to Archived"
                          >
                            <Archive className="w-4 h-4" /> Archive
                          </button>
                        ) : (
                          <button 
                            onClick={() => handleChangeStatus(searchResults.id, 'upcoming')}
                            className="flex items-center gap-1 px-3 py-2 bg-green-100 text-green-800 rounded-lg hover:bg-green-200 transition-colors text-sm"
                            title="Move to Upcoming"
                          >
                            <CheckCircle className="w-4 h-4" /> Restore
                          </button>
                        )}

                        {/* 2. Edit */}
                        <button 
                          className="flex items-center gap-1 px-3 py-2 bg-blue-100 text-blue-800 rounded-lg hover:bg-blue-200 transition-colors text-sm"
                        >
                          <Edit className="w-4 h-4" /> Edit
                        </button>

                        {/* 3. Delete */}
                        <button 
                          onClick={() => handleDelete(searchResults.id)}
                          className="flex items-center gap-1 px-3 py-2 bg-red-100 text-red-800 rounded-lg hover:bg-red-200 transition-colors text-sm"
                        >
                          <Trash2 className="w-4 h-4" /> Delete
                        </button>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Fallback/Empty State for Manage Tab */}
                {!searchResults && (
                  <div className="text-center py-12 text-gray-400">
                    <Search className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>Search for an event by ID to Manage, Edit, or Delete.</p>
                  </div>
                )}

              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateEvent;