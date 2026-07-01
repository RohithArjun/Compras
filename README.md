# 🛒 Compras - Full Stack E-Commerce Application

Compras is a full-stack e-commerce web application that allows users to browse products, search by category, manage inventory, and perform complete CRUD operations. The application features a modern React frontend, a Spring Boot REST API backend, and PostgreSQL for persistent data storage.

---

## 🚀 Features

- 📦 Product Listing
- 🔍 Search Products
- 🗂️ Category Filtering
- 🛍️ Product Details Page
- ➕ Add New Product
- ✏️ Update Existing Product
- 🗑️ Delete Product
- 🛒 Shopping Cart
- 🌙 Dark Mode UI
- 🖼️ Product Image Upload
- 📱 Responsive Design
- 🔄 RESTful API Integration

---

# 🛠️ Tech Stack

## Frontend
- React.js
- React Router
- Axios
- Bootstrap
- CSS

## Backend
- Spring Boot
- Spring MVC
- Spring Data JPA
- REST APIs

## Database
- PostgreSQL

## Build Tools
- Maven
- npm

---

# 📸 Screenshots

## Home Page

<img width="1908" height="905" alt="image" src="https://github.com/user-attachments/assets/6729efdd-44a9-4196-a4c9-80f3a5e8e370" />


---

## Product Details

<img width="1918" height="990" alt="image" src="https://github.com/user-attachments/assets/68ecbe39-f8ea-445b-9cad-0d8022b9dcd9" />


---

## Update Product

<img width="1913" height="998" alt="image" src="https://github.com/user-attachments/assets/525813a4-cba6-4d23-abd6-9a58eddb3ff7" />



---

# ⚙️ Getting Started

## Prerequisites

Make sure you have installed:

- Java 17+
- Maven
- Node.js
- npm
- PostgreSQL

---

## Backend Setup

Clone the repository

```bash
git clone https://github.com/yourusername/Compras.git
```

Navigate to backend

```bash
cd backend
```

Update your database credentials in

```
application.properties
```

Example

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/compras
spring.datasource.username=postgres
spring.datasource.password=yourpassword

spring.jpa.hibernate.ddl-auto=update
```

Run the Spring Boot application

```bash
mvn spring-boot:run
```

Backend will start at

```
http://localhost:8080
```

---

## Frontend Setup

Navigate to frontend

```bash
cd frontend
```

Install dependencies

```bash
npm install
```

Run the React application

```bash
npm run dev
```

Frontend will start at

```
http://localhost:5173
```

---

# 📡 REST API Endpoints

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | `/products` | Get all products |
| GET | `/product/{id}` | Get product by ID |
| POST | `/product` | Add new product |
| PUT | `/product/{id}` | Update product |
| DELETE | `/product/{id}` | Delete product |

---

# 💡 Future Enhancements

- User Authentication (JWT)
- User Registration/Login
- Checkout Module
- Payment Gateway Integration
- Wishlist
- Order Management
- Product Reviews
- Admin Dashboard
- Pagination
- Product Sorting
- Docker Deployment
- CI/CD Pipeline

---

# 👨‍💻 Author

**Rohit Kumar**

GitHub: https://github.com/RohithArjun

LinkedIn: *(Add your LinkedIn profile here)*

---

# ⭐ Show Your Support

If you found this project useful, please consider giving it a ⭐ on GitHub.
