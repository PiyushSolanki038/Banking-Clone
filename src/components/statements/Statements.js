import React, { useState } from 'react';
import './Statements.css';

const Statements = () => {
  const [accountType, setAccountType] = useState('');
  const [period, setPeriod] = useState('1month');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle statement generation logic here
    alert('Statement generated successfully!');
  };

  return (
    <div className="statements-content">
      <h4 className="mb-4">Account Statements</h4>
      
      <div className="card mb-4">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="accountType" className="form-label">Select Account</label>
              <select 
                className="form-select" 
                id="accountType"
                value={accountType}
                onChange={(e) => setAccountType(e.target.value)}
                required
              >
                <option value="">Select Account</option>
                <option value="savings">Savings Account - XXXX1234</option>
              </select>
            </div>
            
            <div className="mb-3">
              <label className="form-label">Select Period</label>
              <div className="period-selector">
                <div className="form-check form-check-inline">
                  <input 
                    className="form-check-input" 
                    type="radio" 
                    name="period" 
                    id="period1month" 
                    value="1month"
                    checked={period === '1month'}
                    onChange={() => setPeriod('1month')}
                  />
                  <label className="form-check-label" htmlFor="period1month">1 Month</label>
                </div>
                <div className="form-check form-check-inline">
                  <input 
                    className="form-check-input" 
                    type="radio" 
                    name="period" 
                    id="period3months" 
                    value="3months"
                    checked={period === '3months'}
                    onChange={() => setPeriod('3months')}
                  />
                  <label className="form-check-label" htmlFor="period3months">3 Months</label>
                </div>
                <div className="form-check form-check-inline">
                  <input 
                    className="form-check-input" 
                    type="radio" 
                    name="period" 
                    id="periodCustom" 
                    value="custom"
                    checked={period === 'custom'}
                    onChange={() => setPeriod('custom')}
                  />
                  <label className="form-check-label" htmlFor="periodCustom">Custom</label>
                </div>
              </div>
            </div>
            
            {period === 'custom' && (
              <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="startDate" className="form-label">Start Date</label>
                  <input 
                    type="date" 
                    className="form-control" 
                    id="startDate"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    required={period === 'custom'}
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="endDate" className="form-label">End Date</label>
                  <input 
                    type="date" 
                    className="form-control" 
                    id="endDate"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    required={period === 'custom'}
                  />
                </div>
              </div>
            )}
            
            <div className="d-grid">
              <button type="submit" className="btn btn-danger">Generate Statement</button>
            </div>
          </form>
        </div>
      </div>
      
      <div className="card">
        <div className="card-header">
          <h5 className="mb-0">Recent Statements</h5>
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table mb-0">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Account</th>
                  <th>Period</th>
                  <th className="text-end">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>10 Oct 2023</td>
                  <td>Savings Account</td>
                  <td>Sep 2023</td>
                  <td className="text-end">
                    <button className="btn btn-sm btn-outline-danger">Download</button>
                  </td>
                </tr>
                <tr>
                  <td>05 Sep 2023</td>
                  <td>Savings Account</td>
                  <td>Aug 2023</td>
                  <td className="text-end">
                    <button className="btn btn-sm btn-outline-danger">Download</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statements;