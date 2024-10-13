// src/HomePage.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const HomePage = () => {
  return (
    <div>
      {/* Header */}
      <header className="bg-primary text-white text-center py-5">
        <h1>Welcome to GreenEn</h1>
        <p>Your go-to solution for eco-friendly practices.</p>
        <a href="#services" className="btn btn-light">Learn More</a>
      </header>

      {/* Hero Section */}
      <div className="container text-center my-5">
        <h2>Our Mission</h2>
        <p>We aim to promote sustainable practices that benefit both the environment and society.</p>
      </div>

      {/* Services Section */}
      <div id="services" className="container my-5">
        <h2 className="text-center mb-4">Our Services</h2>
        <div className="row">
          <div className="col-md-4">
            <div className="card mb-4">
              <div className="card-body">
                <h5 className="card-title">Consulting</h5>
                <p className="card-text">Expert advice on sustainable practices for your business.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card mb-4">
              <div className="card-body">
                <h5 className="card-title">Workshops</h5>
                <p className="card-text">Interactive workshops to educate your team on eco-friendly practices.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card mb-4">
              <div className="card-body">
                <h5 className="card-title">Products</h5>
                <p className="card-text">A range of eco-friendly products to help you go green.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default HomePage;
