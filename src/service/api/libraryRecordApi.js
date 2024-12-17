// services/api/libraryRecordapi.js

import axios from 'axios';

// Base API URL
const API_URL = '/api/libraryHistory'; // Replace with your actual API URL

// Function to get the access token (assuming it's stored in localStorage)
const getToken = () => {
    return localStorage.getItem('token'); // Retrieve the saved token
  };

// Set up axios instance with default headers
const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add the access token to each request
axiosInstance.interceptors.request.use((config) => {
    const token = getToken(); // Retrieve the access token
  console.log("access token",token)
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;  // Add the token to headers
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Fetch all library records
export const getAllLibraryRecords = async () => {
  try {
    const response = await axiosInstance.get('/');
    return response.data; // Returns the list of all library records
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error fetching library records');
  }
};

// Fetch library records by student ID
export const getLibraryRecordsByStudent = async (studentId) => {
  try {
    const response = await axiosInstance.get(`/${studentId}`);
    return response.data; // Returns library records for a specific student
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error fetching library records for student');
  }
};

// Add a new library record
export const addLibraryRecord = async (newRecord) => {
  try {
    const response = await axiosInstance.post('/', newRecord);
    return response.data; // Returns the created record
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error adding library record');
  }
};

// Edit an existing library record
export const editLibraryRecord = async (id, updatedRecord) => {
  try {
    const response = await axiosInstance.put(`/${id}`, updatedRecord);
    return response.data; // Returns the updated record
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error updating library record');
  }
};

// Delete a library record
export const deleteLibraryRecord = async (studentId) => {
    try {
      const response = await axiosInstance.delete(`/${studentId}`); // Use studentId directly in the endpoint
      return response;
    } catch (error) {
      console.error("Error deleting library record:", error.message);
      throw new Error(error.response?.data?.message || "Failed to delete the library record.");
    }
  };
  