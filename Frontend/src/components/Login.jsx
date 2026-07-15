import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import JSEncrypt from "jsencrypt";
import axios from "../axios.jsx";

const Login = ({ setCurrentUser }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [rawpassword, setPassword] = useState("");
  const [publicKey, setPublicKey] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch Public Key on component mount
  useEffect(() => {
    axios.get("/public-key")
      .then((res) => setPublicKey(res.data))
      .catch((err) => {
        console.error("Error fetching public key", err);
        setErrorMessage("Backend system offline or unreachable.");
      });
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!publicKey) {
      setErrorMessage("Encryption key not ready. Please try again.");
      return;
    }

    // Encrypt password using Public Key
    const encryptor = new JSEncrypt();
    encryptor.setPublicKey(publicKey);
    const password = encryptor.encrypt(rawpassword);

    if (!password) {
      setErrorMessage("rawpassword encryption failed.");
      return;
    }

    setLoading(true);
    try {
      // Send encrypted payload
      const response = await axios.post("/login", {
        email,
        password,
      });
      
      setCurrentUser(response.data);
      localStorage.setItem("authenticatedUser", JSON.stringify(response.data));
      navigate("/");
    } catch (error) {
      setErrorMessage("Invalid credentials or backend system offline.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-main-layout-container" style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "80vh" }}>
      <div className="auth-card-container" style={{ width: "100%", maxWidth: "440px", padding: "2.5rem" }}>
        <h2 className="text-center mb-2" style={{ fontWeight: 800 }}>Account Sign In</h2>
        <p className="text-center mb-4" style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>
          Access your premium checkout system dashboard
        </p>

        {errorMessage && (
          <div className="alert alert-danger mb-3" role="alert" style={{ fontSize: "0.85rem", padding: "0.75rem" }}>
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label" style={{ fontSize: "0.85rem", fontWeight: 600 }}>Email Address</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              required
            />
          </div>

          <div className="mb-4">
            <label className="form-label" style={{ fontSize: "0.85rem", fontWeight: 600 }}>Password</label>
            <input
              type="password"
              className="form-control"
              value={rawpassword}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          <button type="submit" className="btn-card-action w-100 py-2" disabled={loading}>
            {loading ? "Authenticating..." : "Authenticate Identity"}
          </button>
        </form>

        <div className="text-center mt-3" style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
          Don't have an account? <Link to="/register" style={{ color: "var(--accent-cyan)", textDecoration: "none" }}>Create Account</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;