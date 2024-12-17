import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import AdminDashboard from './components/Dashboard/AdminDashboard';
import OfficeStaffDashboard from './components/Dashboard/OfficeStaffDashboard';
import LibrarianDashboard from './components/Dashboard/LibrarianDashboard';
import AdminStudentDetails from './pages/AdminPages/StudentDetails'; // Ensure default export is available
import LibraryRecords from './pages/AdminPages/LibraryRecords';
import FeesRecords from './pages/AdminPages/FeesDetails';
import ManageStaff from './pages/AdminPages/ManageStaff'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login/:role" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/admin/*" element={<AdminDashboard />} />
        <Route path="/office-staff/*" element={<OfficeStaffDashboard />} />
        <Route path="/librarian/*" element={<LibrarianDashboard />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/students" element={<AdminStudentDetails />} />
        <Route path="/admin/libraryHistory" element={<LibraryRecords/>} />
        <Route path="/admin/feesHistory" element={<FeesRecords/>} />
        <Route path="/admin/manage-staff" element={<ManageStaff/>} />
        <Route path="/librarian/libraryHistory" element={<LibraryRecords/>} />
        <Route path="/librarian/students" element={<AdminStudentDetails/>} />
        <Route path="/office-staff/libraryHistory" element={<LibraryRecords/>} />
        <Route path="/office-staff/students" element={<AdminStudentDetails/>} />
        <Route path="/office-staff/feesHistory" element={<FeesRecords/>} />
      </Routes>
    </Router>
  );
}

export default App;
