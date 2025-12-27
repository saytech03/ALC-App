// src/services/authService.js
import API_CONFIG from './Api.js';

class AuthService {
  constructor() {
    this.baseURL = API_CONFIG.BASE_URL;
    this.defaultHeaders = API_CONFIG.HEADERS;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: {
        ...this.defaultHeaders,
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const responseData = await response.json();
      
      if (!response.ok) {
        throw new Error(responseData.message || `HTTP error! status: ${response.status}`);
      }

      return responseData;
    } catch (error) {
      console.error('Auth API request failed:', error);
      if (error instanceof TypeError && error.message === "Failed to fetch") {
        throw new Error("Network error. Please check your internet connection.");
      }
      throw error;
    }
  }

  // NEW: Admin Login API
  async adminLogin(credentials) {
  const response = await this.request(API_CONFIG.ENDPOINTS.AUTH.ADMIN_LOGIN, {
    method: 'POST',
    body: JSON.stringify(credentials),
  });
  
  if (response.token) {
    // Create admin user object similar to regular login structure
    const adminUser = {
      username: credentials.username,
      token: response.token,
      isAdmin: true,
      // Add any other admin-specific properties from response if available
      ...(response.user || {}) // Include any user data from response
    };
    
    // Store admin data similar to regular login
    localStorage.setItem('adminUser', JSON.stringify(adminUser));
    localStorage.setItem('adminToken', response.token);
    
    // Also store in a consistent format with regular user for compatibility
    if (response.user) {
      localStorage.setItem('admin_data', JSON.stringify(response.user));
    }
    
    return {
      success: true,
      token: response.token,
      user: adminUser // Return user object similar to regular login
    };
  }
  
  return {
    success: false,
    message: response.message || 'Admin login failed'
  };
}

  // NEW: Create Blog API (Admin Only)
  async createBlog(blogData, adminToken) {
    const formData = new FormData();
    
    // Add basic fields
    formData.append('title', blogData.title);
    formData.append('author', blogData.author);
    
    // Add sections with their content
    blogData.sections.forEach((section, index) => {
      formData.append(`sections[${index}].heading`, section.heading);
      if (section.subHeading) {
        formData.append(`sections[${index}].subHeading`, section.subHeading);
      }
      if (section.body) {
        formData.append(`sections[${index}].body`, section.body);
      }
      
      // Add images for this section
      if (section.images && section.images.length > 0) {
        section.images.forEach((image, imgIndex) => {
          formData.append(`sections[${index}].images`, image);
        });
      }
      
      // Add references for this section
      if (section.references && section.references.length > 0) {
        section.references.forEach((reference, refIndex) => {
          formData.append(`sections[${index}].references[${refIndex}]`, reference);
        });
      }
    });

    return await fetch(`${this.baseURL}${API_CONFIG.ENDPOINTS.BLOG.CREATE}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${adminToken}`,
      },
      body: formData,
    }).then(response => response.json());
  }

  async resendOTP(emailData) {
  return await this.request(API_CONFIG.ENDPOINTS.AUTH.RESEND_OTP, {
    method: 'POST',
    body: JSON.stringify(emailData),
  });
}

  // NEW: Get all blogs API
  async getAllBlogs() {
    return await this.request(API_CONFIG.ENDPOINTS.BLOG.GET_ALL, {
      method: 'GET',
    });
  }

  // NEW: Get a blog using blog_id (Admin Only)
  async getBlogById(blogId, adminToken) {
    return await this.request(`${API_CONFIG.ENDPOINTS.BLOG.GET_BY_ID}/${blogId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${adminToken}`,
      },
    });
  }

  // NEW: Application Health API
  async checkHealth() {
    return await this.request(API_CONFIG.ENDPOINTS.HEALTH, {
      method: 'GET',
    });
  }

  // NEW: Password Update API
  async updatePassword(passwordData) {
    return await this.request(API_CONFIG.ENDPOINTS.AUTH.PASSWORD_UPDATE, {
      method: 'POST',
      body: JSON.stringify(passwordData),
    });
  }

 // REPLACE THIS EXISTING METHOD:
async sendContactForm(formData) {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 100000);

    const response = await fetch(`${this.baseURL}${API_CONFIG.ENDPOINTS.CONTACT}`, {
      method: 'POST',
      body: formData,
      signal: controller.signal,
      headers: {
        'Accept': 'application/json'
      }
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
      } catch {
        errorData = { message: await response.text() };
      }

      // Handle specific error responses from your API
      if (response.status === 413) {
        throw new Error('File size too large. Please upload a smaller file.');
      }
      
      if (response.status === 400) {
        const error = new Error(errorData.message || 'Validation failed');
        error.status = response.status;
        error.details = errorData.details || errorData.errors;
        throw error;
      }

      const error = new Error(errorData.message || `Request failed with status ${response.status}`);
      error.status = response.status;
      error.details = errorData.details || errorData.errors;
      throw error;
    }

    return await response.json();

  } catch (error) {
    console.error('Contact submission error:', error);
    
    let userMessage = 'Submission failed. Please try again.';
    if (error.name === 'AbortError') {
      userMessage = 'Request timed out. Please try again.';
    } else if (error.message.includes('Failed to fetch')) {
      userMessage = 'Network error. Please check your internet connection.';
    } else if (error.details) {
      // Format validation errors for display
      userMessage = Object.values(error.details).join(', ');
    } else if (error.message) {
      userMessage = error.message;
    }

    const enhancedError = new Error(userMessage);
    enhancedError.status = error.status;
    enhancedError.details = error.details;
    throw enhancedError;
  }
}

  // ADD THIS NEW METHOD:
createContactFormData(contactData) {
  const formData = new FormData();
  
  // Required fields
  formData.append('name', contactData.name);
  formData.append('email', contactData.email);
  formData.append('subject', contactData.subject);
  formData.append('message', contactData.message);
  
  // Optional file upload
  if (contactData.blogFile) {
    formData.append('blogFile', contactData.blogFile);
  }
  
  return formData;
}

  // ADD THIS NEW METHOD:
async submitContactForm(contactData) {
  const formData = this.createContactFormData(contactData);
  return await this.sendContactForm(formData);
}

  async register(userData) {
    const response = await this.request(API_CONFIG.ENDPOINTS.AUTH.REGISTER, {
      method: 'POST',
      body: JSON.stringify(userData),
    });
        
    if (response.success) {
      localStorage.setItem('temp_user_email', userData.email);
      localStorage.setItem('registration_pending', 'true');
    }
        
    return response;
  }

  async verifyOTP(otpData) {
    const response = await this.request(API_CONFIG.ENDPOINTS.AUTH.VERIFY_OTP, {
      method: 'POST',
      body: JSON.stringify(otpData),
    });
    
    if (response.message?.includes('successfully') || response.id) {
      localStorage.removeItem('temp_user_email');
      localStorage.removeItem('registration_pending');
      
      if (response.token) {
        localStorage.setItem('auth_token', response.token);
      }
      
      const userData = {
        id: response.id,
        name: response.name,
        email: response.email,
        occupation: response.occupation,
        profileImageUrl: response.profileImageUrl || null // Ensure this field exists
      };
      localStorage.setItem('user_data', JSON.stringify(userData));
      // Also store currentUser for consistency with other flows
      localStorage.setItem('currentUser', JSON.stringify({
        ...userData,
        token: response.token,
        verified: true // Assume verified after OTP
      }));
      
      return {
        success: true,
        user: userData,
        token: response.token
      };
    }
    
    return response;
  }

  async login(credentials) {
  const response = await this.request(API_CONFIG.ENDPOINTS.AUTH.LOGIN, {
    method: 'POST',
    body: JSON.stringify(credentials),
  });
  
  if (response.success && response.token) {
    // Check if user is verified before allowing login
    if (!response.user.verified) {
      // Remove any stored data and throw error
      this.logout();
      throw new Error('Account not verified. Please check your email for verification link.');
    }
    
    const currentUser = {
      email: response.user.email,
      token: response.token,
      ...response.user,
      profileImageUrl: response.user.profileImageUrl,
      verified: response.user.verified // Ensure verified status is stored
    };
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    localStorage.setItem('auth_token', response.token);
    localStorage.setItem('user_data', JSON.stringify(response.user));
  }
  
  return response;
}

  async loginWithPatron(patronCredentials) {
    const response = await this.request(API_CONFIG.ENDPOINTS.AUTH.LOGIN_PATRON, {
      method: 'POST',
      body: JSON.stringify(patronCredentials),
    });
        
    if (response.success && response.token) {
      const currentUser = {
        email: response.user.email,
        token: response.token,
        ...response.user,
        profileImageUrl: response.user.profileImageUrl // Ensure it's explicitly stored
      };
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
      localStorage.setItem('auth_token', response.token);
      localStorage.setItem('user_data', JSON.stringify(response.user));
    }
    
    return response;
  }

  async getUserDetails(email) {
    const response = await this.request(
      `${API_CONFIG.ENDPOINTS.USER.GET_USER_DETAILS}?email=${encodeURIComponent(email)}`, 
      {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${this.getAuthToken()}` }
      }
    );
    
    return {
      id: response.id,
      name: response.name,
      email: response.email,
      occupation: response.occupation,
      profileImageUrl: response.profileImageUrl || null
    };
  }

  async forgotPassword(email) {
    return await this.request(API_CONFIG.ENDPOINTS.AUTH.FORGOT_PASSWORD, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json', 
        'X-Requested-With': 'XMLHttpRequest'
      },
      body: JSON.stringify({ email })
    });
  }

  async updateProfile(formData) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser?.token) {
      throw new Error('No authentication token found - please login again');
    }

    try {
      const response = await fetch(`${this.baseURL}/api/users/update-profile`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${currentUser.token}`,
        },
        body: formData
      });

      const responseData = await response.json();
      
      if (!response.ok) {
        throw new Error(responseData.message || `Profile update failed with status ${response.status}`);
      }

      if (responseData.id) {
        const updatedUser = {
          ...currentUser,
          name: responseData.name,
          occupation: responseData.occupation,
          profileImageUrl: responseData.profileImageUrl || null
        };

        localStorage.setItem('currentUser', JSON.stringify(updatedUser));
        localStorage.setItem('user_data', JSON.stringify({
          id: updatedUser.id,
          name: updatedUser.name,
          email: updatedUser.email,
          occupation: updatedUser.occupation,
          profileImageUrl: updatedUser.profileImageUrl
        }));

        return responseData;
      }

      return responseData;
    } catch (error) {
      console.error('Profile update API error:', error);
      if (error instanceof TypeError && error.message === "Failed to fetch") {
        throw new Error("Network error. Please check your internet connection.");
      }
      throw error;
    }
  }

  isRegistrationPending() {
    return localStorage.getItem('registration_pending') === 'true';
  }

  getTempEmail() {
    return localStorage.getItem('temp_user_email');
  }

  isAuthenticated() {
    return !!localStorage.getItem('auth_token');
  }

  getCurrentUser() {
    const userData = localStorage.getItem('user_data');
    return userData ? JSON.parse(userData) : null;
  }

  getAuthToken() {
    return localStorage.getItem('auth_token');
  }

  // NEW: Get admin token
  getAdminToken() {
    return localStorage.getItem('adminToken');
  }

  logout() {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
    localStorage.removeItem('currentUser');
    localStorage.removeItem('temp_user_email');
    localStorage.removeItem('registration_pending');
  }

  // NEW: Admin logout
  adminLogout() {
    localStorage.removeItem('adminToken');
  }
}

const authService = new AuthService();
export default authService;