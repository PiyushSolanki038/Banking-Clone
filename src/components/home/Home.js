import React from 'react';
import { Link } from 'react-router-dom';
import { FaShieldAlt, FaMobileAlt, FaCreditCard, FaChartLine, FaArrowRight } from 'react-icons/fa';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      {/* Header */}
      <header className="home-header">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <h1 className="mb-3">Banking Made <span className="text-primary">Simple</span></h1>
              <p className="lead mb-4">Experience seamless banking with our secure and user-friendly online platform.</p>
              <div className="d-flex flex-wrap">
                <Link to="/login" className="btn btn-primary me-3 mb-2">Login <FaArrowRight className="ms-2" /></Link>
                <Link to="/register" className="btn btn-outline-primary mb-2">Register Now</Link>
              </div>
            </div>
            <div className="col-md-6 d-none d-md-block text-center">
              <img src="/images/banking-hero.png" alt="Online Banking" className="img-fluid" style={{ maxHeight: '300px' }} />
            </div>
          </div>
        </div>
      </header>

      {/* Features Section - simplified */}
      <section className="features-section">
        <div className="container">
          <h2 className="text-center mb-4">Why Choose Our Bank?</h2>
          <div className="row">
            <div className="col-md-3 col-sm-6 mb-4">
              <div className="feature-card">
                <div className="feature-icon">
                  <FaShieldAlt />
                </div>
                <h5>Secure Banking</h5>
                <p>Bank with confidence with our advanced security measures.</p>
              </div>
            </div>
            <div className="col-md-3 col-sm-6 mb-4">
              <div className="feature-card">
                <div className="feature-icon">
                  <FaMobileAlt />
                </div>
                <h5>Mobile Banking</h5>
                <p>Access your accounts anytime, anywhere with our mobile app.</p>
              </div>
            </div>
            <div className="col-md-3 col-sm-6 mb-4">
              <div className="feature-card">
                <div className="feature-icon">
                  <FaCreditCard />
                </div>
                <h5>Card Services</h5>
                <p>Manage your credit and debit cards with ease.</p>
              </div>
            </div>
            <div className="col-md-3 col-sm-6 mb-4">
              <div className="feature-card">
                <div className="feature-icon">
                  <FaChartLine />
                </div>
                <h5>Investment Options</h5>
                <p>Grow your wealth with our diverse investment solutions.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container text-center">
          <h2 className="mb-4">Ready to Experience Better Banking?</h2>
          <p className="lead mb-4">Join thousands of satisfied customers who trust us for their financial needs.</p>
          <div className="d-flex justify-content-center">
            <Link to="/login" className="btn btn-primary me-3">Login</Link>
            <Link to="/register" className="btn btn-outline-primary">Open an Account</Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="home-footer">
        <div className="container">
          <div className="row">
            <div className="col-md-6 mb-4 mb-md-0">
              <h5 className="mb-3">About Us</h5>
              <p>We provide secure, reliable banking services to help you manage your finances with ease.</p>
            </div>
            <div className="col-md-3 col-6 mb-4 mb-md-0">
              <h5 className="mb-3">Quick Links</h5>
              <ul className="footer-links">
                <li><a href="#">About Us</a></li>
                <li><a href="#">Careers</a></li>
                <li><a href="#">Contact Us</a></li>
              </ul>
            </div>
            <div className="col-md-3 col-6 mb-4 mb-md-0">
              <h5 className="mb-3">Contact</h5>
              <p>Customer Care: 1800 123 4567</p>
              <p>Email: support@bank.com</p>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-12">
              <p className="text-center mb-0">© 2023 Bank. All Rights Reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;