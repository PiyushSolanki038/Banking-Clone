import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import './Accounts.css';

const Accounts = () => {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showNewAccountForm, setShowNewAccountForm] = useState(false);
  const [newAccountType, setNewAccountType] = useState('Savings');

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const res = await api.get('/accounts');
        setAccounts(res.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load accounts. Please try again later.');
        setLoading(false);
      }
    };
    
    fetchAccounts();
  }, []);

  const handleCreateAccount = async (e) => {
    e.preventDefault();
    
    try {
      const res = await api.post('/accounts', { accountType: newAccountType });
      setAccounts([...accounts, res.data]);
      setShowNewAccountForm(false);
      setNewAccountType('Savings');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create account. Please try again.');
    }
  };

  if (loading) {
    return <div className="text-center p-5">Loading...</div>;
  }

  return (
    <div className="accounts-content">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4>Accounts & Deposits</h4>
        <button 
          className="btn btn-danger"
          onClick={() => setShowNewAccountForm(!showNewAccountForm)}
        >
          {showNewAccountForm ? 'Cancel' : 'New Account'}
        </button>
      </div>
      
      {error && <div className="alert alert-danger">{error}</div>}
      
      {showNewAccountForm && (
        <div className="card mb-4">
          <div className="card-header">
            <h5 className="mb-0">Open New Account</h5>
          </div>
          <div className="card-body">
            <form onSubmit={handleCreateAccount}>
              <div className="mb-3">
                <label htmlFor="accountType" className="form-label">Account Type</label>
                <select 
                  className="form-select" 
                  id="accountType"
                  value={newAccountType}
                  onChange={(e) => setNewAccountType(e.target.value)}
                  required
                >
                  <option value="Savings">Savings Account</option>
                  <option value="Checking">Checking Account</option>
                  <option value="Fixed Deposit">Fixed Deposit</option>
                </select>
              </div>
              
              <div className="d-grid">
                <button type="submit" className="btn btn-danger">Create Account</button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      {accounts.length === 0 ? (
        <div className="alert alert-info">You don't have any accounts yet. Create one to get started.</div>
      ) : (
        accounts.map(account => (
          <div className="card mb-4" key={account._id}>
            <div className="card-header">
              <h5 className="mb-0">{account.accountType}</h5>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-6">
                  <p className="account-label">Account Number</p>
                  <p className="account-value">{account.accountNumber}</p>
                </div>
                <div className="col-md-6">
                  <p className="account-label">Available Balance</p>
                  <p className="account-value">₹{account.balance.toFixed(2)}</p>
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-md-6">
                  <p className="account-label">Account Type</p>
                  <p className="account-value">{account.accountType}</p>
                </div>
                <div className="col-md-6">
                  <p className="account-label">Status</p>
                  <p className="account-value">{account.status}</p>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Accounts;