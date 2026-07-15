import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "./axios";
import heroImg from "../assets/homepageimage.jpg"; 

const CATEGORY_CARDS = [
  { id: "headphone", name: "Headphones", count: "32 Products", bg: "#e6faef", icon: "🎧" },
  { id: "laptop", name: "Laptops", count: "28 Products", bg: "#ffede0", icon: "💻" },
  { id: "mobile", name: "Mobiles", count: "24 Products", bg: "#f0e6ff", icon: "📱" },
  { id: "electronics", name: "Electronics", count: "18 Products", bg: "#fff7db", icon: "🔌" },
  { id: "toys", name: "Toys", count: "16 Products", bg: "#e3f0ff", icon: "🤖" },
];

const Home = ({ data, addToCart, currentView, setCurrentView, selectedCategory, setSelectedCategory }) => {
  const [productsWithImages, setProductsWithImages] = useState([]);

  useEffect(() => {
    if (!data || !Array.isArray(data)) return;

    const fetchImages = async () => {
      const updatedProducts = await Promise.all(
        data.map(async (product) => {
          try {
            const response = await axios.get(
              `/product/${product.id}/image`,
              { responseType: "blob" }
            );
            return { ...product, imageUrl: URL.createObjectURL(response.data) };
          } catch {
            return { ...product, imageUrl: "https://via.placeholder.com/200?text=No+Image" };
          }
        })
      );
      setProductsWithImages(updatedProducts);
    };

    fetchImages();
  }, [data]);

  const filteredProducts = !selectedCategory || selectedCategory === "all"
    ? productsWithImages
    : productsWithImages.filter(
        (item) => item.category?.trim().toLowerCase() === selectedCategory.trim().toLowerCase()
      );

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
    setCurrentView("shop");
  };

  return (
    <div style={{ paddingBottom: "4rem" }}>
      
      {/* 1. LANDING DASHBOARD VIEW */}
      {currentView === "home" && (
        <>
          {/* HERO BANNER */}
          <div className="hero-container" style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", alignItems: "center" }}>
            <div className="hero-text-content" style={{ paddingRight: "1rem" }}>
              <span className="hero-badge">✦ Top Quality • Great Prices</span>
              <h1 className="hero-title">Tech that fits <br/><span>your world.</span></h1>
              <p style={{ color: "var(--text-muted)", fontSize: "1.1rem", marginBottom: "2rem" }}>
                Discover trusted tech across headphones, laptops, mobiles and more.
              </p>
              <div style={{ display: "flex", gap: "1rem" }}>
                <button className="btn-pill-teal" onClick={() => handleCategoryClick("all")}>
                  Shop All Products →
                </button>
              </div>
            </div>
            
            {/* Embedded Your Exact Hero Image Asset Here */}
            <div className="hero-image-wrapper" style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
              <img 
                src={heroImg} 
                alt="Premium Tech Devices Showcase" 
                style={{ 
                  width: "100%", 
                  height: "100%", 
                  objectFit: "cover", 
                  objectPosition: "center left"
                }} 
              />
            </div>
          </div>

          {/* BROWSE BY CATEGORY */}
          <div style={{ padding: "0 3rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
              <h3 style={{ fontWeight: 700 }}>Browse by Category</h3>
              <span style={{ color: "var(--brand-teal)", cursor: "pointer", fontWeight: 600 }} onClick={() => handleCategoryClick("all")}>
                View all categories →
              </span>
            </div>
            
            <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "1.5rem" }}>
              {CATEGORY_CARDS.map((cat) => (
                <div 
                  key={cat.id} 
                  className="category-card" 
                  style={{ backgroundColor: cat.bg }}
                  onClick={() => handleCategoryClick(cat.id)}
                >
                  <div className="category-img-box">{cat.icon}</div>
                  <h5 style={{ fontWeight: 700, margin: 0 }}>{cat.name}</h5>
                  <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", margin: "5px 0 0 0" }}>
                    {cat.count}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* VALUES BANNER */}
          <div className="features-banner">
            <div className="feature-item"><div className="feature-icon"><i className="bi bi-shield-check"></i></div><div><strong>Quality Products</strong><span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>100% original</span></div></div>
            <div className="feature-item"><div className="feature-icon"><i className="bi bi-truck"></i></div><div><strong>Fast Delivery</strong><span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Quick dispatch</span></div></div>
            <div className="feature-item"><div className="feature-icon"><i className="bi bi-lock"></i></div><div><strong>Secure Payments</strong><span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Safe transactions</span></div></div>
          </div>
        </>
      )}

      {/* 2. CATALOG SPECIFIC SHOP LAYOUT */}
      {currentView === "shop" && (
        <div style={{ padding: "2rem 3rem" }}>
          
          {/* Horizontal Filtering Bar */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "2.5rem", flexWrap: "wrap", borderBottom: "1px solid var(--border-light)", paddingBottom: "1.5rem" }}>
            <button 
              onClick={() => setSelectedCategory("all")}
              style={{
                padding: "0.5rem 1.2rem", borderRadius: "50px", border: "1px solid #cbd5e1", fontWeight: 600, cursor: "pointer",
                backgroundColor: selectedCategory === "all" ? "var(--brand-teal)" : "white",
                color: selectedCategory === "all" ? "white" : "var(--text-main)"
              }}
            >
              All Products
            </button>
            
            {CATEGORY_CARDS.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                style={{
                  padding: "0.5rem 1.2rem", borderRadius: "50px", border: "1px solid #cbd5e1", fontWeight: 600, cursor: "pointer",
                  backgroundColor: selectedCategory === cat.id ? "var(--brand-teal)" : "white",
                  color: selectedCategory === cat.id ? "white" : "var(--text-main)"
                }}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Product Results Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "1.5rem" }}>
            {filteredProducts.length === 0 ? (
              <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: "4rem 0" }}>
                <h4 style={{ color: "var(--text-muted)" }}>No items found matches this catalog section.</h4>
              </div>
            ) : (
              filteredProducts.map((product) => (
                <div key={product.id} style={{ 
                  background: "white", padding: "1.5rem", borderRadius: "16px", 
                  boxShadow: "0 4px 15px rgba(0,0,0,0.03)", display: "flex", flexDirection: "column" 
                }}>
                  <Link to={`/product/${product.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                    <div style={{ height: "180px", marginBottom: "1rem", display: "flex", justifyContent: "center" }}>
                      <img src={product.imageUrl} alt={product.name} style={{ maxHeight: "100%", maxWidth: "100%", objectFit: "contain" }} />
                    </div>
                    <h5 style={{ fontWeight: 700, fontSize: "1.1rem" }}>{product.name}</h5>
                    <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", margin: "0.2rem 0" }}>by {product.brand}</p>
                    <div style={{ fontWeight: 800, color: "var(--brand-teal)", margin: "0.5rem 0 1rem 0", fontSize: "1.2rem" }}>
                      ₹{product.price}
                    </div>
                  </Link>
                  <button className="btn-pill-teal" style={{ width: "100%", marginTop: "auto" }} onClick={() => addToCart(product)}>
                    Add to Cart
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      )}

    </div>
  );
};

export default Home;