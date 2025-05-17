import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import './Dashboard.css';

const Dashboard = () => {
  const [accounts, setAccounts] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [accountsRes, transactionsRes] = await Promise.all([
          api.get('/accounts'),
          api.get('/transactions')
        ]);
        
        setAccounts(accountsRes.data);
        setTransactions(transactionsRes.data.slice(0, 5)); // Get only the latest 5 transactions
        setLoading(false);
      } catch (err) {
        setError('Failed to load data. Please try again later.');
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  if (loading) {
    return <div className="text-center p-5">Loading...</div>;
  }
  
  if (error) {
    return <div className="alert alert-danger m-3">{error}</div>;
  }
  
  // Get the main savings account
  const savingsAccount = accounts.find(account => account.accountType === 'Savings') || {};
  
  return (
    <div className="dashboard-content">
      <div className="welcome-message mb-3">
        You last logged on {new Date().toLocaleString()}
      </div>
      
      {/* Account Summary */}
      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title mb-4">Account Overview</h5>
          
          {accounts.length === 0 ? (
            <p>No accounts found.</p>
          ) : (
            <div className="account-summary">
              <div className="row">
                <div className="col-md-6">
                  <p className="text-muted mb-1">Account Number</p>
                  <p className="fw-bold">{savingsAccount.accountNumber}</p>
                </div>
                <div className="col-md-6">
                  <p className="text-muted mb-1">Available Balance</p>
                  <p className="fw-bold">₹{savingsAccount.balance?.toFixed(2) || '0.00'}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Recent Transactions */}
      <div className="card">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h5 className="mb-0">Recent Transactions</h5>
          <Link to="/transactions" className="btn btn-sm btn-outline-danger">View All</Link>
        </div>
        <div className="card-body p-0">
          {transactions.length === 0 ? (
            <p className="p-3">No transactions found.</p>
          ) : (
            <div className="table-responsive">
              <table className="table mb-0">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Description</th>
                    <th className="text-end">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map(transaction => (
                    <tr key={transaction._id}>
                      <td>{new Date(transaction.createdAt).toLocaleDateString()}</td>
                      <td>{transaction.description}</td>
                      <td className={`text-end ${transaction.type === 'Deposit' || transaction.type === 'Salary' ? 'text-success' : 'text-danger'}`}>
                        {transaction.type === 'Deposit' || transaction.type === 'Salary' ? '+' : '-'}₹{transaction.amount.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;