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
      console.log('Making auth request to:', url);
      const response = await fetch(url, config);
            
      const responseData = await response.json();
            
      if (!response.ok) {
        throw new Error(responseData.message || `HTTP error! status: ${response.status}`);
      }

      return responseData;
    } catch (error) {
      console.error('Auth API request failed:', error);
      throw error;
    }
  }

  // Register new user
  async register(userData) {
    const response = await this.request(API_CONFIG.ENDPOINTS.AUTH.REGISTER, {
      method: 'POST',
      body: JSON.stringify(userData),
    });
        
    // Store temporary registration data for OTP verification
    if (response.success) {
      localStorage.setItem('temp_user_email', userData.email);
      localStorage.setItem('registration_pending', 'true');
    }
        
    return response;
  }

  // Verify OTP after registration
  async verifyOTP(otpData) {
    const response = await this.request(API_CONFIG.ENDPOINTS.AUTH.VERIFY_OTP, {
      method: 'POST',
      body: JSON.stringify(otpData),
    });
        
    // Clear temporary registration data and store auth token
    if (response.success && response.token) {
      localStorage.removeItem('temp_user_email');
      localStorage.removeItem('registration_pending');
      localStorage.setItem('auth_token', response.token);
      localStorage.setItem('user_data', JSON.stringify(response.user));
    }
        
    return response;
  }

  // Login existing user (no OTP needed)
  async login(credentials) {
    const response = await this.request(API_CONFIG.ENDPOINTS.AUTH.LOGIN, {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
        
    // Store auth token and user data
    if (response.success && response.token) {
      localStorage.setItem('auth_token', response.token);
      localStorage.setItem('user_data', JSON.stringify(response.user));
    }
        
    return response;
  }

  // Login with patron ID
  async loginWithPatron(patronCredentials) {
    const response = await this.request(API_CONFIG.ENDPOINTS.AUTH.LOGIN_PATRON, {
      method: 'POST',
      body: JSON.stringify(patronCredentials),
    });
        
    // Store auth token and user data
    if (response.success && response.token) {
      localStorage.setItem('auth_token', response.token);
      localStorage.setItem('user_data', JSON.stringify(response.user));
    }
        
    return response;
  }

  // Get detailed user information by email
  async getUserDetails(email) {
    const token = this.getAuthToken();
    if (!token) {
      throw new Error('No authentication token found');
    }

    const endpoint = `${API_CONFIG.ENDPOINTS.USER.GET_USER_DETAILS}?email=${encodeURIComponent(email)}`;
    
    const response = await this.request(endpoint, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    return response;
  }

  // Check if user has pending OTP verification
  isRegistrationPending() {
    return localStorage.getItem('registration_pending') === 'true';
  }

  // Get temporary email for OTP verification
  getTempEmail() {
    return localStorage.getItem('temp_user_email');
  }

  // Check if user is authenticated
  isAuthenticated() {
    return !!localStorage.getItem('auth_token');
  }

  // Get current user data
  getCurrentUser() {
    const userData = localStorage.getItem('user_data');
    return userData ? JSON.parse(userData) : null;
  }

  // Get auth token
  getAuthToken() {
    return localStorage.getItem('auth_token');
  }

  // Logout user
  logout() {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
    localStorage.removeItem('temp_user_email');
    localStorage.removeItem('registration_pending');
  }
}

// Create and export a singleton instance
const authService = new AuthService();
export default authService;