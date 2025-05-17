import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import './FundTransfer.css';

const FundTransfer = () => {
  const [transferType, setTransferType] = useState('ownAccount');
  const [amount, setAmount] = useState('');
  const [accountFrom, setAccountFrom] = useState('');
  const [accountTo, setAccountTo] = useState('');
  const [remarks, setRemarks] = useState('');
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const res = await api.get('/accounts');
        setAccounts(res.data);
        
        if (res.data.length > 0) {
          setAccountFrom(res.data[0]._id);
        }
        
        setLoading(false);
      } catch (err) {
        setError('Failed to load accounts. Please try again later.');
        setLoading(false);
      }
    };
    
    fetchAccounts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    if (!accountFrom || !accountTo || !amount) {
      return setError('Please fill all required fields');
    }
    
    if (accountFrom === accountTo) {
      return setError('Source and destination accounts cannot be the same');
    }
    
    try {
      await api.post('/transactions/transfer', {
        fromAccountId: accountFrom,
        toAccountId: accountTo,
        amount: parseFloat(amount),
        description: remarks || 'Fund Transfer'
      });
      
      setSuccess('Transfer completed successfully!');
      setAmount('');
      setRemarks('');
    } catch (err) {
      setError(err.response?.data?.message || 'Transfer failed. Please try again.');
    }
  };

  if (loading) {
    return <div className="text-center p-5">Loading...</div>;
  }

  return (
    <div className="fund-transfer-content">
      <h4 className="mb-4">Fund Transfer</h4>
      
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
      
      <div className="card">
        <div className="card-body">
          <div className="transfer-type-selector mb-4">
            <div className="btn-group w-100">
              <button 
                className={`btn ${transferType === 'ownAccount' ? 'btn-danger' : 'btn-outline-danger'}`}
                onClick={() => setTransferType('ownAccount')}
              >
                Own Account
              </button>
              <button 
                className={`btn ${transferType === 'otherAccount' ? 'btn-danger' : 'btn-outline-danger'}`}
                onClick={() => setTransferType('otherAccount')}
              >
                Other Account
              </button>
              <button 
                className={`btn ${transferType === 'imps' ? 'btn-danger' : 'btn-outline-danger'}`}
                onClick={() => setTransferType('imps')}
              >
                IMPS
              </button>
            </div>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="accountFrom" className="form-label">From Account</label>
              <select 
                className="form-select" 
                id="accountFrom"
                value={accountFrom}
                onChange={(e) => setAccountFrom(e.target.value)}
                required
              >
                <option value="">Select Account</option>
                {accounts.map(account => (
                  <option key={account._id} value={account._id}>
                    {account.accountType} - {account.accountNumber} (₹{account.balance.toFixed(2)})
                  </option>
                ))}
              </select>
            </div>
            
            <div className="mb-3">
              <label htmlFor="accountTo" className="form-label">To Account</label>
              {transferType === 'ownAccount' ? (
                <select 
                  className="form-select" 
                  id="accountTo"
                  value={accountTo}
                  onChange={(e) => setAccountTo(e.target.value)}
                  required
                >
                  <option value="">Select Account</option>
                  {accounts.map(account => (
                    account._id !== accountFrom && (
                      <option key={account._id} value={account._id}>
                        {account.accountType} - {account.accountNumber}
                      </option>
                    )
                  ))}
                </select>
              ) : (
                <input 
                  type="text" 
                  className="form-control" 
                  id="accountTo"
                  value={accountTo}
                  onChange={(e) => setAccountTo(e.target.value)}
                  placeholder="Enter account number"
                  required
                />
              )}
            </div>
            
            <div className="mb-3">
              <label htmlFor="amount" className="form-label">Amount (₹)</label>
              <input 
                type="number" 
                className="form-control" 
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
                min="1"
                step="0.01"
              />
            </div>
            
            <div className="mb-3">
              <label htmlFor="remarks" className="form-label">Remarks</label>
              <input 
                type="text" 
                className="form-control" 
                id="remarks"
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                placeholder="Optional"
              />
            </div>
            
            <div className="d-grid">
              <button type="submit" className="btn btn-danger">Transfer Now</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FundTransfer;