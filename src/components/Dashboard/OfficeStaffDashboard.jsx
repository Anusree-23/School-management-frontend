import React from 'react';
import Header from '../Shared/Header';
import '../../styles/Dashboard.css';

const OfficeStaffDashboard = () => {
  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        <Header role="office-staff" />
        <div className="content">
          <div className="dashboard-card">
            <h4>Student Details</h4>
            <p>View, edit, or delete student information across all classes.</p>
            <a href="/office-staff/students" className="card-link">
              View Students
            </a>
          </div>
          <div className="dashboard-card">
            <h4>Fees Records</h4>
            <p>Manage and review student fees payment records and remarks.</p>
            <a href="/office-staff/feesHistory" className="card-link">
              View Fees Records
            </a>
          </div>
          <div className="dashboard-card">
            <h4>Library Records</h4>
            <p>Review library borrowing history for students.</p>
            <a href="/office-staff/libraryHistory" className="card-link">
              View Library Records
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfficeStaffDashboard;
