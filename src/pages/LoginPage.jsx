import React from 'react';
import { useParams } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import '../styles/common.css';
import loginImage from '../assets/login-image.svg'; // Replace with your actual image path

const LoginPage = () => {
  const { role } = useParams();

  const capitalizeRole = (role) => {
    return role.charAt(0).toUpperCase() + role.slice(1);
  };

  return (
    <div className="form-page-container">
      {/* Image Section */}
      <div className="image-container">
        <img src={loginImage} alt="Login Illustration" />
      </div>

      {/* Form Section */}
      <div className="form-container">
        <LoginForm role={capitalizeRole(role)} />
      </div>
    </div>
  );
};

export default LoginPage;
