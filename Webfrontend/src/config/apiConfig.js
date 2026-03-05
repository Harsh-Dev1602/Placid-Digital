// API configuration for handling both dev and production environments
export const getApiUrl = () => {
  // In production, use the full backend URL
  // In development, use relative paths (proxied through vite)
  if (typeof window !== 'undefined') {
    // Check if we're in a Vercel deployment or production
    const isProduction = window.location.hostname !== 'localhost' && 
                         window.location.hostname !== '127.0.0.1' &&
                         !window.location.hostname.includes(':3002');
    
    if (isProduction) {
      // Use absolute URL for production
      return import.meta.env.VITE_API_URL || 'https://placid-digital.onrender.com';
    }
  }
  
  // Use relative paths for development (proxied by vite)
  return '';
};

// Helper function to build API endpoint URLs
export const buildApiUrl = (endpoint) => {
  const baseUrl = getApiUrl();
  return `${baseUrl}${endpoint}`;
};

// Interceptor for axios to automatically add the correct URL prefix
export const setupAxiosInterceptors = (axiosInstance) => {
  axiosInstance.interceptors.request.use(
    (config) => {
      // Only modify URL if it's a relative path
      if (config.url && !config.url.startsWith('http')) {
        config.url = buildApiUrl(config.url);
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  return axiosInstance;
};
