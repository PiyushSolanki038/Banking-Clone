import React from 'react';
import './Navbar.css';

const Navbar = ({ user }) => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h4>Kotak Bank</h4>
      </div>
      <div className="navbar-right">
        <div className="navbar-user">
          <span className="user-name">{user?.name || ''}</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;