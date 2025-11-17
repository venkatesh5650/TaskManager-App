import { useEffect, useState } from "react";
import { getProfile } from "../../services/api";

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'; // custom styles

export default function Profile() {
  const [user, setUser] = useState({});

  // Fetch logged-in user's profile on page load
  useEffect(() => {
    const fetchProfile = async () => {
      const res = await getProfile();
      setUser(res.data); // Store user details
    };
    fetchProfile();
  }, []);

  return (
    <div className="profile-container d-flex justify-content-center align-items-center">
      <div className="profile-card p-4 rounded shadow text-center">
        <h1 className="mb-4">Your Profile</h1>

        {/* Display user name */}
        <div className="profile-field mb-3">
          <p className="field-label">Name</p>
          <p className="field-value">{user.name || "Loading..."}</p>
        </div>

        {/* Display user email */}
        <div className="profile-field">
          <p className="field-label">Email</p>
          <p className="field-value">{user.email || "Loading..."}</p>
        </div>
      </div>
    </div>
  );
}
