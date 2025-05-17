import React, { useState } from 'react';
import { FaBell, FaLock, FaShieldAlt, FaLanguage } from 'react-icons/fa';
import './Settings.css';

const Settings = () => {
  const [notifications, setNotifications] = useState({
    email: true,
    sms: true,
    app: false
  });

  const handleNotificationChange = (type) => {
    setNotifications({
      ...notifications,
      [type]: !notifications[type]
    });
  };

  return (
    <div className="settings-content">
      <h4 className="mb-4">Settings</h4>
      
      <div className="card mb-4">
        <div className="card-header d-flex align-items-center">
          <FaBell className="me-2 text-danger" />
          <h5 className="mb-0">Notifications</h5>
        </div>
        <div className="card-body">
          <div className="form-check form-switch mb-3">
            <input 
              className="form-check-input" 
              type="checkbox" 
              id="emailNotifications"
              checked={notifications.email}
              onChange={() => handleNotificationChange('email')}
            />
            <label className="form-check-label" htmlFor="emailNotifications">
              Email Notifications
            </label>
            <p className="text-muted small">Receive transaction alerts and important updates via email</p>
          </div>
          
          <div className="form-check form-switch mb-3">
            <input 
              className="form-check-input" 
              type="checkbox" 
              id="smsNotifications"
              checked={notifications.sms}
              onChange={() => handleNotificationChange('sms')}
            />
            <label className="form-check-label" htmlFor="smsNotifications">
              SMS Notifications
            </label>
            <p className="text-muted small">Receive transaction alerts and important updates via SMS</p>
          </div>
          
          <div className="form-check form-switch">
            <input 
              className="form-check-input" 
              type="checkbox" 
              id="appNotifications"
              checked={notifications.app}
              onChange={() => handleNotificationChange('app')}
            />
            <label className="form-check-label" htmlFor="appNotifications">
              App Notifications
            </label>
            <p className="text-muted small">Receive push notifications on your mobile device</p>
          </div>
        </div>
      </div>
      
      <div className="card mb-4">
        <div className="card-header d-flex align-items-center">
          <FaLock className="me-2 text-danger" />
          <h5 className="mb-0">Security</h5>
        </div>
        <div className="card-body">
          <div className="mb-3">
            <button className="btn btn-outline-danger">Change Password</button>
          </div>
          <div className="mb-3">
            <button className="btn btn-outline-danger">Set Transaction PIN</button>
          </div>
          <div>
            <button className="btn btn-outline-danger">Two-Factor Authentication</button>
          </div>
        </div>
      </div>
      
      <div className="card">
        <div className="card-header d-flex align-items-center">
          <FaLanguage className="me-2 text-danger" />
          <h5 className="mb-0">Language</h5>
        </div>
        <div className="card-body">
          <select className="form-select">
            <option value="en">English</option>
            <option value="hi">Hindi</option>
            <option value="mr">Marathi</option>
            <option value="gu">Gujarati</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Settings;