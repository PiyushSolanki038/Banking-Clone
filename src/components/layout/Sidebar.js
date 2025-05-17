import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  FaHome, 
  FaExchangeAlt, 
  FaFileAlt, 
  FaCreditCard, 
  FaCog, 
  FaUser, 
  FaSignOutAlt,
  FaUniversity
} from 'react-icons/fa';
import './Sidebar.css';

const Sidebar = ({ handleLogout }) => {
  const location = useLocation();

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h3>Kotak Bank</h3>
      </div>
      <div className="sidebar-menu">
        <Link 
          to="/dashboard" 
          className={`sidebar-item ${location.pathname === '/dashboard' ? 'active' : ''}`}
        >
          <FaHome className="sidebar-icon" />
          <span>Dashboard</span>
        </Link>
        
        <Link 
          to="/accounts" 
          className={`sidebar-item ${location.pathname === '/accounts' ? 'active' : ''}`}
        >
          <FaUniversity className="sidebar-icon" />
          <span>Accounts</span>
        </Link>
        
        <Link 
          to="/fund-transfer" 
          className={`sidebar-item ${location.pathname === '/fund-transfer' ? 'active' : ''}`}
        >
          <FaExchangeAlt className="sidebar-icon" />
          <span>Fund Transfer</span>
        </Link>
        
        <Link 
          to="/statements" 
          className={`sidebar-item ${location.pathname === '/statements' ? 'active' : ''}`}
        >
          <FaFileAlt className="sidebar-icon" />
          <span>Statements</span>
        </Link>
        
        <Link 
          to="/cards" 
          className={`sidebar-item ${location.pathname === '/cards' ? 'active' : ''}`}
        >
          <FaCreditCard className="sidebar-icon" />
          <span>Cards</span>
        </Link>
        
        <Link 
          to="/settings" 
          className={`sidebar-item ${location.pathname === '/settings' ? 'active' : ''}`}
        >
          <FaCog className="sidebar-icon" />
          <span>Settings</span>
        </Link>
        
        <Link 
          to="/profile" 
          className={`sidebar-item ${location.pathname === '/profile' ? 'active' : ''}`}
        >
          <FaUser className="sidebar-icon" />
          <span>Profile</span>
        </Link>
      </div>
      <div className="sidebar-footer">
        <button className="sidebar-item logout-btn" onClick={handleLogout}>
          <FaSignOutAlt className="sidebar-icon" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;