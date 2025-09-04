import api from './api';

const authService = {
  // Login with email and password
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    return {
      user: response.data.data.user,
      token: response.data.data.accessToken
    };
  },

  // Register new user
  register: async (userData) => {
    const response = await api.post('/auth/register', {
      username: userData.name, // API очікує username
      email: userData.email,
      password: userData.password
    });
    return {
      user: response.data.data.user,
      token: response.data.data.accessToken
    };
  },

  // Logout
  logout: async () => {
    const response = await api.post('/auth/logout');
    localStorage.removeItem('token');
    return response.data;
  },

  // Verify token
  verifyToken: async () => {
    const response = await api.get('/auth/me');
    return {
      user: response.data.data.user
    };
  },

  // Get Google OAuth URL
  getGoogleOAuthUrl: () => {
    const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000';
    return `${API_URL}/auth/google`;
  },

  // Handle OAuth callback - не використовується, оскільки сервер сам перенаправляє
  handleOAuthCallback: async (code) => {
    const response = await api.post('/auth/google/callback', { code });
    return response.data;
  },

  // Get current user
  getCurrentUser: async () => {
    const response = await api.get('/auth/me');
    return response.data.data.user;
  },
};

export default authService;
