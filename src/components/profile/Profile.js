import React, { useState, useEffect } from 'react';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaIdCard } from 'react-icons/fa';
import api from '../../services/api';
import './Profile.css';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: ''
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get('/users/profile');
        setProfile(res.data);
        setFormData({
          name: res.data.name,
          phone: res.data.phone,
          address: res.data.address
        });
        setLoading(false);
      } catch (err) {
        setError('Failed to load profile. Please try again later.');
        setLoading(false);
      }
    };
    
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const res = await api.put('/users/profile', formData);
      setProfile(res.data);
      setEditMode(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile. Please try again.');
    }
  };

  if (loading) {
    return <div className="text-center p-5">Loading...</div>;
  }

  if (!profile) {
    return <div className="alert alert-danger m-3">{error || 'Failed to load profile'}</div>;
  }

  return (
    <div className="profile-content">
      <h4 className="mb-4">Your Profile</h4>
      
      {error && <div className="alert alert-danger">{error}</div>}
      
      <div className="card mb-4">
        <div className="card-body">
          {!editMode ? (
            <>
              <div className="text-center mb-4">
                <div className="profile-avatar">
                  <span>{profile.name.split(' ').map(n => n[0]).join('')}</span>
                </div>
                <h5 className="mt-3 mb-0">{profile.name}</h5>
                <p className="text-muted">Customer ID: {profile._id}</p>
              </div>
              
              <div className="profile-info">
                <div className="info-item">
                  <div className="info-icon">
                    <FaUser />
                  </div>
                  <div className="info-content">
                    <p className="info-label">Full Name</p>
                    <p className="info-value">{profile.name}</p>
                  </div>
                </div>
                
                <div className="info-item">
                  <div className="info-icon">
                    <FaEnvelope />
                  </div>
                  <div className="info-content">
                    <p className="info-label">Email Address</p>
                    <p className="info-value">{profile.email}</p>
                  </div>
                </div>
                
                <div className="info-item">
                  <div className="info-icon">
                    <FaPhone />
                  </div>
                  <div className="info-content">
                    <p className="info-label">Mobile Number</p>
                    <p className="info-value">{profile.phone}</p>
                  </div>
                </div>
                
                <div className="info-item">
                  <div className="info-icon">
                    <FaMapMarkerAlt />
                  </div>
                  <div className="info-content">
                    <p className="info-label">Address</p>
                    <p className="info-value">{profile.address}</p>
                  </div>
                </div>
                
                <div className="info-item">
                  <div className="info-icon">
                    <FaIdCard />
                  </div>
                  <div className="info-content">
                    <p className="info-label">PAN</p>
                    <p className="info-value">{profile.pan}</p>
                  </div>
                </div>
              </div>
              
              <div className="text-center mt-4">
                <button className="btn btn-danger" onClick={() => setEditMode(true)}>
                  Update Profile
                </button>
              </div>
            </>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Full Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="mb-3">
                <label htmlFor="phone" className="form-label">Mobile Number</label>
                <input
                  type="tel"
                  className="form-control"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="mb-3">
                <label htmlFor="address" className="form-label">Address</label>
                <textarea
                  className="form-control"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              
              <div className="d-flex justify-content-center gap-2">
                <button type="submit" className="btn btn-danger">
                  Save Changes
                </button>
                <button 
                  type="button" 
                  className="btn btn-outline-secondary"
                  onClick={() => setEditMode(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;