import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Minus, Upload, X, Image as ImageIcon, Link, Save } from 'lucide-react';
import { useAuth } from '../store/AuthContext';
import { toast } from 'react-hot-toast';
import AdNavbar from '../components/AdNavbar';

const CreateBlog = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
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
  });
  const [imagePreviews, setImagePreviews] = useState([]);

  const { createBlog, adminToken } = useAuth();
  const navigate = useNavigate();

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
    
    // Add files to the section
    updatedSections[sectionIndex].images = [
      ...updatedSections[sectionIndex].images,
      ...files
    ];
    
    setFormData({ ...formData, sections: updatedSections });

    // Create previews
    const newPreviews = files.map(file => URL.createObjectURL(file));
    setImagePreviews(prev => [...prev, ...newPreviews]);
  };

  const removeImage = (sectionIndex, imageIndex) => {
    const updatedSections = [...formData.sections];
    updatedSections[sectionIndex].images.splice(imageIndex, 1);
    setFormData({ ...formData, sections: updatedSections });

    // Remove preview
    const updatedPreviews = [...imagePreviews];
    updatedPreviews.splice(imageIndex, 1);
    setImagePreviews(updatedPreviews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validate form
      if (!formData.title.trim() || !formData.author.trim()) {
        throw new Error('Title and author are required');
      }

      if (formData.sections.some(section => !section.heading.trim())) {
        throw new Error('All sections must have a heading');
      }

      const response = await createBlog(formData);
      
      if (response.id) {
        toast.success('Blog created successfully!');
        // Reset form
        setFormData({
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
        });
        setImagePreviews([]);
        
        // Optionally navigate to the blog list or created blog
        // navigate('/blog');
      } else {
        throw new Error('Failed to create blog');
      }
    } catch (error) {
      console.error('Blog creation error:', error);
      toast.error(error.message || 'Failed to create blog. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen w-full ai-bg'> {/* Same background as Blogspot */}
      <AdNavbar />
      
      <div className="max-w-6xl mx-auto px-6 py-8 pt-20"> {/* Added pt-20 for navbar spacing */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8"> {/* Added transparency and blur */}
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Create New Blog Post</h1>
            <p className="text-gray-600">Fill in the details below to create a new blog post</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">Basic Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80"
                    placeholder="Enter blog title"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Author *
                  </label>
                  <input
                    type="text"
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80"
                    placeholder="Enter author name"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Sections */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">Sections</h2>
                <button
                  type="button"
                  onClick={addSection}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Section</span>
                </button>
              </div>

              {formData.sections.map((section, sectionIndex) => (
                <div key={sectionIndex} className="bg-white/80 backdrop-blur-sm rounded-xl p-6 space-y-4 border border-gray-200">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-gray-900">Section {sectionIndex + 1}</h3>
                    {formData.sections.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeSection(sectionIndex)}
                        className="text-red-600 hover:text-red-700 transition-colors"
                      >
                        <Minus className="w-5 h-5" />
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Heading *
                      </label>
                      <input
                        type="text"
                        value={section.heading}
                        onChange={(e) => handleInputChange(sectionIndex, 'heading', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80"
                        placeholder="Section heading"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Subheading
                      </label>
                      <input
                        type="text"
                        value={section.subHeading}
                        onChange={(e) => handleInputChange(sectionIndex, 'subHeading', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80"
                        placeholder="Optional subheading"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Content *
                    </label>
                    <textarea
                      value={section.body}
                      onChange={(e) => handleInputChange(sectionIndex, 'body', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none bg-white/80"
                      placeholder="Write your content here..."
                      rows={6}
                      required
                    />
                  </div>

                  {/* Image Upload */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Images
                    </label>
                    <div className="space-y-4">
                      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400 transition-colors bg-white/50">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <Upload className="w-8 h-8 text-gray-400 mb-2" />
                          <p className="text-sm text-gray-500">Click to upload images</p>
                        </div>
                        <input
                          type="file"
                          multiple
                          accept="image/*"
                          onChange={(e) => handleImageUpload(sectionIndex, e)}
                          className="hidden"
                        />
                      </label>

                      {/* Image Previews */}
                      {section.images.length > 0 && (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          {section.images.map((image, imageIndex) => (
                            <div key={imageIndex} className="relative group">
                              <img
                                src={URL.createObjectURL(image)}
                                alt={`Preview ${imageIndex}`}
                                className="w-full h-24 object-cover rounded-lg border border-gray-200"
                              />
                              <button
                                type="button"
                                onClick={() => removeImage(sectionIndex, imageIndex)}
                                className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
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
                      <label className="block text-sm font-medium text-gray-700">
                        References
                      </label>
                      <button
                        type="button"
                        onClick={() => addReference(sectionIndex)}
                        className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 text-sm transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Add Reference</span>
                      </button>
                    </div>

                    <div className="space-y-2">
                      {section.references.map((reference, refIndex) => (
                        <div key={refIndex} className="flex items-center space-x-2">
                          <Link className="w-4 h-4 text-gray-400" />
                          <input
                            type="url"
                            value={reference}
                            onChange={(e) => handleReferenceChange(sectionIndex, refIndex, e.target.value)}
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80"
                            placeholder="https://example.com"
                          />
                          {section.references.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeReference(sectionIndex, refIndex)}
                              className="text-red-600 hover:text-red-700 p-2 transition-colors"
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

            {/* Submit Button */}
            <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Creating...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>Create Blog Post</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateBlog;