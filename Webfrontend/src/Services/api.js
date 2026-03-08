import axios from 'axios';
import { setupAxiosInterceptors } from '../config/apiConfig.js';

// Get the backend URL from environment variables or use the development proxy
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL ;

// Create axios instance with base URL
const apiClient = axios.create({
  baseURL: BACKEND_URL,
  timeout: 50000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Apply interceptors to handle API URLs correctly
setupAxiosInterceptors(apiClient);

// Store the setIsLoading function for use in interceptors
let setIsLoadingGlobal = null;

// Function to set the loading state handler
export const setLoadingHandler = (handler) => {
  setIsLoadingGlobal = handler;
};

// Add request interceptor to include auth token if available
apiClient.interceptors.request.use(
  (config) => {
    // Show loading indicator for GET operations (data fetching)
    if (config.method?.toUpperCase() === 'GET' && setIsLoadingGlobal) {
      setIsLoadingGlobal(true);
    }
    // You can add auth token here if needed
    // const token = sessionStorage.getItem('Admin');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    if (setIsLoadingGlobal) {
      setIsLoadingGlobal(false);
    }
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => {
    // Hide loading indicator for GET operations
    if (response.config.method?.toUpperCase() === 'GET' && setIsLoadingGlobal) {
      setIsLoadingGlobal(false);
    }
    return response;
  },
  (error) => {
    // Hide loading indicator for GET operations on error
    if (error.config?.method?.toUpperCase() === 'GET' && setIsLoadingGlobal) {
      setIsLoadingGlobal(false);
    }
    if (error.response?.status === 401) {
      // Handle unauthorized access
      sessionStorage.removeItem('Admin');
      window.location.href = '/admin-login';
    }
    return Promise.reject(error);
  }
);

export default apiClient;
