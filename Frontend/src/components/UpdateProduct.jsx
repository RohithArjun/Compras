import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";

const UpdateProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [product, setProduct] = useState({
    name: "", brand: "", price: "", category: "", description: ""
  });
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Synchronous resolution map chain
    axios.get(`http://localhost:8080/api/product/${id}`)
      .then((res) => {
        setProduct(res.data);
        return axios.get(`http://localhost:8080/api/product/${id}/image`, { responseType: "blob" });
      })
      .then((imgRes) => {
        setPreviewUrl(URL.createObjectURL(imgRes.data));
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error generating staging update structures:", err);
        setLoading(false);
      });
  }, [id]);

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
      await axios.put(`http://localhost:8080/api/product/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      alert("Inventory database modifications synchronized successfully!");
      navigate(`/product/${id}`);
    } catch (err) {
      console.error("Critical operational mutation crash:", err);
      alert("Execution error occurred updating active row profile indices.");
    }
  };

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}>
        <div className="spinner-border text-success" role="status">
          <span className="visually-hidden">Loading active updates...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="form-page-container">
      <div style={{ marginBottom: "1.5rem" }}>
        <Link to={`/product/${id}`} style={{ color: "var(--brand-teal)", textDecoration: "none", fontWeight: 600 }}>
          ← Cancel and Return to Details View
        </Link>
      </div>

      <div className="modern-form-card">
        <h2 className="form-title-main">Modify Product Properties</h2>
        <p style={{ color: "var(--text-muted)", marginBottom: "2rem", fontSize: "0.95rem" }}>
          Edit structural attributes for resource target entry <strong>#{id}</strong>.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="modern-form-group">
            <label>Product Title / Name</label>
            <input type="text" name="name" className="modern-form-control" value={product.name} onChange={handleInputChange} required />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
            <div className="modern-form-group">
              <label>Brand Manufacturer</label>
              <input type="text" name="brand" className="modern-form-control" value={product.brand} onChange={handleInputChange} required />
            </div>
            <div className="modern-form-group">
              <label>Retail Price (₹)</label>
              <input type="number" name="price" className="modern-form-control" value={product.price} onChange={handleInputChange} required />
            </div>
          </div>

          <div className="modern-form-group">
            <label>System Categorization Index</label>
            <select name="category" className="modern-form-control" value={product.category} onChange={handleInputChange} required>
              <option value="headphone">Headphones</option>
              <option value="laptop">Laptops</option>
              <option value="mobile">Mobiles</option>
              <option value="electronics">Electronics</option>
              <option value="toys">Toys</option>
            </select>
          </div>

          <div className="modern-form-group">
            <label>Public Detail Specification Overview</label>
            <textarea name="description" className="modern-form-control" rows="4" value={product.description || ""} onChange={handleInputChange} required></textarea>
          </div>

          <div className="modern-form-group">
            <label>Update Display Image (Optional)</label>
            <div style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
              <input type="file" accept="image/*" className="modern-form-control" style={{ flex: 1 }} onChange={handleFileChange} />
              <div className="image-preview-slot">
                {previewUrl ? <img src={previewUrl} alt="Preview" /> : <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>No File</span>}
              </div>
            </div>
          </div>

          <button type="submit" className="btn-pill-teal" style={{ width: "100%", padding: "0.85rem", marginTop: "1.5rem", fontSize: "1rem" }}>
            Apply Changes & Sync Index
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProduct;