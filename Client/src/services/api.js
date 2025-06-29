import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// API functions
export const developerService = {
  // Get all developers with optional search
  getAll: async (search = '') => {
    try {
      const params = {};
      if (search && search.trim()) {
        params.search = search.trim();
        console.log('🔍 Searching for:', params.search);
      } else {
        console.log('📋 Fetching all developers');
      }
      
      const response = await api.get('/developers', { params });
      console.log('✅ API response:', response.data.length, 'developers found');
      return response.data;
    } catch (error) {
      console.error('❌ API error:', error.response?.data || error.message);
      throw new Error(error.response?.data?.message || 'Failed to fetch developers');
    }
  },

  // Get single developer by ID
  getById: async (id) => {
    try {
      console.log('👤 Fetching developer with ID:', id);
      const response = await api.get(`/developers/${id}`);
      console.log('✅ Developer found:', response.data.name);
      return response.data;
    } catch (error) {
      console.error('❌ Error fetching developer:', error.response?.data || error.message);
      throw new Error(error.response?.data?.message || 'Failed to fetch developer');
    }
  },

  // Create new developer
  create: async (developerData) => {
    try {
      const response = await api.post('/developers', developerData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to create developer');
    }
  },

  // Update developer
  update: async (id, developerData) => {
    try {
      const response = await api.put(`/developers/${id}`, developerData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to update developer');
    }
  },

  // Delete developer
  delete: async (id) => {
    try {
      console.log('🗑️ Attempting to delete developer with ID:', id);
      const response = await api.delete(`/developers/${id}`);
      console.log('✅ Developer deleted successfully');
      return response.data;
    } catch (error) {
      console.error('❌ Delete error:', error.response?.status, error.response?.data);
      if (error.response?.status === 404) {
        throw new Error('Developer not found or already deleted');
      }
      throw new Error(error.response?.data?.message || 'Failed to delete developer');
    }
  }
};

export default api;
