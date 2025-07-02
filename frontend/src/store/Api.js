// src/config/api.js
const API_CONFIG = {
  BASE_URL: 'https://alc-backend.onrender.com',
  ENDPOINTS: {
    AUTH: {
      REGISTER: '/api/auth/register',
      LOGIN: '/api/auth/login',
      LOGIN_PATRON:'/api/auth/login-with-patron-id',
      VERIFY_OTP: '/api/auth/verify-otp' ,
      LOGOUT: '/api/auth/logout'
    }
  },
  HEADERS: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
};

export default API_CONFIG;