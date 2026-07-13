import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ onSelectCategory, currentUser, setCurrentUser, data }) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchPanel, setShowSearchPanel] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => localStorage.getItem("theme") === "dark");

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark-theme");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark-theme");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  // Normalize categories to lowercase to properly remove case-sensitive duplicates
  const categories = data && Array.isArray(data) 
    ? [...new Set(data.map((item) => item.category?.trim().toLowerCase()).filter(Boolean))] 
    : [];

  const searchResults = searchQuery && data
    ? data.filter((item) => item.name?.toLowerCase().includes(searchQuery.toLowerCase()))
    : [];

  const handleLogout = () => {
    localStorage.removeItem("authenticatedUser");
    setCurrentUser(null);
    navigate("/login");
  };

  return (
    <header className="custom-app-header-wrapper">
      <nav className="custom-premium-navbar">
        <div className="nav-left-brand-block">
          <Link to="/" className="brand-logo" style={{ textDecoration: "none", color: "inherit", fontWeight: 800 }}>
            Compras
          </Link>
          
          {currentUser && (
            <div className="nav-static-links">
              <Link to="/" className="nav-link-item" style={{ textDecoration: "none" }}>Home</Link>
              {currentUser.userRole === "ADMIN" && (
                <Link to="/add_product" className="nav-link-item" style={{ textDecoration: "none" }}>Add Product</Link>
              )}
            </div>
          )}
        </div>

        <div className="nav-right-utility-block">
          <div className="search-input-wrapper-box">
            <i className="bi bi-search native-search-icon"></i>
            <input
              type="text"
              className="form-control custom-search-input"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowSearchPanel(e.target.value.length > 0);
              }}
              onFocus={() => searchQuery.length > 0 && setShowSearchPanel(true)}
              onBlur={() => setTimeout(() => setShowSearchPanel(false), 200)}
            />

            {showSearchPanel && searchResults.length > 0 && (
              <div className="search-floating-panel">
                <ul className="search-results-list">
                  {searchResults.map((product) => (
                    <li key={product.id}>
                      <Link to={`/product/${product.id}`} style={{ textDecoration: "none", color: "inherit", display: "block" }}>
                        {product.name} <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>in {product.category}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="pill-theme-switcher" onClick={() => setIsDarkMode(!isDarkMode)}>
            <div className={`theme-indicator-slider ${isDarkMode ? "slide-right" : ""}`}></div>
            <i className="bi bi-sun-fill theme-pill-icon light-icon"></i>
            <i className="bi bi-moon-stars-fill theme-pill-icon dark-icon"></i>
          </div>

          {currentUser ? (
            <>
              <span className="badge-purple-tag" style={{ fontSize: "0.8rem" }}>
                Hi, {currentUser.firstName || "User"} ({currentUser.userRole})
              </span>
              <span className="nav-link-item" onClick={handleLogout} style={{ cursor: "pointer" }}>
                <i className="bi bi-box-arrow-right"></i> Logout
              </span>
              <Link to="/cart" className="compact-cart-badge"><i className="bi bi-bag-heart-fill"></i></Link>
            </>
          ) : (
            <Link to="/login" className="nav-link-item" style={{ textDecoration: "none" }}>Sign In</Link>
          )}
        </div>
      </nav>

      <div className="subheader-filter-zone" style={{ padding: "0.5rem 1.5rem", background: "var(--nav-bg)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="category-pills-row" style={{ display: "flex", gap: "0.5rem", overflowX: "auto" }}>
          <button className="pill-item-button" onClick={() => onSelectCategory("")}>
            All Products
          </button>
          {categories.map((cat, idx) => (
            <button key={idx} className="pill-item-button" onClick={() => onSelectCategory(cat)}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Navbar;