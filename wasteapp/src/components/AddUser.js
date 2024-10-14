// src/components/AddUser.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const AddUser = () => {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); // Added password field
  const [address, setAddress] = useState('');
  const [accountType, setAccountType] = useState(''); // e.g., Resident, Business
  const [wasteProduced, setWasteProduced] = useState(0); // Added wasteProduced field
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Payload for adding a new user
    const newUser = {
      name,
      email,
      password, // Include password in the payload
      address,
      accountType,
      wasteProduced, // Include wasteProduced in the payload
    };

    try {
      await axios.post('http://localhost:8070/User/add', newUser); // Ensure correct URL
      alert('User added successfully!');
      navigate('/Users'); // Navigate back to the users list
    } catch (error) {
      console.error('Error adding user:', error);
      setError('Failed to add user');
    }
  };

  if (error) {
    return <p className="text-danger">{error}</p>; // Use Bootstrap styling for error message
  }

  return (
    <div className="container mt-4">
      <h2 className="text-center">Add User</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">
            Name:
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
        </div>
        <div className="mb-3">
          <label className="form-label">
            Email:
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
        </div>
        <div className="mb-3">
          <label className="form-label">
            Password:
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
        </div>
        <div className="mb-3">
          <label className="form-label">
            Address:
            <input
              type="text"
              className="form-control"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </label>
        </div>
        <div className="mb-3">
          <label className="form-label">
            Account Type:
            <select
              className="form-select"
              value={accountType}
              onChange={(e) => setAccountType(e.target.value)}
              required
            >
              <option value="">Select Account Type</option>
              <option value="Resident">Resident</option>
              <option value="Business">Business</option>
            </select>
          </label>
        </div>
        <div className="mb-3">
          <label className="form-label">
            Waste Produced (kg):
            <input
              type="number"
              className="form-control"
              value={wasteProduced}
              onChange={(e) => setWasteProduced(Number(e.target.value))}
              required
            />
          </label>
        </div>
        <button type="submit" className="btn btn-primary">Add User</button>
      </form>
    </div>
  );
};

export default AddUser;
