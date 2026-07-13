import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Home = ({ data, addToCart, selectedCategory }) => {
  const [productsWithImages, setProductsWithImages] = useState([]);
  const [loadingImages, setLoadingImages] = useState(true);

  useEffect(() => {
    if (!data || !Array.isArray(data)) {
      setLoadingImages(false);
      return;
    }

    const fetchImages = async () => {
      setLoadingImages(true);
      const updatedProducts = await Promise.all(
        data.map(async (product) => {
          try {
            const response = await axios.get(
              `http://localhost:8080/api/product/${product.id}/image`,
              { responseType: "blob" }
            );
            const imageUrl = URL.createObjectURL(response.data);
            return { ...product, imageUrl };
          } catch (error) {
            return { ...product, imageUrl: "https://via.placeholder.com/300x200?text=No+Image" };
          }
        })
      );
      setProductsWithImages(updatedProducts);
      setLoadingImages(false);
    };

    fetchImages();
  }, [data]);

  const filteredProducts = selectedCategory
    ? productsWithImages.filter(
        (item) => item.category?.trim().toLowerCase() === selectedCategory.trim().toLowerCase()
      )
    : productsWithImages;

  return (
    <div style={{ padding: "2rem", paddingTop: "160px", width: "100%", boxSizing: "border-box" }}>
      {selectedCategory && (
        <div style={{ marginBottom: "1.5rem", fontSize: "0.9rem", color: "var(--text-muted)" }}>
          Active Filter: <strong style={{ color: "var(--accent-cyan)" }}>{selectedCategory.toUpperCase()}</strong>
        </div>
      )}

      {loadingImages && productsWithImages.length === 0 ? (
        <div style={{ textAlign: "center", padding: "4rem 0" }}>
          <h4 style={{ color: "var(--text-muted)" }}>Loading store catalog...</h4>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div style={{ textAlign: "center", padding: "4rem 0" }}>
          <h4 style={{ color: "var(--text-muted)" }}>No products found in this category.</h4>
        </div>
      ) : (
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", 
          gap: "1.5rem",
          width: "100%"
        }}>
          {filteredProducts.map((product) => (
            <div key={product.id} className="premium-product-card" style={{ padding: "1rem", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <Link to={`/product/${product.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                <div style={{ height: "180px", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <img src={product.imageUrl} alt={product.name} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                </div>
                <h5 style={{ fontWeight: 700, fontSize: "1.05rem", marginTop: "0.75rem" }}>{product.name}</h5>
                <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", margin: "0.2rem 0" }}>by {product.brand}</p>
                <div style={{ fontWeight: 800, color: "var(--accent-cyan)", marginBottom: "0.75rem", fontSize: "1rem" }}>
                  ₹ {product.price}
                </div>
              </Link>
              <button className="btn-card-action" style={{ width: "100%", marginTop: "auto" }} onClick={() => addToCart(product)}>
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;