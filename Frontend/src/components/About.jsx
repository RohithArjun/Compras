import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="form-page-container" style={{ maxWidth: "1000px", margin: "3rem auto" }}>
      {/* Back Button */}
      <div style={{ marginBottom: "2rem" }}>
        <Link to="/" style={{ color: "var(--brand-teal)", textDecoration: "none", fontWeight: 600 }}>
          ← Back to Catalog
        </Link>
      </div>

      {/* Hero Section */}
      <div style={{ textAlign: "center", marginBottom: "4rem" }}>
        <span className="details-category-badge" style={{ alignSelf: "center", display: "inline-block" }}>Our Story</span>
        <h1 style={{ fontSize: "3rem", fontWeight: 800, color: "#0f172a", marginTop: "1rem" }}>
          We curate tech that fits <br /><span style={{ color: "var(--brand-teal)" }}>your lifestyle.</span>
        </h1>
        <p style={{ color: "var(--text-muted)", fontSize: "1.1rem", maxWidth: "600px", margin: "1.5rem auto 0 auto", lineHeight: "1.6" }}>
          At Compras, we believe that high-quality technology shouldn't just be functional—it should seamlessly integrate, elevate, and inspire your day-to-day moments.
        </p>
      </div>

      {/* Grid: Mission and Vision */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2.5rem", marginBottom: "4rem" }}>
        <div style={{ background: "#f8fafc", padding: "2.5rem", borderRadius: "24px", border: "1px solid var(--border-light)" }}>
          <h3 style={{ fontWeight: 800, color: "#0f172a", marginBottom: "1rem" }}>Our Mission</h3>
          <p style={{ color: "var(--text-muted)", lineHeight: "1.7", margin: 0 }}>
            To supply professionals, creators, and daily tech enthusiasts with carefully vetted, authentic electronics. We strip away the complexity of shopping online by offering only top-tier gadgets that we stand behind completely.
          </p>
        </div>
        <div style={{ background: "#e6faef", padding: "2.5rem", borderRadius: "24px", border: "1px solid #d1f5e3" }}>
          <h3 style={{ fontWeight: 800, color: "var(--brand-teal)", marginBottom: "1rem" }}>Our Standard</h3>
          <p style={{ color: "var(--brand-teal-hover)", lineHeight: "1.7", margin: 0 }}>
            Every product in our inventory undergoes rigorous quality-assurance testing before it hits our digital shelves. When you shop with us, you are guaranteed authentic craftsmanship, valid factory warranties, and outstanding customer support.
          </p>
        </div>
      </div>

      {/* Why Choose Us Icons */}
      <h3 style={{ fontWeight: 800, textAlign: "center", marginBottom: "2.5rem", color: "#0f172a" }}>What We Promise</h3>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "2rem", marginBottom: "2rem" }}>
        <div style={{ textAlign: "center", padding: "1.5rem" }}>
          <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>⚡</div>
          <h5 style={{ fontWeight: 700 }}>Blazing Fast Shipping</h5>
          <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>Direct-to-door delivery designed to match your busy schedule.</p>
        </div>
        <div style={{ textAlign: "center", padding: "1.5rem" }}>
          <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>🛡️</div>
          <h5 style={{ fontWeight: 700 }}>Safe & Encrypted</h5>
          <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>Secure, private transactions to shield your shopping identity.</p>
        </div>
        <div style={{ textAlign: "center", padding: "1.5rem" }}>
          <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>🤝</div>
          <h5 style={{ fontWeight: 700 }}>24/7 Expert Support</h5>
          <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>A dedicated team of technical support agents ready to help you.</p>
        </div>
      </div>
    </div>
  );
};

export default About;