import axios from 'axios';

export const registerUser = async (userData) => {
  try {
    const response = await axios.post('/api/auth/register', userData); // Use relative path
    console.log('User registered:', response.data);
  } catch (error) {
    console.error('API Error:', error.response?.data || error.message);
  }
};


export const loginUser = async (userData) => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
  
      if (!response.ok) {
        throw new Error('Failed to login');
      }
  
      const data = await response.json();
  
      // Store the access token in localStorage
      if (data.token) {
        localStorage.setItem('token', data.token);
        console.log('Access token stored successfully',data.token);
      } else {
        console.error('No token received in the response');
      }
  
      return data; // This returns the response object (e.g., { message, token })
    } catch (error) {
      throw new Error(error.message || 'An error occurred');
    }
  };
  
  