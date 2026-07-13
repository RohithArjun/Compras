import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ProductDetail = ({ cart, addToCart, removeFromCart, userRole }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const cartItem = cart?.find((item) => item.id === parseInt(id)) || null;
  const itemQuantity = cartItem ? cartItem.quantity : 0;

  useEffect(() => {
    const fetchProductAndImage = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/product/${id}`);
        const productData = response.data;

        try {
          const imgResponse = await axios.get(
            `http://localhost:8080/api/product/${id}/image`,
            { responseType: "blob" }
          );
          const imageUrl = URL.createObjectURL(imgResponse.data);
          setProduct({ ...productData, imageUrl });
        } catch (imgError) {
          setProduct({ ...productData, imageUrl: "https://via.placeholder.com/600x400" });
        }
      } catch (error) {
        console.error("Error loading product data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductAndImage();
  }, [id]);

  if (loading) {
    return <div className="form-layout-card-pane text-center"><h2>Loading Product...</h2></div>;
  }

  if (!product) {
    return <div className="form-layout-card-pane text-center"><h2>Product Not Found</h2></div>;
  }

  return (
    <div className="app-main-layout-container">
      <div className="left-content-workspace single-profile-mode">
        <div className="premium-product-card">
          <div className="card-title-header-row">
            <span className="badge-purple-tag">{product.category || "General"}</span>
          </div>

          <div className="mt-2">
            <h1 className="product-card-title">{product.name}</h1>
            <span className="product-card-brand">Brand: <strong>{product.brand}</strong></span>
          </div>

          <div className="card-image-display-frame" style={{ maxHeight: "380px", overflow: "hidden" }}>
            <img src={product.imageUrl} alt={product.name} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
          </div>

          <div>
            <div className="product-card-price">
              <i className="bi bi-currency-rupee"></i> {product.price}
            </div>
            <p className="product-description-text mt-3">{product.description}</p>
          </div>

          {/* Conditional Admin Actions checking userRole prop */}
          <div className="card-action-footer-buttons">
<button className="btn-card-action" onClick={() => addToCart(product)}>
  {product.productAvailable !== false ? "Add to Cart" : "Out of Stock"}
</button>            
            {userRole === "ADMIN" && (
              <>
                <button className="btn-card-action" onClick={() => navigate(`/product/update/${id}`)}>Update Details</button>
                <button className="btn-card-action" style={{ color: "#ef4444" }}>Delete</button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;