// src/components/Users.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { Table, Button, Alert, Spinner, Badge } from 'react-bootstrap';
import { useAuth0 } from "@auth0/auth0-react";
import { FaEdit, FaTrash } from "react-icons/fa";

const Users = () => {
  const [users, setUsers] = useState([]); // State to store user data
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(""); // Track any errors
  const { isAuthenticated } = useAuth0(); // Get authentication status

  // Fetch users from API on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:8070/User");
        setUsers(response.data);
      } catch (error) {
        setError("Error fetching users");
      } finally {
        setLoading(false); // Stop loading spinner
      }
    };
    fetchUsers();
  }, []);

  // Delete a user and update state
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8070/User/delete/${id}`);
      setUsers(users.filter((user) => user._id !== id));
      alert("User deleted successfully!");
    } catch (error) {
      alert("Error deleting user");
    }
  };

  // Render access denied message if user is not authenticated
  if (!isAuthenticated) {
    return (
      <div className="text-center mt-5">
        <Alert variant="danger">
          <Alert.Heading>Access Denied!</Alert.Heading>
          <p>You need to be logged in to view this page.</p>
        </Alert>
      </div>
    );
  }

  // Render loading spinner if data is still loading
  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-3">Loading users...</p>
      </div>
    );
  }

  // Render error message if there was an issue fetching data
  if (error) {
    return (
      <div className="text-center mt-5">
        <Alert variant="danger">{error}</Alert>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Users List</h1>

      <div className="d-flex justify-content-end mb-3">
        <Link to="/adduser">
          <Button variant="primary">Add New User</Button>
        </Link>
      </div>

      <div className="table-responsive">
        <Table striped bordered hover className="table-align-middle">
          <thead className="table-light">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Address</th>
              <th>Account Type</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.address}</td>
                <td>{user.accountType}</td>
                <td className="d-flex">
                  <Link to={`/edituser/${user._id}`}>
                    <Button variant="warning" className="me-2"><FaEdit /></Button>
                  </Link>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(user._id)}
                    className="d-flex align-items-center"
                  >
                    <FaTrash />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default Users;
