import apiClient from './apiClient';

export const postAPI = {
  // Get time to live pricing and duration data for a domain
  getTimeToLive: async (domain) => {
    try {
      const response = await apiClient.post('/post/gettimetolive', { domain });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  getPostById: async (postId) => {
    try {
        const response = await apiClient.get(`/post/viewpost/${postId}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
},
  // Create a new post
  createPost: async (postData) => {
    try {
      console.log('PostAPI: Creating post');
      const response = await apiClient.post('/post/createpost', postData);
      return response.data;
    } catch (error) {
      console.error('PostAPI createPost error:', {
        status: error.response?.status,
        statusText: error.response?.statusText,
        message: error.message,
        data: error.response?.data,
      });
      throw error.response?.data || { message: error.message };
    }
  },

  // Get posts by domain
  getPostsByDomain: async (domain) => {
    try {
      const response = await apiClient.get(`/post/viewposts/domain/${domain}`);
      console.log("getPostsByDomain", response)
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
  increaseEnquiryCount: async (postId) => {
    try {
      const response = await apiClient.post(`/post/increaseenquirycount/${postId}`);
      console.log("Response from increaseEnquiryCount:", response);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};

