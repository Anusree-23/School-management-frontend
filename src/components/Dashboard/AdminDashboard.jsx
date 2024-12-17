import React from 'react';
import { Link } from 'react-router-dom'; // Use Link for navigation
import Header from '../Shared/Header';
import '../../styles/Dashboard.css';

const AdminDashboard = () => {
  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        <Header role="admin" />
        <div className="content">
          <div className="dashboard-card">
            <h4>Manage Staff</h4>
            <p>Create, edit, and delete Office Staff and Librarian accounts.</p>
            <Link to="/admin/manage-staff" className="card-link">
              Go to Manage Staff
            </Link>
          </div>
          <div className="dashboard-card">
            <h4>Student Details</h4>
            <p>View, edit, or delete student information across all classes.</p>
            <Link to="/admin/students" className="card-link">
              View Students
            </Link>
          </div>
          <div className="dashboard-card">
            <h4>Library Records</h4>
            <p>Access and manage the library borrowing history for students.</p>
            <Link to="/admin/libraryHistory" className="card-link">
              View Library Records
            </Link>
          </div>
          <div className="dashboard-card">
            <h4>Fees Records</h4>
            <p>Manage and review student fees payment records and remarks.</p>
            <Link to="/admin/feesHistory" className="card-link">
              View Fees Records
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
