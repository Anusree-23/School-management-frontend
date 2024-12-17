import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Assuming you're using React Router
import { loginUser } from '../service/api/authApi';
import '../styles/ErrorModal.css'; // Error modal styles

const LoginForm = ({ role }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false); // Error modal state
  const [errorMessage, setErrorMessage] = useState(''); // Error message
  const [successMessage, setSuccessMessage] = useState(''); // Success message
  const navigate = useNavigate(); // React Router navigation

  const handleLogin = async (e) => {
    e.preventDefault();
  
    const userData = { email, password };
    console.log('User Data to Login:', userData);
  
    try {
      setIsLoading(true); // Set loading state to true
      const response = await loginUser(userData);
      console.log('API Response:', response);

      // Check for successful login
      if (response.token) {
        setSuccessMessage(response.message); // Show success message from API
        console.log("response.message",response.message)
        if (role === 'Admin') {
          navigate('/admin'); // Redirect to admin dashboard
        } else if (role === 'Librarian') {
          navigate('/librarian'); // Redirect to librarian dashboard
        } else if (role === 'Office-staff') {
          navigate('/office-staff'); // Redirect to office staff dashboard
        } else {
          navigate('/'); // Default case
        }
      } else {
        // If no token in response, show an invalid user message
        setErrorMessage('Invalid user credentials');
        setIsErrorModalOpen(true); // Open error modal
      }
    } catch (error) {
      console.error('API Error:', error);
      setErrorMessage(error.message || 'An error occurred while logging in');
      setIsErrorModalOpen(true); // Open error modal
    } finally {
      setIsLoading(false); // Set loading state to false
    }
  };

  const closeErrorModal = () => {
    setIsErrorModalOpen(false);
    setErrorMessage('');
    setSuccessMessage(''); // Reset success message when closing
  };

  return (
    <div className="form-container">
      <h2>{role} Login</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>
        <button type="submit" className="btn-primary" disabled={isLoading}>
          {isLoading ? 'Logging In...' : 'Login'}
        </button>
      </form>

      {/* Success Modal */}
      {successMessage && (
        <div className="error-modal-overlay">
          <div className="error-modal-content">
            <h2>Success</h2>
            <p>{successMessage}</p>
            <button onClick={closeErrorModal} className="btn-close">
              Close
            </button>
          </div>
        </div>
      )}

      {/* Error Modal */}
      {isErrorModalOpen && (
        <div className="error-modal-overlay">
          <div className="error-modal-content">
            <h2>Error</h2>
            <p>{errorMessage}</p>
            <button onClick={closeErrorModal} className="btn-close">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginForm;
