import {React, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Assuming you're using React Router
import { registerUser } from '../service/api/authApi';
import signupImage from '../assets/signup-image.svg'; // Replace with your actual image path
import '../styles/ErrorModal.css';

const SignupPage = () => {
  const [role, setRole] = useState('admin');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false); // Error modal state
  const [errorMessage, setErrorMessage] = useState(''); // Error message
  const navigate = useNavigate(); // React Router navigation

  const handleSignup = async (e) => {
    e.preventDefault();
  
    // Normalize the role value to be "Admin" (capitalized)
    const normalizedRole = role.charAt(0).toUpperCase() + role.slice(1).toLowerCase();
  
    const userData = { name, email, password, role: normalizedRole };
    console.log('User Data to Register:', userData);
  
    try {
      setIsLoading(true); // Set loading state to true
      const response = await registerUser(userData);
      console.log('API Response:', response);
      navigate('/'); // Redirect to homepage after successful registration
    } catch (error) {
      console.error('API Error:', error); // Log the error
      setErrorMessage(error.response ? error.response.data.message : 'An error occurred while registering.');
      setIsErrorModalOpen(true); // Show error modal if there is an error
    } finally {
      setIsLoading(false); // Set loading state to false
    }
  };
  
  

  const closeErrorModal = () => {
    setIsErrorModalOpen(false);
    setErrorMessage('');
  };

  return (
    <div className="form-page-container">
      {/* Image Section */}
      <div className="image-container">
        <img src={signupImage} alt="Signup Illustration" />
      </div>

      {/* Form Section */}
      <div className="form-container">
        <h2>Sign Up</h2>
        <form onSubmit={handleSignup}>
          <div className="form-group">
            <label>Role</label>
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="admin">Admin</option>
              <option value="office-staff">Office Staff</option>
              <option value="librarian">Librarian</option>
            </select>
          </div>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              required
            />
          </div>
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
            {isLoading ? 'Signing Up...' : 'Sign Up'}
          </button>
        </form>
      </div>

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

export default SignupPage;
