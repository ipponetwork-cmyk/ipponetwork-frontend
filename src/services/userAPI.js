import apiClient from './apiClient';

export const userAPI = {
  // Get user profile by mobile number
  getUserProfileByMobileNo: async (mobileno) => {
    try {
      const response = await apiClient.post('/user/getuserprofilebymobileno', {
        mobileno,
      });
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

    //   // Add fallback files if passed separately
    //   if (files.photo) formData.append('photo', files.photo);
    //   if (files.idproof) formData.append('idproof', files.idproof);
    //   if (files.documentproof) formData.append('documentproof', files.documentproof);

      const response = await apiClient.put(`/user/updateuserprofile/${userId}`, formData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};