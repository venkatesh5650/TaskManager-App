import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signup } from "../../services/api";

import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css"; // custom CSS

export default function Signup() {
  const navigate = useNavigate();

  // Form state values
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Toggle password visibility
  const [showPassword, setShowPassword] = useState(false);

  // Display API errors
  const [error, setError] = useState("");

  // Handle signup form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await signup({ name, email, password });

      // Redirect user after successful signup
      navigate("/login");

      return res.json({ msg: "Signup successful" }); // Debug message (not required)
    } catch (err) {
      // Show specific backend error or fallback message
      setError(err.response?.data?.msg || "Signup failed");
    }
  };

  return (
    <div className="signup-container d-flex justify-content-center align-items-center">
      <form onSubmit={handleSubmit} className="signup-form p-4 rounded shadow">
        <h2 className="text-center mb-4">Create Account</h2>

        {/* Render error message */}
        {error && <p className="text-danger text-center">{error}</p>}

        <div className="mb-3">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control"
            required
          />
        </div>

        <div className="mb-2">
          <input
            type={showPassword ? "text" : "password"} // Toggle visibility
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-control"
            required
          />
        </div>

        {/* Show Password Checkbox */}
        <div className="form-check mb-4">
          <input
            type="checkbox"
            className="form-check-input"
            id="showPassCheck"
            checked={showPassword}
            onChange={() => setShowPassword(!showPassword)}
          />
          <label className="form-check-label" htmlFor="showPassCheck">
            Show Password
          </label>
        </div>

        <button type="submit" className="btn btn-primary w-100 mb-3">
          Signup
        </button>

        {/* Redirect to login page */}
        <p className="text-center">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}
