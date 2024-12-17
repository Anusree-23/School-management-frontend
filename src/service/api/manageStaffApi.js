import axios from 'axios';

// Function to get the token from localStorage or wherever it's stored
const getToken = () => {
    return localStorage.getItem('token'); // Retrieve the saved token
  };
  

// Base API URL
const API_URL = 'http://localhost:5000/api/manage-staff'; // Replace with your actual API URL

// Create an Axios instance with default headers
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add the access token to headers of each request if available
api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`; // Add Authorization header
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Function to get all staff members
export const getAllStaff = async () => {
  try {
    const response = await api.get('/');
    return response.data;
  } catch (error) {
    console.error('Error fetching staff:', error);
    throw error;
  }
};

// Function to create a new staff member
export const createStaff = async (staffData) => {
  try {
    const response = await api.post('/', staffData);
    return response.data;
  } catch (error) {
    console.error('Error creating staff:', error);
    throw error;
  }
};

// Function to update staff details
export const updateStaff = async (id, staffData) => {
  try {
    const response = await api.put(`/${id}`, staffData);
    return response.data;
  } catch (error) {
    console.error('Error updating staff:', error);
    throw error;
  }
};

// Function to delete a staff member
export const deleteStaff = async (id) => {
  try {
    const response = await api.delete(`/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting staff:', error);
    throw error;
  }
};
