import React from "react";
import "../styles/HomePage.css";
import logo from "../assets/logo.svg";

const HomePage = () => {
  return (
    <div className="homepage">
      <main className="homepage-main">
        <div className="content-wrapper">
          <div className="image-container">
            <img
              src={logo}
              alt="School Management Logo"
              className="homepage-image"
            />
          </div>
          <div className="text-container">
            <h1>Welcome to the School Management System</h1>
            <p>
              This platform provides efficient tools to manage students, track
              library records, and handle fees seamlessly. Log in with your role
              to get started!
            </p>
            <div className="role-links">
              <a href="/login/admin">Admin</a>
              <a href="/login/office-staff">Office Staff</a>
              <a href="/login/librarian">Librarian</a>
            </div>
            <p className="signup-text">
              Don’t have an account?{" "}
              <a href="/signup" className="signup-link">
                Sign up
              </a>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
