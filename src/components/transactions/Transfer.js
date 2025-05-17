import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Transfer = () => {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    fromAccountId: '',
    toAccountNumber: '',
    amount: '',
    description: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/accounts');
        setAccounts(res.data);
        
        if (res.data.length > 0) {
          setFormData({ ...formData, fromAccountId: res.data[0]._id });
        }
        
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch accounts');
        setLoading(false);
      }
    };

    fetchAccounts();
  }, []);

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async e => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    try {
      const { fromAccountId, toAccountNumber, amount, description } = formData;
      
      if (!fromAccountId || !toAccountNumber || !amount || amount <= 0) {
        setError('Please provide valid accounts and amount');
        return;
      }
      
      await axios.post('http://localhost:5000/api/transactions/transfer', {
        fromAccountId,
        toAccountNumber,
        amount,
        description
      });
      
      // Refresh accounts
      const res = await axios.get('http://localhost:5000/api/accounts');
      setAccounts(res.data);
      
      setSuccess('Transfer successful');
      setFormData({
        ...formData,
        toAccountNumber: '',
        amount: '',
        description: ''
      });
    } catch (err) {
      setError(err.response?.data?.msg || 'Failed to process transfer');
    }
  };

  if (loading) {
    return <div className="text-center mt-5"><div className="spinner-border" role="status"></div></div>;
  }

  return (
    <div>
      <h1 className="mb-4">Transfer Money</h1>
      
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
      
      <div className="row">
        <div className="col-md-6 mx-auto">
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">Transfer Details</h5>
            </div>
            <div className="card-body">
              {accounts.length === 0 ? (
                <p>You need to create an account first.</p>
              ) : (
                <form onSubmit={onSubmit}>
                  <div className="mb-3">
                    <label htmlFor="fromAccountId" className="form-label">From Account</label>
                    <select
                      className="form-select"
                      id="fromAccountId"
                      name="fromAccountId"
                      value={formData.fromAccountId}
                      onChange={onChange}
                      required
                    >
                      {accounts.map(account => (
                        <option key={account._id} value={account._id}>
                          {account.accountType} - {account.accountNumber} (${account.balance.toFixed(2)})
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="toAccountNumber" className="form-label">To Account Number</label>
                    <input
                      type="text"
                      className="form-control"
                      id="toAccountNumber"
                      name="toAccountNumber"
                      value={formData.toAccountNumber}
                      onChange={onChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="amount" className="form-label">Amount</label>
                    <div className="input-group">
                      <span className="input-group-text">$</span>
                      <input
                        type="number"
                        className="form-control"
                        id="amount"
                        name="amount"
                        value={formData.amount}
                        onChange={onChange}
                        min="0.01"
                        step="0.01"
                        required
                      />
                    </div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input
                      type="text"
                      className="form-control"
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={onChange}
                      placeholder="Optional"
                    />
                  </div>
                  <button type="submit" className="btn btn-primary w-100">Transfer</button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transfer;