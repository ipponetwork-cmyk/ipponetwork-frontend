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

// Add response interceptor to handle token expiration (auto logout)
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Clear storage and redirect to login
      localStorage.clear();
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  // Get user profile by mobile number
  getUserProfileByMobileNo: async (mobileno) => {
    try {
      const response = await apiClient.post('/user/getuserprofilebymobileno', {
        mobileno,
      });
      console.log(response,"response12223")
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Check username availability and format
  checkUsername: async (username) => {
    try {
      const response = await apiClient.post('/user/checkusername', { username });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get list of values by type
  getListOfValuesByType: async (type) => {
    try {
      const response = await apiClient.get(`/listofvalues/getlistofvaluesbytype/${type}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get time to live pricing and duration data for a domain
  getTimeToLive: async (domain) => {
    try {
      const response = await apiClient.post('/post/gettimetolive', { domain });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Create a new post
  createPost: async (postData) => {
    try {
      const response = await apiClient.post('/post/createpost', postData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Update user profile
  updateUserProfile: async (userId, profileData, files = {}) => {
    try {
      const formData = new FormData();

      // Add profile data
      Object.keys(profileData).forEach(key => {
        if (profileData[key] !== undefined) {
          formData.append(key, profileData[key]);
        }
      });

      // Add fallback files if passed separately
      if (files.photo) formData.append('photo', files.photo);
      if (files.idproof) formData.append('idproof', files.idproof);
      if (files.documentproof) formData.append('documentproof', files.documentproof);

      const response = await apiClient.put(`/user/updateuserprofile/${userId}`, formData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};

export default apiClient;
