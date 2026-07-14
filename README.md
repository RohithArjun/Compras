
# 🛒 Compras - Full Stack E-Commerce Application

Compras is a modern, clean, full-stack e-commerce web application engineered for browsing high-quality tech gadgets, handling seamless cart states, and running end-to-end catalog administration. The platform utilizes a responsive React frontend styled around a signature bright premium teal visual theme, powered by a robust Spring Boot REST API backend and a persistent PostgreSQL database layer.

---

## 🚀 Features

* **📦 Unified Product Catalog:** Interactive grid system showing tech components across indexed category channels (Headphones, Laptops, Mobiles, Electronics, Toys).
* **🔍 Intelligent Live Search:** Real-time query match filtering accessible directly via a sleek nav-integrated search box.
* **🛍️ Balanced Presentation Page:** Distort-free, two-column detail sheets mapping clean product display containers alongside granular specification sets.
* **🔐 Dynamic RBAC Systems:** Role-Based Access Control that switches operational views instantly. Standard `USER` profile tokens see typical storefront options, while validated `ADMIN` context tags display internal modification boards.
* **🛡️ Secure Registration Engine:** Optimized sign-up schemas stripping away legacy user identities to focus strictly on modern properties (`firstName`, `lastName`, `email`, `phoneNumber`, `password`, `userRole`). Features real-time, client-side double-verification password matching.
* **🖼️ Dual-Stream Multipart Engine:** Administrative product insertion and modification routes cleanly manage simultaneous `JSON` text meta parameters alongside raw binary image uploads (`MultipartFile`).
* **💾 Decoupled Asset Serving:** Front-end components fetch text properties from typical entity controllers and retrieve high-res display graphics via direct database binary stream requests.
* **🛒 Persistent Cart Counter:** Live action badge counts maintaining item quantity tracking instantly throughout dynamic component routing changes.
* **📱 Responsive Layout Architectures:** Fluid layout components, input grid wrappers, and side-by-side management structures built with clean, modern CSS.

---

## 🛠️ Tech Stack

### Frontend
* React.js (Functional components with state hooks architecture)
* React Router DOM (Client-side routing frameworks)
* Axios (Promise-based HTTP client data synchronization)
* Bootstrap Icons (Sleek vector icon sets)
* Custom CSS Variables (Unified brand control styling sheets)

### Backend
* Spring Boot (Microservices-capable core application framework)
* Spring MVC (RESTful API architecture routing controllers)
* Spring Data JPA (Object-relational mapping interface)
* Hibernate (Query building database translations)

### Database
* PostgreSQL (Relational datastore managing production tables)

### Build Tools
* Maven (Backend dependencies and compilation cycles)
* npm (Frontend environment setup execution package manager)

---

## 📸 Screenshots

### Home Page
<img width="1906" height="912" alt="image" src="https://github.com/user-attachments/assets/bc438a41-16b9-49f5-9ea9-be0776a8844b" />
<img width="1900" height="912" alt="image" src="https://github.com/user-attachments/assets/0004bdae-e2d4-4724-b57e-548b7f523c92" />

---

### Product Details View
<img width="1917" height="991" alt="image" src="https://github.com/user-attachments/assets/9143c875-f0f7-41fd-b696-8ce05d54611a" />

---

### Update Product Portal
<img width="1901" height="913" alt="image" src="https://github.com/user-attachments/assets/bc749c12-44f3-4b72-88b9-29c11ac20a54" />


---

### Login Page
<img width="1917" height="908" alt="image" src="https://github.com/user-attachments/assets/798f8027-20e7-49ff-a070-5c6cc3c67868" />


---

### Register Page
<img width="1902" height="908" alt="image" src="https://github.com/user-attachments/assets/81385f29-5aca-404c-96da-815ba7302895" />


---

## ⚙️ Getting Started

### Prerequisites

Verify the following system requirements are locally active before staging application infrastructure:

* Java Development Kit (JDK 17 or higher)
* Maven Apache Build Framework
* Node.js (v18 or higher) & npm package managers
* PostgreSQL Server Instance

---

### Backend Setup

1. Clone the project distribution architecture repository:
```bash
   git clone [https://github.com/yourusername/Compras.git](https://github.com/yourusername/Compras.git)

```

2. Navigate into the application server codebase folder structure:
```bash
cd Compras/backend

```


3. Open `src/main/resources/application.properties` and configure your local target PostgreSQL datastore properties:
```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/compras
spring.datasource.username=postgres
spring.datasource.password=your_secure_password

spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

```


4. Compile project dependencies and initialize the Spring Boot server runtime environment:
```bash
mvn spring-boot:run

```

5. Username and password for both user and admin roles
* USER - email: dummy@gmail.com | password: 1234
* ADMIN - email: dummyadmin@gmail.com | password: 1234

The backend environment will bind to: `http://localhost:8080`

---

### Frontend Setup

1. Change directory coordinates to the user interface package folder block:
```bash
cd ../frontend

```


2. Trigger the local installation sequence to download declared package nodes:
```bash
npm install

```


3. Initiate the local build system instance:
```bash
npm run dev

```


The frontend application will initialize at: `http://localhost:5173`

---

## 📡 REST API Endpoints

All client requests securely direct to the base backend URL mapping interface: `http://localhost:8080/api`

### Authentication Routes

| Method | Endpoint | Data Payload Structure | Description |
| --- | --- | --- | --- |
| **POST** | `/register` | `User` (JSON: firstName, lastName, email, phoneNumber, password, userRole) | Registers a new account context directly into database indexes. |

### Storefront Catalog Management

| Method | Endpoint | Data Payload Type | Description | Access Context |
| --- | --- | --- | --- | --- |
| **GET** | `/products` | None | Returns a complete array map profile of inventory listings. | Public |
| **GET** | `/product/{id}` | None | Extracts specific text details sheets for a target inventory item. | Authenticated |
| **GET** | `/product/{id}/image` | None | Direct binary stream data blob rendering the product display graphic. | Authenticated |
| **POST** | `/product` | `FormData` (Blob `product` JSON + File `imageFile`) | Maps multi-part item parameter blocks alongside native image uploads. | **Admin Only** |
| **PUT** | `/product/{id}` | `FormData` (Blob `product` JSON + File `imageFile` *Optional*) | Synchronizes structural property alterations into active system indices. | **Admin Only** |
| **DELETE** | `/product/{id}` | None | Purges identified listing data rows permanently out of storage banks. | **Admin Only** |

---

## 💡 Future Enhancements

* **🔒 Stateless Authentication Integration:** Transitioning local verification mocks into full stateless JSON Web Token (JWT) request tracking structures.
* **💳 Checkout & Secure Payments Gateways:** Embedding standard credit cards processors or sandbox payment interfaces.
* **📦 Historical Order Record Logging:** Tracking purchase events and providing receipt compilation printouts.
* **📈 Advanced Administrative Analysis Tables:** Adding real-time data visualizers monitoring total active revenue and inventory levels.
* **🗂️ Server-Side Pagination & Sorting Indexing:** Optimizing catalog requests to partition large record sets efficiently.
* **🐋 Containerized Deployments:** Wrapping the multi-tier platform components cleanly into isolated Docker environments.

---

## 👨‍💻 Author

**Rohit Kumar**

* **GitHub:** [RohithArjun](https://github.com/RohithArjun)
* **LinkedIn:** [Rohit Kumar - Developer](https://www.linkedin.com/in/rohit-kumar-developer/)

---

## ⭐ Show Your Support
If this implementation pattern helped smooth out your multi-part handling, role verification architectures, or teal theme grid configurations, please drop a ⭐ on the project GitHub repository!
