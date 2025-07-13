import { useState, useEffect } from 'react';
import { Paperclip, X, Check } from 'lucide-react';
import AltNavbar from '../components/AltNavbar';

// Sample CAPTCHA data
const captchaImages = {
  motorcycles: [
    'https://images.unsplash.com/photo-1558981806-ec527fa84c39',
    'https://images.unsplash.com/photo-1580310614697-35c8a05a78ff',
    'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87'
  ],
  trafficLights: [
    'https://images.unsplash.com/photo-1614854262340-1e7e335f5a24',
    'https://images.unsplash.com/photo-1614854262632-1c0bcd94aa8e',
    'https://images.unsplash.com/photo-1614854262633-1c0bcd94aa8f'
  ],
  bicycles: [
    'https://images.unsplash.com/photo-1485965120184-e220f721d03e',
    'https://images.unsplash.com/photo-1507035895480-2b3156c31fc8',
    'https://images.unsplash.com/photo-1532298229144-0ec0c57515c7'
  ]
};

const captchaChallenges = [
  { question: "Select all images with motorcycles", key: "motorcycles" },
  { question: "Select all images with traffic lights", key: "trafficLights" },
  { question: "Select all images with bicycles", key: "bicycles" }
];

const ContactPage_ = () => {
  const [email, setEmail] = useState('');
  const [attachedFile, setAttachedFile] = useState(null);
  const [imgLoading, setImgLoading] = useState(true);
  const [showCaptcha, setShowCaptcha] = useState(false);
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [currentChallenge, setCurrentChallenge] = useState(null);
  const [selectedImages, setSelectedImages] = useState([]);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const subjectOptions = [
    'Remarks',
    'Collaborations',
    'Blog Submissions',
    'Others'
  ];

  // Initialize CAPTCHA
  useEffect(() => {
    generateNewCaptcha();
  }, []);

  const generateNewCaptcha = () => {
    const randomChallenge = captchaChallenges[Math.floor(Math.random() * captchaChallenges.length)];
    setCurrentChallenge(randomChallenge);
    setSelectedImages([]);
  };

  const handleCaptchaClick = () => {
    if (!captchaVerified) {
      setShowCaptcha(true);
    }
  };

  const handleImageSelect = (imgUrl) => {
    if (selectedImages.includes(imgUrl)) {
      setSelectedImages(selectedImages.filter(img => img !== imgUrl));
    } else {
      setSelectedImages([...selectedImages, imgUrl]);
    }
  };

  const verifyCaptcha = () => {
    // Check if all correct images are selected
    const allCorrectSelected = captchaImages[currentChallenge.key].every(img => 
      selectedImages.includes(img)
    );
    
    if (allCorrectSelected && selectedImages.length === captchaImages[currentChallenge.key].length) {
      setCaptchaVerified(true);
      setShowCaptcha(false);
    } else {
      alert('Please select all correct images');
      generateNewCaptcha();
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log('Email submitted:', email);
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (!captchaVerified) {
      alert('Please complete the CAPTCHA verification');
      return;
    }
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

                  {/* CAPTCHA Section */}
                  <div 
                    className={`flex items-center gap-3 p-4 ${captchaVerified ? 'bg-green-50' : 'bg-gray-50'} rounded-lg cursor-pointer`}
                    onClick={handleCaptchaClick}
                  >
                    <div className={`w-6 h-6 border-2 rounded flex items-center justify-center ${
                      captchaVerified 
                        ? 'border-green-500 bg-green-500 text-white' 
                        : 'border-gray-400'
                    }`}>
                      {captchaVerified && <Check className="w-4 h-4" />}
                    </div>
                    <span className={captchaVerified ? 'text-green-700' : 'text-gray-700'}>
                      {captchaVerified ? 'Verified' : "I'm not a robot"}
                    </span>
                    <div className="ml-auto">
                      <div className="text-xs text-gray-500">
                        reCAPTCHA<br />
                        Privacy - Terms
                      </div>
                    </div>
                  </div>

                  {/* CAPTCHA Modal */}
                  {showCaptcha && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                      <div className="bg-white p-6 rounded-lg max-w-md w-full">
                        <h3 className="text-lg font-semibold mb-4">{currentChallenge.question}</h3>
                        <div className="grid grid-cols-3 gap-2 mb-4">
                          {Object.values(captchaImages).flat().map((imgUrl, index) => (
                            <div 
                              key={index}
                              className={`border-2 rounded overflow-hidden cursor-pointer ${
                                selectedImages.includes(imgUrl) 
                                  ? 'border-blue-500' 
                                  : 'border-gray-200'
                              }`}
                              onClick={() => handleImageSelect(imgUrl)}
                            >
                              <img 
                                src={imgUrl} 
                                alt="CAPTCHA" 
                                className="w-full h-24 object-cover"
                              />
                            </div>
                          ))}
                        </div>
                        <div className="flex justify-between">
                          <button
                            type="button"
                            onClick={generateNewCaptcha}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            Refresh
                          </button>
                          <button
                            type="button"
                            onClick={verifyCaptcha}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                          >
                            Verify
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

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

export default ContactPage_;