import React from 'react';
import { FaEye } from 'react-icons/fa';
import './Transactions.css';

const Transactions = () => {
  // Sample transaction data
  const transactions = [
    { id: 1, date: '10 Oct 2023', description: 'Salary', amount: 1000.00, type: 'credit' },
    { id: 2, date: '05 Oct 2023', description: 'ATM Withdrawal', amount: 250.00, type: 'debit' },
    { id: 3, date: '01 Oct 2023', description: 'Transfer to Checking', amount: 500.00, type: 'debit' },
  ];

  const totalBalance = 5000.00;

  return (
    <div className="transactions-container">
      <div className="welcome-message mb-4">
        You last logged on 10 Oct 2023, 09:43 PM
      </div>
      
      {/* Account Summary */}
      <div className="card mb-4">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div>Assets</div>
            <button className="btn btn-link text-danger p-0">
              <FaEye className="me-1" /> View balance
            </button>
          </div>
          
          <div className="d-flex justify-content-between align-items-center">
            <div>Liabilities</div>
            <button className="btn btn-link text-danger p-0">
              <FaEye className="me-1" /> View balance
            </button>
          </div>
          
          <div className="mt-3 pt-3 border-top">
            <p className="mb-0 small">
              Explore popular offers on payment through Credit Card, Debit Card, Net banking & other modes
            </p>
          </div>
        </div>
      </div>
      
      {/* Transactions Table */}
      <div className="card">
        <div className="card-header bg-white d-flex justify-content-between align-items-center">
          <h6 className="mb-0">Your Recent Transactions</h6>
          <div className="text-end">
            <p className="mb-0 small">Savings: ₹{totalBalance.toFixed(2)}</p>
          </div>
        </div>
        <div className="card-body p-0">
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
                  <tr key={transaction.id}>
                    <td>{transaction.date}</td>
                    <td>{transaction.description}</td>
                    <td className={`text-end ${transaction.type === 'credit' ? 'text-success' : 'text-danger'}`}>
                      {transaction.type === 'credit' ? '+' : '-'}₹{transaction.amount.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transactions;