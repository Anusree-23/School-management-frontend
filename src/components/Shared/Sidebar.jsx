import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/Header.css';

const Sidebar = ({ role }) => {
  const links = {
    admin: [
      { path: '/admin/manage-staff', label: 'Manage Staff' },
      { path: '/admin/students', label: 'Students' },
      { path: '/admin/libraryHistory', label: 'Library History' },
      { path: '/admin/feesHistory', label: 'Fees History' },
    ],
    'office-staff': [
      { path: '/office-staff/students', label: 'Students' },
      { path: '/office-staff/libraryHistory', label: 'Library History' },
      { path: '/office-staff/feesHistory', label: 'Fees History' },
    ],
    librarian: [
      { path: '/librarian/libraryHistory', label: 'Library History' },
      { path: '/librarian/students', label: 'Students' },
    ],
  };

  return (
    <div className="sidebar">
      <h3>{role.charAt(0).toUpperCase() + role.slice(1)} Dashboard</h3>
      <ul>
        {links[role].map((link) => (
          <li key={link.path}>
            <Link to={link.path}>{link.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
