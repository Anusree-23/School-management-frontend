import React from 'react';
import Header from '../Shared/Header';
import '../../styles/Dashboard.css';

const LibrarianDashboard = () => {
  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        <Header role="librarian" />
        <div className="content">
          <div className="dashboard-card">
            <h4>Library Records</h4>
            <p>Access and manage the library borrowing history for students.</p>
            <a href="/librarian/libraryHistory" className="card-link">
              View Library Records
            </a>
          </div>
          <div className="dashboard-card">
            <h4>Student Details</h4>
            <p>View student details to associate them with library records.</p>
            <a href="/librarian/students" className="card-link">
              View Students
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LibrarianDashboard;
