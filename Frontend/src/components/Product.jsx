import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import AppContext from "../Context/Context";
import axios from "../axios";
import ProductDetail from "./ProductDetails";

const Product = () => {
  const { id } = useParams();
  const { removeFromCart, addToCart, refreshData } = useContext(AppContext);
  const [product, setProduct] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/product/${id}`);
        setProduct(response.data);
        if (response.data.imageName) {
          fetchImage();
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    const fetchImage = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/product/${id}/image`, {
          responseType: "blob",
        });
        setImageUrl(URL.createObjectURL(response.data));
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    };

    fetchProduct();
  }, [id]);

  const deleteProduct = async () => {
    try {
      await axios.delete(`http://localhost:8080/api/product/${id}`);
      removeFromCart(id);
      alert("Product deleted successfully");
      refreshData();
      navigate("/");
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleEditClick = () => {
    navigate(`/product/update/${id}`);
  };

  const handlAddToCart = () => {
    addToCart(product);
    alert("Product added to cart");
  };

  if (!product) {
    return <h2 className="loading-state">Loading...</h2>;
  }

  return (
    <>
      <div className="product-page-container">
        {/* Left Column: Premium Framed Image Housing */}
        <div className="product-image-section">
          <img src={imageUrl} alt={product.imageName} className="product-hero-img" />
        </div>

        {/* Right Column: Clean Typographic Detail Section */}
        <div className="product-details-section">
          <div className="product-description-header">
            <span className="product-category-tag">{product.category}</span>
            <span className="product-release-date">
              Listed: <strong>{new Date(product.releaseDate).toLocaleDateString()}</strong>
            </span>
          </div>

          <h1 className="product-main-title">{product.name}</h1>
          <span className="product-brand-sub">{product.brand}</span>

          <div className="product-body-desc">
            <h3>PRODUCT DESCRIPTION :</h3>
            <p>{product.description}</p>
          </div>

          <div className="product-pricing-tier">
            <span className="product-price-display">{"$" + product.price}</span>
            
            <button
              className={`action-btn btn-cart-submit ${!product.productAvailable ? "disabled-btn" : ""}`}
              onClick={handlAddToCart}
              disabled={!product.productAvailable}
            >
              {product.productAvailable ? "Add to Cart" : "Out of Stock"}
            </button>

            <h6 className="stock-counter">
              Stock Available :{" "}
              <span className={product.stockQuantity > 0 ? "stock-in" : "stock-out"}>
                {product.stockQuantity}
              </span>
            </h6>
          </div>

          {/* Bottom Modification Bar */}
          <div className="product-management-actions">
            <button className="action-btn btn-update" type="button" onClick={handleEditClick}>
              Update
            </button>
            <button className="action-btn btn-delete" type="button" onClick={deleteProduct}>
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;