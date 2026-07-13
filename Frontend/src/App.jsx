import "./App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import axios from "axios";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Cart from "./components/Cart";
import AddProduct from "./components/AddProduct";
import ProductDetail from "./components/ProductDetails";
import UpdateProduct from "./components/UpdateProduct";
import Login from "./components/Login";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [cart, setCart] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [data, setData] = useState([]); // Standard product state
  
  const [currentUser, setCurrentUser] = useState(() => {
    const cachedUser = localStorage.getItem("authenticatedUser");
    return cachedUser ? JSON.parse(cachedUser) : null;
  });

  // Fetch product list directly on app mount
  useEffect(() => {
    axios.get("http://localhost:8080/api/products")
      .then((response) => setData(response.data))
      .catch((error) => console.error("Error fetching product data:", error));
  }, []);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct?.quantity === 1) {
        return prevCart.filter((item) => item.id !== product.id);
      }
      return prevCart.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity - 1 } : item
      );
    });
  };

  const RequireAuth = ({ children, allowAdminOnly = false }) => {
    if (!currentUser) {
      return <Navigate to="/login" replace />;
    }
    if (allowAdminOnly && currentUser.userRole !== "ADMIN") {
      return <Navigate to="/" replace />;
    }
    return children;
  };

  return (
    <BrowserRouter>
      {/* Pass data as a normal prop */}
      <Navbar 
        onSelectCategory={setSelectedCategory} 
        currentUser={currentUser} 
        setCurrentUser={setCurrentUser} 
        data={data}
      />
      <Routes>
        <Route path="/login" element={<Login setCurrentUser={setCurrentUser} currentUser={currentUser} />} />

        <Route path="/" element={
          <RequireAuth>
            <Home data={data} addToCart={addToCart} selectedCategory={selectedCategory} />
          </RequireAuth>
        } />
        
        <Route path="/cart" element={
          <RequireAuth>
            <Cart cart={cart} setCart={setCart} />
          </RequireAuth>
        } />

        <Route path="/product/:id" element={
          <RequireAuth>
            <ProductDetail 
              cart={cart} 
              addToCart={addToCart} 
              removeFromCart={removeFromCart} 
              userRole={currentUser?.userRole} 
            />
          </RequireAuth>
        } />

        <Route path="/add_product" element={
          <RequireAuth allowAdminOnly={true}>
            <AddProduct />
          </RequireAuth>
        } />
        
        <Route path="/product/update/:id" element={
          <RequireAuth allowAdminOnly={true}>
            <UpdateProduct />
          </RequireAuth>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;