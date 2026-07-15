import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "../axios.jsx";

const AddProduct = () => {
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: "", brand: "", price: "", category: "", description: ""
  });
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    
    formData.append("product", new Blob([JSON.stringify(product)], { type: "application/json" }));
    if (imageFile) {
      formData.append("imageFile", imageFile);
    }

    try {
      await axios.post("/product", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      alert("Product published successfully into standard operational inventory!");
      navigate("/");
    } catch (err) {
      console.error("Failure processing transaction payload:", err);
      alert("Error processing resource registration request.");
    }
  };

  return (
    <div className="form-page-container">
      <div style={{ marginBottom: "1.5rem" }}>
        <Link to="/" style={{ color: "var(--brand-teal)", textDecoration: "none", fontWeight: 600 }}>
          ← Back to Catalog Dashboard
        </Link>
      </div>

      <div className="modern-form-card">
        <h2 className="form-title-main">Add New Product</h2>
        <p style={{ color: "var(--text-muted)", marginBottom: "2rem", fontSize: "0.95rem" }}>
          Publish new catalog parameters into database indexes. All fields required.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="modern-form-group">
            <label>Product Title / Name</label>
            <input type="text" name="name" className="modern-form-control" placeholder="e.g., AirPods Max" value={product.name} onChange={handleInputChange} required />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
            <div className="modern-form-group">
              <label>Brand Manufacturer</label>
              <input type="text" name="brand" className="modern-form-control" placeholder="e.g., Apple" value={product.brand} onChange={handleInputChange} required />
            </div>
            <div className="modern-form-group">
              <label>Retail Price (₹)</label>
              <input type="number" name="price" className="modern-form-control" placeholder="e.g., 59999" value={product.price} onChange={handleInputChange} required />
            </div>
          </div>

          <div className="modern-form-group">
            <label>System Categorization Index</label>
            <select name="category" className="modern-form-control" value={product.category} onChange={handleInputChange} required>
              <option value="">Select Category Profile...</option>
              <option value="headphone">Headphones</option>
              <option value="laptop">Laptops</option>
              <option value="mobile">Mobiles</option>
              <option value="electronics">Electronics</option>
              <option value="toys">Toys</option>
            </select>
          </div>

          <div className="modern-form-group">
            <label>Public Detail Specification Overview</label>
            <textarea name="description" className="modern-form-control" rows="4" placeholder="Describe key highlights and technical specs..." value={product.description} onChange={handleInputChange} required></textarea>
          </div>

          <div className="modern-form-group">
            <label>Display Image Attachment File</label>
            <div style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
              <input type="file" accept="image/*" className="modern-form-control" style={{ flex: 1 }} onChange={handleFileChange} required />
              <div className="image-preview-slot">
                {previewUrl ? <img src={previewUrl} alt="Preview" /> : <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>No File</span>}
              </div>
            </div>
          </div>

          <button type="submit" className="btn-pill-teal" style={{ width: "100%", padding: "0.85rem", marginTop: "1.5rem", fontSize: "1rem" }}>
            Create Product Entry Listing
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;