import { useState } from 'react';
import { Paperclip, X } from 'lucide-react';
import Navbar from '../components/Navbar';
import axios from 'axios';
import ReCAPTCHA from "react-google-recaptcha";

const ContactPage = () => {
  const [email, setEmail] = useState('');
  const [attachedFile, setAttachedFile] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [captchaValue, setCaptchaValue] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const subjectOptions = [
    'Remarks',
    'Collaborations',
    'Blog Submissions',
    'Others'
  ];

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    
    if (!captchaValue) {
      alert('Please complete the CAPTCHA verification');
      return;
    }
    
    setIsSubmitting(true);
    setSubmitMessage('');
    
    try {
      // Create FormData for file upload
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('subject', formData.subject);
      formDataToSend.append('message', formData.message);
      formDataToSend.append('captchaToken', captchaValue);
      
      if (attachedFile) {
        formDataToSend.append('blogFile', attachedFile);
      }

      // Send to backend
      const response = await axios.post(
        'https://your-backend-url/api/contact',
        formDataToSend,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      setSubmitMessage(response.data.message || 'Thank you for your submission!');
      // Reset form
      setFormData({ name: '', email: '', subject: '', message: '' });
      setAttachedFile(null);
      setCaptchaValue(null);
      document.getElementById('file-input').value = '';
    } catch (error) {
      setSubmitMessage(error.response?.data?.message || 'Submission failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
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
      <Navbar/>
      <div className="pt-24 pb-16">
        <div className="max-w-2xl mx-auto px-4">
          <div className="flex justify-center">
            <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-lg mt-7">
              <div className="mb-8 mt-7">
                <h2 className="text-4xl font-bold text-gray-900 mb-4 text-center">Get in Touch</h2>
                <p className="text-gray-600 text-center">
                  Wish to Contribute with your original ideas or have inquiries or want to collaborate? - Write to us
                </p>
              </div>

              <form onSubmit={handleContactSubmit}>
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
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full p-4 bg-gray-100 border-0 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500 appearance-none"
                      required
                    >
                      <option value="" disabled>Select a subject</option>
                      {subjectOptions.map((option) => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
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

                  {/* ReCAPTCHA Component */}
                  <div className="my-4">
                    <ReCAPTCHA
                      sitekey="6LfTAI4rAAAAAPzU2uSLCaGutMd3J-gOjfY8N5EG" // Replace with your actual key
                      onChange={(value) => setCaptchaValue(value)}
                    />
                  </div>

                  {/* Submit message display */}
                  {submitMessage && (
                    <div className={`mt-2 p-3 rounded-lg text-center ${
                      submitMessage.includes('Thank you') || submitMessage.includes('success')
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {submitMessage}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full text-white font-semibold py-4 px-6 rounded-lg transition-colors duration-200 text-lg ${
                      isSubmitting 
                        ? 'bg-gray-400 cursor-not-allowed' 
                        : 'bg-blue-600 hover:bg-blue-700'
                    }`}
                  >
                    {isSubmitting ? 'SUBMITTING...' : 'SUBMIT'}
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

export default ContactPage;