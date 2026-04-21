import apiClient from './apiClient';

export const listOfValuesAPI = {
  // Get list of values by type
  getListOfValuesByType: async (type) => {
    try {
      const response = await apiClient.get(`/listofvalues/getlistofvaluesbytype/${type}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
  getThemes: async () => {
    try {
      const response = await apiClient.get('/theme/getthemes');
      console.log(response, "response3456")
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
};

