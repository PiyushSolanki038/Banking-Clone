import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/layout/Sidebar';
import Navbar from './components/layout/Navbar';
import Dashboard from './components/dashboard/Dashboard';
import Accounts from './components/accounts/Accounts';
import FundTransfer from './components/fundtransfer/FundTransfer';
import Statements from './components/statements/Statements';
import Cards from './components/cards/Cards';
import Settings from './components/settings/Settings';
import Profile from './components/profile/Profile';
import Home from './components/home/Home';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import api from './services/api';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    
    if (token && storedUser) {
      setIsLoggedIn(true);
      setUser(JSON.parse(storedUser));
      
      // Verify token validity
      const verifyToken = async () => {
        try {
          await api.get('/users/profile');
        } catch (err) {
          // If token is invalid, log out
          handleLogout();
        } finally {
          setLoading(false);
        }
      };
      
      verifyToken();
    } else {
      setLoading(false);
    }
  }, []);
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUser(null);
  };

  if (loading) {
    return <div className="loading-screen">Loading...</div>;
  }

  return (
    <Router>
      <div className="app-container">
        {isLoggedIn ? (
          // Authenticated user view with sidebar
          <>
            <Sidebar handleLogout={handleLogout} />
            <div className="main-content">
              <Navbar user={user} />
              <div className="content-wrapper">
                <Routes>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/accounts" element={<Accounts />} />
                  <Route path="/fund-transfer" element={<FundTransfer />} />
                  <Route path="/statements" element={<Statements />} />
                  <Route path="/cards" element={<Cards />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="*" element={<Navigate to="/dashboard" replace />} />
                </Routes>
              </div>
            </div>
          </>
        ) : (
          // Public view without sidebar
          <div className="main-content w-100">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} setUser={setUser} />} />
              <Route path="/register" element={<Register />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        )}
      </div>
    </Router>
  );
}

export default App;
