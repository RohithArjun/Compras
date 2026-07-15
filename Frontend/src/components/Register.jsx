import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "../axios.jsx";

const Register = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    userRole: "USER" 
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    // Validate that the passwords match
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords do not match! Please check your entry.");
      return;
    }

    // Destructure confirmPassword out so it isn't sent in your backend DTO payload
    const { confirmPassword, ...payload } = formData;

    try {
      // Sends exactly: firstName, lastName, email, phoneNumber, password, userRole
      const response = await axios.post("/register", payload);
      alert(response.data || "User registered successfully!");
      navigate("/login");
    } catch (err) {
      console.error("Registration endpoint error:", err);
      setErrorMessage(
        err.response?.data?.message || "Critical failure registering credential parameters."
      );
    }
  };

  return (
    <div className="form-page-container" style={{ maxWidth: "600px", marginTop: "3rem" }}>
      <div className="modern-form-card">
        <h2 className="form-title-main" style={{ textAlign: "center" }}>Create Account</h2>
        <p style={{ color: "var(--text-muted)", marginBottom: "2rem", fontSize: "0.95rem", textAlign: "center" }}>
          Join the Compras storefront platform today.
        </p>

        {errorMessage && (
          <div className="alert alert-danger" style={{ fontSize: "0.85rem", padding: "0.75rem" }} role="alert">
            ⚠️ {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          
          {/* Row 1: First Name & Last Name */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
            <div className="modern-form-group">
              <label>First Name</label>
              <input
                type="text"
                name="firstName"
                className="modern-form-control"
                placeholder="e.g., Jane"
                value={formData.firstName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="modern-form-group">
              <label>Last Name</label>
              <input
                type="text"
                name="lastName"
                className="modern-form-control"
                placeholder="e.g., Doe"
                value={formData.lastName}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          {/* Row 2: Email Address & Phone Number */}
          <div style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: "1.5rem" }}>
            <div className="modern-form-group">
              <label>Email Address</label>
              <input
                type="email"
                name="email"
                className="modern-form-control"
                placeholder="name@example.com"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="modern-form-group">
              <label>Phone Number</label>
              <input
                type="tel"
                name="phoneNumber"
                className="modern-form-control"
                placeholder="e.g., 9876543210"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          {/* Row 3: Account Role (Full Width Grid Segment) */}
          <div className="modern-form-group">
            <label>User Role</label>
            <select
              name="userRole"
              className="modern-form-control"
              value={formData.userRole}
              onChange={handleInputChange}
              required
            >
              <option value="USER">USER</option>
              <option value="ADMIN">ADMIN</option>
            </select>
          </div>

          {/* Row 4: Password & Confirm Password */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
            <div className="modern-form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                className="modern-form-control"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="modern-form-group">
              <label>Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                className="modern-form-control"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="btn-pill-teal"
            style={{ width: "100%", padding: "0.85rem", marginTop: "1.5rem", fontSize: "1rem" }}
          >
            Register Profile Credentials
          </button>
        </form>

        <div style={{ textAlign: "center", marginTop: "2rem", fontSize: "0.9rem", color: "var(--text-muted)" }}>
          Already have an operational account?{" "}
          <Link to="/login" style={{ color: "var(--brand-teal)", fontWeight: 600, textDecoration: "none" }}>
            Sign In Here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;