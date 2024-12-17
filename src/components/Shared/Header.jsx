import React from 'react';
import { useNavigate } from 'react-router-dom'; // React Router to handle page redirection
import '../../styles/Header.css';

const Header = ({ role }) => {
  const navigate = useNavigate(); // Hook to navigate to different routes

  const handleLogout = () => {
    
    localStorage.removeItem('token'); 
    sessionStorage.removeItem('token'); 
    
    // Redirect to the homepage
    navigate('/');  // Go to homepage or login page
    alert('Logged out successfully');
  };

  return (
    <header className="header">
      <h2>{role.charAt(0).toUpperCase() + role.slice(1)} Dashboard</h2>
      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </header>
  );
};

export default Header;
