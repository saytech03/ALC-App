import { useState } from 'react';
import { Paperclip, X } from 'lucide-react';
import AltNavbar from '../components/AltNavbar';
import { useAuth } from '../store/AuthContext';
import ReCAPTCHA from "react-google-recaptcha";

const ContactPage_ = () => {
  const { sendContactForm } = useAuth();
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
  const [errors, setErrors] = useState({});

  const subjectOptions = [
    'Remarks',
    'Collaborations',
    'Blog Submissions',
    'Others'
  ];

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    
    // Validate required fields
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.subject) newErrors.subject = 'Subject is required';
    if (!formData.message) newErrors.message = 'Message is required';
    if (!captchaValue) newErrors.captcha = 'Please complete the CAPTCHA verification';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage('');
    setErrors({});
    
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('subject', formData.subject);
      formDataToSend.append('message', formData.message);
      
      if (attachedFile) {
        formDataToSend.append('blogFile', attachedFile);
      }

      // Use the sendContactForm from AuthContext
      const response = await sendContactForm(formDataToSend);

      setSubmitMessage('Thank you for your submission! We will get back to you soon.');
      
      // Reset form
      setFormData({ name: '', email: '', subject: '', message: '' });
      setAttachedFile(null);
      setCaptchaValue(null);
      document.getElementById('file-input').value = '';
    } catch (error) {
      if (error.message.includes('Maximum upload size exceeded')) {
        setSubmitMessage('File size exceeds the maximum limit (5MB)');
      } else if (error.message.includes('Only PDF, DOCX, or image files are allowed')) {
        setSubmitMessage('Only PDF, DOCX, or image files are allowed');
      } else if (error.message.includes('Validation failed')) {
        // Handle backend validation errors
        if (error.details) {
          setErrors(error.details);
        } else {
          setSubmitMessage('Please fill all required fields correctly');
        }
      } else {
        setSubmitMessage(error.message || 'Submission failed. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear error when user types
    if (errors[e.target.name]) {
      setErrors(prev => ({ ...prev, [e.target.name]: '' }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Client-side validation (also validated by backend)
      const allowedTypes = [
        'application/pdf', 
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'image/jpeg',
        'image/png'
      ];
      
      if (file.size > 5 * 1024 * 1024) { // 5MB
        setSubmitMessage('File size exceeds the maximum limit (5MB)');
        e.target.value = '';
        return;
      }

      if (!allowedTypes.includes(file.type)) {
        setSubmitMessage('Only PDF, DOCX, JPEG, or PNG files are allowed');
        e.target.value = '';
        return;
      }

      setAttachedFile(file);
      setSubmitMessage('');
    }
  };

  const removeAttachment = () => {
    setAttachedFile(null);
    document.getElementById('file-input').value = '';
  };

  return (
    <div className="min-h-screen bg-teal-50 contact-bg">
      <AltNavbar/>
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
                      className={`w-full p-4 bg-gray-100 border-0 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 ${
                        errors.name ? 'focus:ring-red-500' : 'focus:ring-teal-500'
                      }`}
                      required
                    />
                    {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                  </div>

                  <div>
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full p-4 bg-gray-100 border-0 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 ${
                        errors.email ? 'focus:ring-red-500' : 'focus:ring-teal-500'
                      }`}
                      required
                    />
                    {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                  </div>

                  <div>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className={`w-full p-4 bg-gray-100 border-0 rounded-lg text-gray-900 focus:outline-none focus:ring-2 appearance-none ${
                        errors.subject ? 'focus:ring-red-500' : 'focus:ring-teal-500'
                      }`}
                      required
                    >
                      <option value="" disabled>Select a subject</option>
                      {subjectOptions.map((option) => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                    {errors.subject && <p className="mt-1 text-sm text-red-600">{errors.subject}</p>}
                  </div>

                  <div>
                    <textarea
                      name="message"
                      placeholder="Message"
                      rows="6"
                      value={formData.message}
                      onChange={handleInputChange}
                      className={`w-full p-4 bg-gray-100 border-0 rounded-lg text-gray-900 placeholder-gray-500 resize-none focus:outline-none focus:ring-2 ${
                        errors.message ? 'focus:ring-red-500' : 'focus:ring-teal-500'
                      }`}
                      required
                    ></textarea>
                    {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message}</p>}
                  </div>

                  {/* File Attachment */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Attach File (PDF, DOCX, JPEG, or PNG - max 5MB)
                    </label>
                    <div className="flex items-center gap-3">
                      <label className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg cursor-pointer transition-colors">
                        <Paperclip className="w-5 h-5 text-gray-600" />
                        <span className="text-gray-700">Choose File</span>
                        <input
                          id="file-input"
                          type="file"
                          accept=".pdf,.docx,.jpg,.jpeg,.png"
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
                    {errors.blogFile && <p className="mt-1 text-sm text-red-600">{errors.blogFile}</p>}
                  </div>

                  {/* ReCAPTCHA Component */}
                  <div className="my-4">
                    <ReCAPTCHA
                      sitekey="6LfTAI4rAAAAAPzU2uSLCaGutMd3J-gOjfY8N5EG" // Replace with your actual key
                      onChange={(value) => {
                        setCaptchaValue(value);
                        if (errors.captcha) setErrors(prev => ({ ...prev, captcha: '' }));
                      }}
                    />
                    {errors.captcha && <p className="mt-1 text-sm text-red-600">{errors.captcha}</p>}
                  </div>

                  {/* Submit message display */}
                  {submitMessage && (
                    <div className={`mt-2 p-3 rounded-lg text-center ${
                      submitMessage.includes('Thank you') 
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

export default ContactPage_;