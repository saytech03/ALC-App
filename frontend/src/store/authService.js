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

// src/services/authService.js
// Updated sendContactForm method for authService.js
async sendContactForm(formData) {
  try {
    // Add timeout mechanism
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 second timeout

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
      userMessage = Object.values(error.details).join(', ');
    }

    const enhancedError = new Error(userMessage);
    enhancedError.status = error.status;
    enhancedError.details = error.details;
    throw enhancedError;
  }
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
        occupation: response.occupation
      };
      localStorage.setItem('user_data', JSON.stringify(userData));
      
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
      const currentUser = {
        email: response.user.email,
        token: response.token,
        ...response.user
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
        ...response.user
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
      profileImageUrl: response.profileImageUrl
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
          profileImageUrl: responseData.profileImageUrl
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

  logout() {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
    localStorage.removeItem('currentUser');
    localStorage.removeItem('temp_user_email');
    localStorage.removeItem('registration_pending');
  }
}

const authService = new AuthService();
export default authService;