// src/components/UpdateUser.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const UpdateUser = () => {
  const { id } = useParams(); // Get user ID from URL parameters
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); // Password can be updated if needed
  const [address, setAddress] = useState('');
  const [accountType, setAccountType] = useState('');
  const [wasteProduced, setWasteProduced] = useState(0);
  const [error, setError] = useState('');

  // Fetch user details when the component mounts
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:8070/User/${id}`); // Ensure the correct URL
        const user = response.data;
        setName(user.name);
        setEmail(user.email);
        setAddress(user.address);
        setAccountType(user.accountType);
        setWasteProduced(user.wasteProduced);
      } catch (error) {
        console.error('Error fetching user:', error);
        setError('Failed to fetch user details');
      }
    };

    fetchUser();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Payload for updating the user
    const updatedUser = {
      name,
      email,
      password, // Include password if updated, else leave it blank
      address,
      accountType,
      wasteProduced,
    };

    try {
      await axios.put(`http://localhost:8070/User/edit/${id}`, updatedUser); // Ensure correct URL
      alert('User updated successfully!');
      navigate('/Users'); // Navigate back to the users list
    } catch (error) {
      console.error('Error updating user:', error);
      setError('Failed to update user');
    }
  };

  if (error) {
    return <p className="text-danger">{error}</p>; // Use Bootstrap styling for error message
  }

  return (
    <div className="container mt-4">
      <h2 className="text-center">Update User</h2>
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
              value={password} // Optional: allow password to be updated
              onChange={(e) => setPassword(e.target.value)}
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
        <button type="submit" className="btn btn-primary">Update User</button>
      </form>
    </div>
  );
};

export default UpdateUser;
