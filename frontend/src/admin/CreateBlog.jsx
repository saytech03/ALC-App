import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Minus, Upload, X, Link as LinkIcon, Save, Edit3, Trash2, Search, BookOpen, FileText, ArrowLeft, RefreshCw } from 'lucide-react';
import { useAuth } from '../store/AuthContext';
import { toast } from 'react-hot-toast';
import AdNavbar from '../components/AdNavbar';

const CreateBlog = () => {
  const [activeTab, setActiveTab] = useState('manage'); // 'manage' or 'editor'
  const [editingBlogId, setEditingBlogId] = useState(null); // null if creating, string if editing
  const [loading, setLoading] = useState(false);
  const [blogsLoading, setBlogsLoading] = useState(false);
  const [blogsList, setBlogsList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [deleteModalBlog, setDeleteModalBlog] = useState(null);

  const initialFormState = {
    title: '',
    author: '',
    sections: [
      {
        heading: '',
        subHeading: '',
        body: '',
        images: [],
        references: ['']
      }
    ]
  };

  const [formData, setFormData] = useState(initialFormState);
  const [imagePreviews, setImagePreviews] = useState([]);

  const { createBlog, updateBlog, deleteBlog, getAllBlogs, adminToken } = useAuth();
  const navigate = useNavigate();

  // Load all blogs on component mount
  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    setBlogsLoading(true);
    try {
      const data = await getAllBlogs();
      if (Array.isArray(data)) {
        setBlogsList(data);
      } else if (data && Array.isArray(data.data)) {
        setBlogsList(data.data);
      } else if (data && Array.isArray(data.content)) {
        setBlogsList(data.content);
      } else {
        setBlogsList([]);
      }
    } catch (error) {
      console.warn('Failed to load blogs:', error);
      setBlogsList([]);
    } finally {
      setBlogsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData(initialFormState);
    setImagePreviews([]);
    setEditingBlogId(null);
  };

  const handleStartCreate = () => {
    resetForm();
    setActiveTab('editor');
  };

  const handleStartEdit = (blog) => {
    setEditingBlogId(blog.id || blog.blogId);
    setFormData({
      title: blog.title || '',
      author: blog.author || '',
      sections: blog.sections && blog.sections.length > 0 ? blog.sections.map(sec => ({
        heading: sec.heading || '',
        subHeading: sec.subHeading || '',
        body: sec.body || '',
        images: sec.images || [],
        references: sec.references && sec.references.length > 0 ? sec.references : ['']
      })) : [
        {
          heading: '',
          subHeading: '',
          body: '',
          images: [],
          references: ['']
        }
      ]
    });
    setActiveTab('editor');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteConfirm = async () => {
    if (!deleteModalBlog) return;
    const blogId = deleteModalBlog.id || deleteModalBlog.blogId;
    setLoading(true);
    try {
      await deleteBlog(blogId);
      toast.success('Blog deleted successfully!');
      setDeleteModalBlog(null);
      fetchBlogs();
    } catch (error) {
      console.error('Delete blog error:', error);
      toast.error(error.message || 'Failed to delete blog.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (sectionIndex, field, value) => {
    const updatedSections = [...formData.sections];
    updatedSections[sectionIndex][field] = value;
    setFormData({ ...formData, sections: updatedSections });
  };

  const handleReferenceChange = (sectionIndex, refIndex, value) => {
    const updatedSections = [...formData.sections];
    updatedSections[sectionIndex].references[refIndex] = value;
    setFormData({ ...formData, sections: updatedSections });
  };

  const addReference = (sectionIndex) => {
    const updatedSections = [...formData.sections];
    updatedSections[sectionIndex].references.push('');
    setFormData({ ...formData, sections: updatedSections });
  };

  const removeReference = (sectionIndex, refIndex) => {
    const updatedSections = [...formData.sections];
    updatedSections[sectionIndex].references.splice(refIndex, 1);
    setFormData({ ...formData, sections: updatedSections });
  };

  const addSection = () => {
    setFormData({
      ...formData,
      sections: [
        ...formData.sections,
        {
          heading: '',
          subHeading: '',
          body: '',
          images: [],
          references: ['']
        }
      ]
    });
  };

  const removeSection = (sectionIndex) => {
    if (formData.sections.length > 1) {
      const updatedSections = [...formData.sections];
      updatedSections.splice(sectionIndex, 1);
      setFormData({ ...formData, sections: updatedSections });
    }
  };

  const handleImageUpload = (sectionIndex, event) => {
    const files = Array.from(event.target.files);
    const updatedSections = [...formData.sections];
    
    updatedSections[sectionIndex].images = [
      ...updatedSections[sectionIndex].images,
      ...files
    ];
    
    setFormData({ ...formData, sections: updatedSections });
    const newPreviews = files.map(file => URL.createObjectURL(file));
    setImagePreviews(prev => [...prev, ...newPreviews]);
  };

  const removeImage = (sectionIndex, imageIndex) => {
    const updatedSections = [...formData.sections];
    updatedSections[sectionIndex].images.splice(imageIndex, 1);
    setFormData({ ...formData, sections: updatedSections });

    const updatedPreviews = [...imagePreviews];
    updatedPreviews.splice(imageIndex, 1);
    setImagePreviews(updatedPreviews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!formData.title.trim() || !formData.author.trim()) {
        throw new Error('Title and author are required');
      }

      if (formData.sections.some(section => !section.heading.trim())) {
        throw new Error('All sections must have a heading');
      }

      if (editingBlogId) {
        // UPDATE Existing Blog
        await updateBlog(editingBlogId, formData);
        toast.success('Blog updated successfully!');
      } else {
        // CREATE New Blog
        await createBlog(formData);
        toast.success('Blog created successfully!');
      }

      resetForm();
      fetchBlogs();
      setActiveTab('manage');
    } catch (error) {
      console.error('Blog submit error:', error);
      toast.error(error.message || 'Failed to save blog. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const filteredBlogs = blogsList.filter(blog => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return true;
    const title = (blog.title || 'Untitled Blog').toLowerCase();
    const author = (blog.author || 'Unknown Author').toLowerCase();
    const blogId = (blog.blogId || blog.id || '').toLowerCase();
    return title.includes(query) || author.includes(query) || blogId.includes(query);
  });

  return (
    <div className='min-h-screen w-full ai-bg text-gray-100 font-sans'>
      <AdNavbar />
      
      <div className="max-w-7xl mx-auto px-6 py-8 pt-32"> 
        {/* Header Title */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 bg-black/50 backdrop-blur-md p-6 rounded-2xl border border-white/10 shadow-2xl">
          <div>
            <h1 className="text-3xl font-extrabold text-white tracking-wide flex items-center gap-3">
              <BookOpen className="w-8 h-8 text-blue-400" />
              <span>Admin Blog Management Studio</span>
            </h1>
            <p className="text-gray-400 text-sm mt-1">
              Create, edit, manage, and publish legal articles & insights for Art Law Communion
            </p>
          </div>

          {/* Action Tabs */}
          <div className="flex items-center gap-3 bg-black/40 p-1.5 rounded-xl border border-white/10">
            <button
              onClick={() => {
                setActiveTab('manage');
                fetchBlogs();
              }}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                activeTab === 'manage'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Manage Blogs ({blogsList.length})</span>
            </button>
            <button
              onClick={handleStartCreate}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                activeTab === 'editor' && !editingBlogId
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Plus className="w-4 h-4" />
              <span>Create Blog</span>
            </button>
          </div>
        </div>

        {/* TAB 1: MANAGE BLOGS */}
        {activeTab === 'manage' && (
          <div className="space-y-6">
            {/* Search Bar & Refresh */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-black/40 backdrop-blur-md p-4 rounded-xl border border-white/10">
              <div className="relative w-full sm:w-96">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by title, author, or Blog ID..."
                  className="w-full pl-10 pr-4 py-2 bg-black/60 border border-gray-700 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>

              <button
                onClick={fetchBlogs}
                disabled={blogsLoading}
                className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm text-gray-300 hover:text-white transition-all disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${blogsLoading ? 'animate-spin' : ''}`} />
                <span>Refresh List</span>
              </button>
            </div>

            {/* Blogs List */}
            {blogsLoading ? (
              <div className="flex flex-col items-center justify-center py-20 bg-black/40 backdrop-blur-md rounded-2xl border border-white/10">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500 mb-4"></div>
                <p className="text-gray-400 text-sm">Loading blogs from database...</p>
              </div>
            ) : filteredBlogs.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 bg-black/40 backdrop-blur-md rounded-2xl border border-white/10 text-center px-4">
                <BookOpen className="w-16 h-16 text-gray-600 mb-4" />
                <h3 className="text-xl font-bold text-white mb-1">No Blogs Found</h3>
                <p className="text-gray-400 text-sm max-w-md mb-6">
                  {searchQuery ? `No blog matched "${searchQuery}".` : 'There are currently no blog articles published.'}
                </p>
                <button
                  onClick={handleStartCreate}
                  className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-lg transition-all"
                >
                  <Plus className="w-4 h-4" />
                  <span>Create Your First Blog</span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {filteredBlogs.map((blog) => (
                  <div
                    key={blog.id || blog.blogId}
                    className="bg-black/50 backdrop-blur-md rounded-xl p-6 border border-white/10 hover:border-blue-500/50 transition-all duration-200 flex flex-col md:flex-row md:items-center justify-between gap-6"
                  >
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-3">
                        <span className="px-2.5 py-1 text-xs font-mono font-semibold bg-blue-900/50 text-blue-300 border border-blue-700/50 rounded-md">
                          {blog.blogId || blog.id || 'NO_ID'}
                        </span>
                        <span className="text-xs text-gray-400">
                          {blog.createdAt ? new Date(blog.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' }) : 'Recent'}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-white tracking-wide">
                        {blog.title || 'Untitled Blog'}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-gray-400">
                        <span>Author: <strong className="text-gray-200">{blog.author || 'Unknown Author'}</strong></span>
                        <span>•</span>
                        <span>{blog.sections ? blog.sections.length : 0} Section(s)</span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-3 pt-4 md:pt-0 border-t md:border-t-0 border-white/10">
                      <button
                        onClick={() => handleStartEdit(blog)}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600/20 hover:bg-blue-600 text-blue-300 hover:text-white border border-blue-500/30 rounded-lg text-sm font-medium transition-all"
                      >
                        <Edit3 className="w-4 h-4" />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => setDeleteModalBlog(blog)}
                        className="flex items-center gap-2 px-4 py-2 bg-red-600/20 hover:bg-red-600 text-red-300 hover:text-white border border-red-500/30 rounded-lg text-sm font-medium transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: CREATE / EDIT BLOG FORM */}
        {activeTab === 'editor' && (
          <div className="bg-black/60 backdrop-blur-md rounded-2xl border border-white/10 shadow-2xl p-8">
            {/* Header */}
            <div className="flex items-center justify-between pb-6 mb-8 border-b border-white/10">
              <div>
                <h2 className="text-2xl font-bold text-white mb-1 flex items-center gap-2">
                  {editingBlogId ? (
                    <>
                      <Edit3 className="w-6 h-6 text-blue-400" />
                      <span>Editing Blog ({editingBlogId})</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-6 h-6 text-green-400" />
                      <span>Create New Blog Article</span>
                    </>
                  )}
                </h2>
                <p className="text-gray-400 text-sm">
                  {editingBlogId ? 'Modify the article details and save updates to MongoDB' : 'Draft and publish a new legal post for the community'}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setActiveTab('manage')}
                className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm text-gray-300 hover:text-white transition-all"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to List</span>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Basic Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-blue-400 border-b border-white/10 pb-2">
                  1. General Information
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Blog Title *
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                      placeholder="e.g., Understanding Copyright Assignment in Digital Art"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Author Name *
                    </label>
                    <input
                      type="text"
                      value={formData.author}
                      onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                      className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                      placeholder="e.g., Advocate Jane Doe"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Sections */}
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <h3 className="text-lg font-semibold text-blue-400">
                    2. Article Content Sections
                  </h3>
                  <button
                    type="button"
                    onClick={addSection}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-all"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Section</span>
                  </button>
                </div>

                {formData.sections.map((section, sectionIndex) => (
                  <div key={sectionIndex} className="bg-white/5 backdrop-blur-sm rounded-xl p-6 space-y-4 border border-white/10">
                    <div className="flex items-center justify-between">
                      <h4 className="text-md font-semibold text-gray-200">
                        Section {sectionIndex + 1}
                      </h4>
                      {formData.sections.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeSection(sectionIndex)}
                          className="text-red-400 hover:text-red-300 p-1 transition-colors"
                        >
                          <Minus className="w-5 h-5" />
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Heading *
                        </label>
                        <input
                          type="text"
                          value={section.heading}
                          onChange={(e) => handleInputChange(sectionIndex, 'heading', e.target.value)}
                          className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                          placeholder="Section main heading"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Subheading (Optional)
                        </label>
                        <input
                          type="text"
                          value={section.subHeading}
                          onChange={(e) => handleInputChange(sectionIndex, 'subHeading', e.target.value)}
                          className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                          placeholder="Optional subheading"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Body Content *
                      </label>
                      <textarea
                        value={section.body}
                        onChange={(e) => handleInputChange(sectionIndex, 'body', e.target.value)}
                        className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 resize-y"
                        placeholder="Write section body paragraph..."
                        rows={5}
                        required
                      />
                    </div>

                    {/* Image Upload */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Section Images
                      </label>
                      <div className="space-y-4">
                        <label className="flex flex-col items-center justify-center w-full h-28 border-2 border-dashed border-gray-700 hover:border-blue-500 rounded-xl cursor-pointer bg-black/40 transition-colors">
                          <div className="flex flex-col items-center justify-center pt-4 pb-4">
                            <Upload className="w-6 h-6 text-gray-400 mb-1" />
                            <p className="text-xs text-gray-400">Click to upload section graphics</p>
                          </div>
                          <input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={(e) => handleImageUpload(sectionIndex, e)}
                            className="hidden"
                          />
                        </label>

                        {section.images && section.images.length > 0 && (
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {section.images.map((image, imageIndex) => (
                              <div key={imageIndex} className="relative group rounded-lg overflow-hidden border border-gray-700">
                                <img
                                  src={typeof image === 'string' ? image : URL.createObjectURL(image)}
                                  alt={`Section ${sectionIndex} img ${imageIndex}`}
                                  className="w-full h-24 object-cover"
                                />
                                <button
                                  type="button"
                                  onClick={() => removeImage(sectionIndex, imageIndex)}
                                  className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 opacity-90 hover:opacity-100 transition-opacity"
                                >
                                  <X className="w-3 h-3" />
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* References */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="block text-sm font-medium text-gray-300">
                          Legal Citations / References
                        </label>
                        <button
                          type="button"
                          onClick={() => addReference(sectionIndex)}
                          className="flex items-center gap-1 text-blue-400 hover:text-blue-300 text-xs transition-colors"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add Link</span>
                        </button>
                      </div>

                      <div className="space-y-2">
                        {section.references.map((reference, refIndex) => (
                          <div key={refIndex} className="flex items-center gap-2">
                            <LinkIcon className="w-4 h-4 text-gray-500" />
                            <input
                              type="url"
                              value={reference}
                              onChange={(e) => handleReferenceChange(sectionIndex, refIndex, e.target.value)}
                              className="flex-1 px-4 py-2 bg-black/50 border border-gray-700 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                              placeholder="https://law-reference.org/case-123"
                            />
                            {section.references.length > 1 && (
                              <button
                                type="button"
                                onClick={() => removeReference(sectionIndex, refIndex)}
                                className="text-red-400 hover:text-red-300 p-1"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Submit Buttons */}
              <div className="flex justify-end gap-4 pt-6 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setActiveTab('manage')}
                  className="px-6 py-3 border border-gray-700 rounded-xl text-gray-300 hover:bg-white/5 transition-colors text-sm font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold hover:from-blue-500 hover:to-indigo-500 disabled:opacity-50 transition-all shadow-lg"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      <span>{editingBlogId ? 'Update Blog Article' : 'Publish Blog Article'}</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteModalBlog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-gray-900 border border-red-500/30 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center gap-3 text-red-400">
              <Trash2 className="w-6 h-6" />
              <h3 className="text-lg font-bold text-white">Delete Blog Post</h3>
            </div>
            <p className="text-sm text-gray-300">
              Are you sure you want to delete <strong className="text-white">"{deleteModalBlog.title}"</strong>? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3 pt-4 border-t border-gray-800">
              <button
                onClick={() => setDeleteModalBlog(null)}
                disabled={loading}
                className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm text-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                disabled={loading}
                className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-semibold transition-colors disabled:opacity-50"
              >
                {loading ? 'Deleting...' : 'Delete Permanently'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateBlog;