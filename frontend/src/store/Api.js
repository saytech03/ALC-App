// src/config/api.js
const API_CONFIG = {
  BASE_URL: 'https://alc-backend.onrender.com',
  ENDPOINTS: {
    AUTH: {
      REGISTER: '/api/auth/register',
      LOGIN: '/api/auth/login',
      LOGIN_PATRON: '/api/auth/login-with-patron-id',
      VERIFY_OTP: '/api/auth/verify-otp',
      LOGOUT: '/api/auth/logout',
      FORGOT_PASSWORD: '/api/auth/request-password-reset',
      PASSWORD_UPDATE: '/api/auth/reset-password',
      ADMIN_LOGIN: '/api/admin/login'
    },
    USER: {
      GET_USER: '/api/users',
      GET_USER_DETAILS: '/api/users', // Same endpoint but with email parameter
      UPDATE_PROFILE: '/api/users/update-profile'
    },
    BLOG: {
      CREATE: '/api/blogs',
      GET_ALL: '/api/blogs',
      GET_BY_ID: '/api/blogs' // Append /:id to this endpoint
    },
    CONTACT: '/api/contact', // New contact endpoint
    HEALTH: '/api/health' // Application health endpoint
  },
  HEADERS: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
};

export default API_CONFIG;