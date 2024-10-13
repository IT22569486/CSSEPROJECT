import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginButton from "../LoginButton";
import LogoutButton from "./LogoutButton";

const Profile = () => {
  const { user, isAuthenticated } = useAuth0();

  if (!isAuthenticated) {
    return (
      <div className="text-center">
        <h3 className="text-danger">Access Denied!</h3>
        <p>You need to be logged in to view this profile.</p>
        <LoginButton />
      </div>
    );
  }

  // Destructure user object to access its properties easily
  const { picture, name, email, ...userInfo } = user || {};

  return (
    <div className="container mt-5">
      <div className="card text-center shadow-lg border-0">
        <div className="card-body">
          {/* Profile Picture */}
          {picture && (
            <img
              src={picture}
              alt={name ? `${name}'s profile picture` : "Profile picture"}
              className="rounded-circle mb-3 border border-primary"
              style={{ width: '150px', height: '150px', borderRadius: '50%', boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)' }}
            />
          )}

          {/* User Name */}
          <h2 className="card-title text-primary">{name || "Unknown User"}</h2>
          <h5 className="text-muted">{email || "No Email Provided"}</h5>

          {/* User Info */}
          <ul className="list-group list-group-flush mt-4">
            {Object.keys(userInfo).map((objkey, i) => (
              <li key={`${objkey}-${i}`} className="list-group-item d-flex justify-content-between">
                <strong>{objkey.charAt(0).toUpperCase() + objkey.slice(1)}:</strong>
                <span>{userInfo[objkey]}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Buttons for login/logout */}
      <div className="text-center mt-4">
        {!isAuthenticated ? (
          <LoginButton className="btn btn-success btn-lg me-2" />
        ) : (
          <LogoutButton className="btn btn-danger btn-lg" />
        )}
      </div>
    </div>
  );
};

export default Profile;
