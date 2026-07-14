import React, { useState } from "react";
import { Link } from "react-router-dom";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate API Submission
    console.log("Contact Message Submitted:", formData);
    setSubmitted(true);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="form-page-container" style={{ maxWidth: "1100px", margin: "3rem auto" }}>
      {/* Back Button */}
      <div style={{ marginBottom: "2rem" }}>
        <Link to="/" style={{ color: "var(--brand-teal)", textDecoration: "none", fontWeight: 600 }}>
          ← Back to Catalog
        </Link>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: "4rem", alignItems: "start" }}>
        
        {/* Left Column: Contact Channels */}
        <div>
          <span className="details-category-badge" style={{ marginBottom: "1rem" }}>Connect With Us</span>
          <h1 style={{ fontSize: "2.5rem", fontWeight: 800, color: "#0f172a", marginBottom: "1.5rem" }}>
            We'd love to hear <br />from you.
          </h1>
          <p style={{ color: "var(--text-muted)", lineHeight: "1.6", marginBottom: "3rem" }}>
            Got a question about a technical spec, an active shipment, or wholesale inquiries? Reach out and our team will get back to you within 2 hours.
          </p>

          {/* Individual Detail Cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            <div style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
              <div style={{ fontSize: "1.5rem", width: "50px", height: "50px", borderRadius: "50%", background: "#e6faef", color: "var(--brand-teal)", display: "flex", justifyContent: "center", alignItems: "center" }}>
                📞
              </div>
              <div>
                <strong style={{ display: "block", color: "#0f172a" }}>Phone Support</strong>
                <span style={{ color: "var(--text-muted)" }}>+1 (555) 302-9844</span>
              </div>
            </div>

            <div style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
              <div style={{ fontSize: "1.5rem", width: "50px", height: "50px", borderRadius: "50%", background: "#f0e6ff", color: "#8a5cf5", display: "flex", justifyContent: "center", alignItems: "center" }}>
                ✉️
              </div>
              <div>
                <strong style={{ display: "block", color: "#0f172a" }}>Email Address</strong>
                <span style={{ color: "var(--text-muted)" }}>support@compras.com</span>
              </div>
            </div>

            <div style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
              <div style={{ fontSize: "1.5rem", width: "50px", height: "50px", borderRadius: "50%", background: "#ffede0", color: "#f97316", display: "flex", justifyContent: "center", alignItems: "center" }}>
                📍
              </div>
              <div>
                <strong style={{ display: "block", color: "#0f172a" }}>HQ Office Address</strong>
                <span style={{ color: "var(--text-muted)" }}>100 Tech Oasis Blvd, Suite 200, San Jose, CA</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Form Card */}
        <div className="modern-form-card" style={{ padding: "3rem" }}>
          <h3 style={{ fontWeight: 800, color: "#0f172a", marginBottom: "0.5rem" }}>Send a Message</h3>
          <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", marginBottom: "2rem" }}>
            Fill out the details below and we will respond immediately.
          </p>

          {submitted && (
            <div className="alert alert-success mb-4" style={{ fontSize: "0.9rem", padding: "1rem" }} role="alert">
              🎉 Message sent! Our tech support specialists will contact you shortly.
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="modern-form-group">
              <label>Full Name</label>
              <input 
                type="text" 
                name="name" 
                className="modern-form-control" 
                placeholder="e.g., Jane Doe" 
                value={formData.name}
                onChange={handleInputChange} 
                required 
              />
            </div>

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
              <label>Message Detail</label>
              <textarea 
                name="message" 
                className="modern-form-control" 
                rows="5" 
                placeholder="How can we help you?" 
                value={formData.message}
                onChange={handleInputChange} 
                required 
              />
            </div>

            <button type="submit" className="btn-pill-teal" style={{ width: "100%", padding: "0.85rem", marginTop: "1rem" }}>
              Send Message
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default Contact;