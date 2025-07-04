import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';

const ContactPage = () => {
  const [email, setEmail] = useState('');
  
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
    // Handle form submission here
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-teal-50 contact-bg">
        <Navbar/>
        <div className="pt-24 pb-16"> {/* Added more top padding */}
          <div className="max-w-2xl mx-auto px-4"> {/* Reduced max-width and centered */}
            <div className="flex justify-center"> {/* Added flex centering */}
              {/*Form*/}
              <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-lg mt-7"> {/* Added max-width constraint */}
                <div className="mb-8 mt-7">
                  <h2 className="text-4xl font-bold text-gray-900 mb-4 text-center">Get in Touch</h2> {/* Centered title */}
                  <p className="text-gray-600 text-center"> {/* Centered subtitle */}
                    Reach out for inquiries, support, and collaboration opportunities.
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