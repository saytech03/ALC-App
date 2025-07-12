import { useState, useEffect } from 'react';
import { Paperclip, X } from 'lucide-react';
import Navbar from '../components/Navbar';

const ContactPage = () => {
  const [email, setEmail] = useState('');
  const [attachedFile, setAttachedFile] = useState(null);
   const [imgLoading, setImgLoading] = useState(true);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log('Email submitted:', email);
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    console.log('Contact form submitted:', formData);
    console.log('Attached file:', attachedFile);
    // Handle form submission here
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const allowedTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (allowedTypes.includes(file.type)) {
        setAttachedFile(file);
      } else {
        alert('Please select only PDF or DOCX files');
        e.target.value = '';
      }
    }
  };

  const removeAttachment = () => {
    setAttachedFile(null);
    document.getElementById('file-input').value = '';
  };

  return (
    <div className="min-h-screen bg-teal-50 contact-bg">
       {imgLoading && (
					<div className='absolute top-0 left-0 w-full h-full bg-black/70 flex items-center justify-center shimmer -z-10' />
				)}
        <Navbar/>
        <div className="pt-24 pb-16"> {/* Added more top padding */}
          <div className="max-w-2xl mx-auto px-4"> {/* Reduced max-width and centered */}
            <div className="flex justify-center"> {/* Added flex centering */}
              {/*Form*/}
              <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-lg mt-7"> {/* Added max-width constraint */}
                <div className="mb-8 mt-7">
                  <h2 className="text-4xl font-bold text-gray-900 mb-4 text-center">Get in Touch</h2> {/* Centered title */}
                  <p className="text-gray-600 text-center"> {/* Centered subtitle */}
                    Wish to Contribute with your original ideas or  have inquiries or want to collaborate? - Write to us
                  </p>
                </div>

                <form onSubmit={handleContactSubmit}> {/* Added form wrapper */}
                  <div className="space-y-6">
                    <div>
                      <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full p-4 bg-gray-100 border-0 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
                        required
                      />
                    </div>

                    <div>
                      <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full p-4 bg-gray-100 border-0 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
                        required
                      />
                    </div>

                    <div>
                      <input
                        type="text"
                        name="subject"
                        placeholder="Subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        className="w-full p-4 bg-gray-100 border-0 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
                      />
                    </div>

                    <div>
                      <textarea
                        name="message"
                        placeholder="Message"
                        rows="6"
                        value={formData.message}
                        onChange={handleInputChange}
                        className="w-full p-4 bg-gray-100 border-0 rounded-lg text-gray-900 placeholder-gray-500 resize-none focus:outline-none focus:ring-2 focus:ring-teal-500"
                        required
                      ></textarea>
                    </div>

                    {/* File Attachment */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Attach File (PDF or DOCX only)
                      </label>
                      <div className="flex items-center gap-3">
                        <label className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg cursor-pointer transition-colors">
                          <Paperclip className="w-5 h-5 text-gray-600" />
                          <span className="text-gray-700">Choose File</span>
                          <input
                            id="file-input"
                            type="file"
                            accept=".pdf,.docx"
                            onChange={handleFileChange}
                            className="hidden"
                          />
                        </label>
                        {attachedFile && (
                          <div className="flex items-center gap-2 bg-blue-50 px-3 py-2 rounded-lg">
                            <span className="text-sm text-blue-700 truncate max-w-32">
                              {attachedFile.name}
                            </span>
                            <button
                              type="button"
                              onClick={removeAttachment}
                              className="text-red-500 hover:text-red-700"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* reCAPTCHA Placeholder */}
                    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                      <div className="w-6 h-6 border-2 border-gray-400 rounded"></div> {/* Fixed border color */}
                      <span className="text-gray-700">I'm not a robot</span> {/* Fixed text color */}
                      <div className="ml-auto">
                        <div className="text-xs text-gray-500"> {/* Fixed text color */}
                          reCAPTCHA<br />
                          Privacy - Terms
                        </div>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-lg transition-colors duration-200 text-lg"
                    >
                      SUBMIT
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}

export default ContactPage