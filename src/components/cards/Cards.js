import React from 'react';
import { FaCreditCard, FaLock, FaUnlock } from 'react-icons/fa';
import './Cards.css';

const Cards = () => {
  return (
    <div className="cards-content">
      <h4 className="mb-4">Your Cards</h4>
      
      <div className="row">
        <div className="col-md-6 mb-4">
          <div className="card">
            <div className="card-body">
              <div className="d-flex align-items-center mb-3">
                <div className="card-icon me-3">
                  <FaCreditCard />
                </div>
                <div>
                  <h5 className="mb-1">Debit Card</h5>
                  <p className="card-number mb-0">XXXX XXXX XXXX 1234</p>
                </div>
              </div>
              
              <div className="card-details">
                <div className="row mb-2">
                  <div className="col-6">
                    <p className="detail-label">Card Holder</p>
                    <p className="detail-value">PIYUSH SOLANKI</p>
                  </div>
                  <div className="col-6">
                    <p className="detail-label">Expiry</p>
                    <p className="detail-value">12/25</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-6">
                    <p className="detail-label">Status</p>
                    <p className="detail-value">Active</p>
                  </div>
                  <div className="col-6">
                    <p className="detail-label">Type</p>
                    <p className="detail-value">Visa</p>
                  </div>
                </div>
              </div>
              
              <div className="card-actions mt-3">
                <button className="btn btn-sm btn-outline-danger me-2">
                  <FaLock className="me-1" /> Block Card
                </button>
                <button className="btn btn-sm btn-outline-secondary">
                  Set Limits
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-md-6 mb-4">
          <div className="card">
            <div className="card-body">
              <div className="d-flex align-items-center mb-3">
                <div className="card-icon me-3">
                  <FaCreditCard />
                </div>
                <div>
                  <h5 className="mb-1">Credit Card</h5>
                  <p className="card-number mb-0">XXXX XXXX XXXX 5678</p>
                </div>
              </div>
              
              <div className="card-details">
                <div className="row mb-2">
                  <div className="col-6">
                    <p className="detail-label">Card Holder</p>
                    <p className="detail-value">PIYUSH SOLANKI</p>
                  </div>
                  <div className="col-6">
                    <p className="detail-label">Expiry</p>
                    <p className="detail-value">10/26</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-6">
                    <p className="detail-label">Status</p>
                    <p className="detail-value">Active</p>
                  </div>
                  <div className="col-6">
                    <p className="detail-label">Type</p>
                    <p className="detail-value">Mastercard</p>
                  </div>
                </div>
              </div>
              
              <div className="card-actions mt-3">
                <button className="btn btn-sm btn-outline-danger me-2">
                  <FaLock className="me-1" /> Block Card
                </button>
                <button className="btn btn-sm btn-outline-secondary">
                  Set Limits
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="card">
        <div className="card-header">
          <h5 className="mb-0">Card Transactions</h5>
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table mb-0">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Card</th>
                  <th>Description</th>
                  <th className="text-end">Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>08 Oct 2023</td>
                  <td>Credit Card</td>
                  <td>Amazon.in</td>
                  <td className="text-end text-danger">-₹1,299.00</td>
                </tr>
                <tr>
                  <td>05 Oct 2023</td>
                  <td>Debit Card</td>
                  <td>Grocery Store</td>
                  <td className="text-end text-danger">-₹750.00</td>
                </tr>
                <tr>
                  <td>01 Oct 2023</td>
                  <td>Credit Card</td>
                  <td>Movie Tickets</td>
                  <td className="text-end text-danger">-₹500.00</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cards;