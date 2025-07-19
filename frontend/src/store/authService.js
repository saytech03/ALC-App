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
        if (error instanceof TypeError && error.message === "Failed to fetch") {
            throw new Error("Network error. Please check your internet connection.");
        }
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
  
  // Modified success condition to check for message or id
  if (response.message?.includes('successfully') || response.id) {
    localStorage.removeItem('temp_user_email');
    localStorage.removeItem('registration_pending');
    
    // Store the token if present, otherwise store basic user data
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
    
    // Return formatted success response
    return {
      success: true,
      user: userData,
      token: response.token
    };
  }
  
  return response;
}
  // Login existing user (no OTP needed)
  // In login method:
async login(credentials) {
  const response = await this.request(API_CONFIG.ENDPOINTS.AUTH.LOGIN, {
    method: 'POST',
    body: JSON.stringify(credentials),
  });
  
  if (response.success && response.token) {
    const currentUser = {
      email: response.user.email,
      token: response.token,
      ...response.user // include all user data
    };
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    localStorage.setItem('auth_token', response.token); // keep for backward compatibility
    localStorage.setItem('user_data', JSON.stringify(response.user)); // keep for backward compatibility
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
    const currentUser = {
      email: response.user.email,
      token: response.token,
      ...response.user // include all user data
    };
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    localStorage.setItem('auth_token', response.token); // keep for backward compatibility
    localStorage.setItem('user_data', JSON.stringify(response.user)); // keep for backward compatibility
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

   // src/services/authService.js
async forgotPassword(email) {
  return await this.request(API_CONFIG.ENDPOINTS.AUTH.FORGOT_PASSWORD, {
    method: 'POST',
    headers: {  // Add headers here
      'Content-Type': 'application/json',
      'Accept': 'application/json', 
      'X-Requested-With': 'XMLHttpRequest'
    },
    body: JSON.stringify({ email })
  });
}

  // ✅ ADDED: Update user profile with image support
 async updateProfile(formData) {
  // 1. Get auth token from currentUser
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  if (!currentUser?.token) {
    throw new Error('No authentication token found - please login again');
  }

  try {
    // 2. Make the API request
    const response = await fetch(`${this.baseURL}/api/users/update-profile`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${currentUser.token}`,
        // Let browser set Content-Type with boundary automatically
      },
      body: formData
    });

    // 3. Handle response
    const responseData = await response.json();
    
    if (!response.ok) {
      throw new Error(responseData.message || `Profile update failed with status ${response.status}`);
    }

    // 4. Update local storage if successful
    if (responseData.id) {
      const updatedUser = {
        ...currentUser,
        name: responseData.name,
        occupation: responseData.occupation,
        profileImageUrl: responseData.profileImageUrl
      };
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    }

    return responseData;
  } catch (error) {
    console.error('Profile update API error:', error);
    
    // Special handling for network errors
    if (error instanceof TypeError && error.message === "Failed to fetch") {
      throw new Error("Network error. Please check your internet connection.");
    }
    
    throw error;
  }
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
  localStorage.removeItem('currentUser'); // Add this
  localStorage.removeItem('temp_user_email');
  localStorage.removeItem('registration_pending');
  }
}

// Create and export a singleton instance
const authService = new AuthService();
export default authService;