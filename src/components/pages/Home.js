import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <div className="jumbotron">
        <h1 className="display-4">Welcome to BankApp</h1>
        <p className="lead">Your trusted banking partner for all your financial needs.</p>
        <hr className="my-4" />
        <p>Manage your accounts, track transactions, and more with our easy-to-use banking platform.</p>
        <Link to="/dashboard" className="btn btn-primary btn-lg">Go to Dashboard</Link>
      </div>
      
      <div className="row mt-5">
        <div className="col-md-4 mb-4">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title">Account Management</h5>
              <p className="card-text">Create and manage multiple accounts with ease. Track balances and account details in one place.</p>
              <Link to="/accounts" className="btn btn-outline-primary">Manage Accounts</Link>
            </div>
          </div>
        </div>
        
        <div className="col-md-4 mb-4">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title">Transaction History</h5>
              <p className="card-text">View your complete transaction history. Filter by date, type, or account.</p>
              <Link to="/transactions" className="btn btn-outline-primary">View Transactions</Link>
            </div>
          </div>
        </div>
        
        <div className="col-md-4 mb-4">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title">Dashboard Overview</h5>
              <p className="card-text">Get a quick overview of your accounts and recent transactions from your personalized dashboard.</p>
              <Link to="/dashboard" className="btn btn-outline-primary">Go to Dashboard</Link>
            </div>
          </div>
        </div>
      </div>
      
      <div className="row mt-4">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h5>Banking Features</h5>
            </div>
            <div className="card-body">
              <ul className="list-group list-group-flush">
                <li className="list-group-item">Multiple account types (Savings, Checking, Fixed Deposit)</li>
                <li className="list-group-item">Secure online transactions</li>
                <li className="list-group-item">Detailed transaction history</li>
                <li className="list-group-item">Account balance tracking</li>
                <li className="list-group-item">Easy money transfers between accounts</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h5>Why Choose Us</h5>
            </div>
            <div className="card-body">
              <p>At BankApp, we prioritize security, convenience, and customer satisfaction. Our platform offers:</p>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">24/7 account access</li>
                <li className="list-group-item">User-friendly interface</li>
                <li className="list-group-item">Secure banking environment</li>
                <li className="list-group-item">Responsive customer support</li>
                <li className="list-group-item">Regular feature updates</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;