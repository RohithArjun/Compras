import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";

const ProductDetail = ({ addToCart, userRole }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [product, setProduct] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    // 1. Fetch text metadata specifications
    axios.get(`http://localhost:8080/api/product/${id}`)
      .then((res) => {
        setProduct(res.data);
        // 2. Fetch the corresponding raw image data blob directly from backend storage
        return axios.get(`http://localhost:8080/api/product/${id}/image`, { responseType: "blob" });
      })
      .then((imageResponse) => {
        setImageUrl(URL.createObjectURL(imageResponse.data));
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading complete product dataset profile:", err);
        setImageUrl("https://via.placeholder.com/400?text=No+Image+Available");
        setLoading(false);
      });
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm("Are you completely sure you want to permanently delete this item inventory data record?")) {
      try {
        await axios.delete(`http://localhost:8080/api/product/${id}`);
        alert("Product record has been successfully purged from database storage.");
        navigate("/");
      } catch (err) {
        console.error("Failed to safely complete administrative deletion cycle:", err);
        alert("Critical failure occurred while executing resource drop instructions.");
      }
    }
  };

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}>
        <div className="spinner-border text-success" role="status">
          <span className="visually-hidden">Loading product specifications...</span>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div style={{ textAlign: "center", padding: "4rem" }}>
        <h3>Requested inventory listing data record could not be found.</h3>
        <Link to="/"><button className="btn-pill-outline mt-3">Return to Main Catalog</button></Link>
      </div>
    );
  }

  return (
    <div>
      {/* Breadcrumb Navigation Bar */}
      <div style={{ padding: "1.5rem 3rem 0 3rem" }}>
        <span style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
          <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>Catalog</Link> /{" "}
          <span style={{ textTransform: "capitalize" }}>{product.category}</span> / {product.name}
        </span>
      </div>

      <div className="details-container">
        {/* Left Column - Image Showcase */}
        <div className="details-image-box">
          <img src={imageUrl} alt={product.name} />
        </div>

        {/* Right Column - Technical Specification Sheets & Management Panels */}
        <div className="details-info-panel">
          <span className="details-category-badge">{product.category}</span>
          <h1 className="details-title">{product.name}</h1>
          <div className="details-brand">Brand Asset: <strong>{product.brand}</strong></div>
          
          <div className="details-price">₹{product.price.toLocaleString("en-IN")}</div>
          
          <div className="details-divider"></div>
          
          <h5 style={{ fontWeight: 700, marginBottom: "0.5rem" }}>Product Overview Description</h5>
          <p className="details-description">
            {product.description || "No supplemental details specification profile provided by supplier for this catalog item listing entry."}
          </p>

          {/* Standard Commerce Operational Options */}
          <button 
            className="btn-pill-teal" 
            style={{ padding: "1rem 2rem", fontSize: "1.05rem", width: "100%", maxWidth: "350px" }}
            onClick={() => addToCart(product)}
          >
            <i className="bi bi-bag-plus me-2"></i> Add to Shopping Cart
          </button>

          {/* Administrative Control Portal - Rendered conditionally for authorized accounts */}
          {userRole === "ADMIN" && (
            <div className="admin-actions-section">
              <h6 style={{ fontWeight: 700, color: "#475569", marginBottom: "1rem" }}>
                <i className="bi bi-sliders me-2"></i> Administrative Control Center Panel
              </h6>
              <div style={{ display: "flex", gap: "1rem" }}>
                <button 
                  className="btn-pill-outline"
                  onClick={() => navigate(`/product/update/${product.id}`)}
                >
                  <i className="bi bi-pencil-square me-1"></i> Modify Properties
                </button>
                <button 
                  className="btn-pill-danger"
                  onClick={handleDelete}
                >
                  <i className="bi bi-trash3 me-1"></i> Delete Product Listing
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;