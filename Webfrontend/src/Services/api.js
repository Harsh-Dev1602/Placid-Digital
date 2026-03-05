import axios from 'axios';

// Get the backend URL from environment variables or use the development proxy
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || '';

// Create axios instance with base URL
const apiClient = axios.create({
  baseURL: BACKEND_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include auth token if available
apiClient.interceptors.request.use(
  (config) => {
    // You can add auth token here if needed
    // const token = sessionStorage.getItem('Admin');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      sessionStorage.removeItem('Admin');
      window.location.href = '/admin-login';
    }
    return Promise.reject(error);
  }
);

export default apiClient;
