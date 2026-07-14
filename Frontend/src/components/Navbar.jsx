import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Navbar = ({ currentUser, setCurrentUser, setCurrentView, setSelectedCategory, cartCount }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("authenticatedUser");
    setCurrentUser(null);
    navigate("/login");
  };

  const navigateToHome = () => {
    setCurrentView("home");
    setSelectedCategory("all");
    navigate("/");
  };

  const navigateToShop = () => {
    setCurrentView("shop");
    setSelectedCategory("all");
    navigate("/");
  };

  return (
    <header>
      <nav className="modern-navbar">
        {/* Brand/Logo */}
        <div className="brand-text" onClick={navigateToHome} style={{ cursor: "pointer" }}>
          Compras
        </div>
        
        {/* Navigation Links */}
       <div className="nav-center-links">
  <span 
    onClick={navigateToHome} 
    className={location.pathname === "/" && location.state?.view !== "shop" ? "active-link" : ""}
    style={{ cursor: "pointer", color: "var(--text-main)", fontWeight: 600 }}
  >
    Home
  </span>
  <span 
    onClick={navigateToShop} 
    style={{ cursor: "pointer", color: "var(--text-main)", fontWeight: 600 }}
  >
    Shop
  </span>

  {/* Conditional Admin Tab */}
  {currentUser?.userRole === "ADMIN" && (
    <Link 
      to="/add_product" 
      style={{ textDecoration: "none", color: "var(--text-main)", fontWeight: 600 }}
    >
      Add Product
    </Link>
  )}

  {/* NEW: Router Navigation Links */}
  <Link 
    to="/about" 
    style={{ textDecoration: "none", color: "var(--text-main)", fontWeight: 600 }}
  >
    About Us
  </Link>
  <Link 
    to="/contact" 
    style={{ textDecoration: "none", color: "var(--text-main)", fontWeight: 600 }}
  >
    Contact
  </Link>
</div>

        {/* Pill Search Input */}
        <div className="pill-search">
          <i className="bi bi-search" style={{ color: "var(--text-muted)" }}></i>
          <input
            type="text"
            placeholder="Search for products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Action Buttons */}
        <div className="nav-actions">
          {currentUser ? (
            <>
              <button className="btn-pill-teal">
                {currentUser.userRole === "ADMIN" ? "Admin View" : "Customer View"}
              </button>
              
              <button className="btn-pill-outline" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <Link to="/login">
              <button className="btn-pill-teal">Sign In</button>
            </Link>
          )}

          {/* Cart Icon Badge */}
          <Link to="/cart" style={{ color: "var(--text-main)", fontSize: "1.2rem", position: "relative" }}>
            <i className="bi bi-bag"></i>
            {cartCount > 0 && (
              <span style={{
                position: "absolute", top: "-5px", right: "-10px", 
                background: "var(--brand-teal)", color: "white", 
                borderRadius: "50%", fontSize: "0.65rem", padding: "2px 6px",
                fontWeight: "bold"
              }}>
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;