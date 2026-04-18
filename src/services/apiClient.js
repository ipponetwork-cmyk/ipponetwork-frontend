import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_APP_API_URL;
// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

// Add authorization token to requests if available
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default apiClient;