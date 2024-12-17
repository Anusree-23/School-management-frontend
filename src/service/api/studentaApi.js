import axios from 'axios';

const API_BASE_URL = '/api/students'; // Adjust your API base URL

// Function to get the access token from localStorage
const getToken = () => {
  return localStorage.getItem('token'); // Retrieve the saved token
};

// Create a reusable axios instance
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

// Add a request interceptor to include the Authorization header
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`; // Attach the token
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Fetch all students
export const getStudents = async () => {
  try {
    const response = await axiosInstance.get('/');
    return response.data;
  } catch (error) {
    console.error('Error fetching students:', error);
    throw error;
  }
};

// Add a new student
export const addStudent = async (studentData) => {
  try {
    const response = await axiosInstance.post('/', studentData);
    return response.data;
  } catch (error) {
    console.error('Error adding student:', error);
    throw error;
  }
};

// Update an existing student
export const updateStudent = async (id, studentData) => {
  try {
    const response = await axiosInstance.put(`/${id}`, studentData);
    return response.data;
  } catch (error) {
    console.error('Error updating student:', error);
    throw error;
  }
};

// Delete a student
export const deleteStudent = async (id) => {
  try {
    const response = await axiosInstance.delete(`/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting student:', error);
    throw error;
  }
};
