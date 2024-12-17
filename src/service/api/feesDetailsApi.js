import axios from 'axios';

const BASE_URL = '/api/feesHistory'; // Base URL for fees history API

// Helper function to get the access token (you can modify this based on your auth setup)
const getToken = () => {
    return localStorage.getItem('token'); // Retrieve the saved token
  };

// Fetch all fees records
export const fetchFeesData = async () => {
  try {
    const token = getToken();
    const response = await axios.get(BASE_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching fees data:', error);
    throw error;
  }
};

// Update a fee record by ID
export const updateFeeRecord = async (id, updatedData) => {
  try {
    const token = getToken();
    const response = await axios.put(`${BASE_URL}/${id}`, updatedData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating fee record:', error);
    throw error;
  }
};

// Delete a fee record by ID
export const deleteFeeRecord = async (id) => {
  try {
    const token = getToken();
    const response = await axios.delete(`${BASE_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting fee record:', error);
    throw error;
  }
};
