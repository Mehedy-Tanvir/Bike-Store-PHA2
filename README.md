# 🚴 Bike Store API

A comprehensive API for managing bike inventory, handling orders, and calculating revenue. Built with **TypeScript**, **Express.js**, and **MongoDB**, this application provides robust endpoints for efficient bike store management.

---

## 🌟 Features

### 📦 **Product Management**

- **Add New Product**: Create a bike with details like name, brand, price, category, and stock status.
- **Get All Bikes**: Retrieve a list of all available bikes with support for filters (e.g., name, brand, category).
- **Get Specific Bike**: Fetch detailed information about a specific bike using its unique ID.
- **Update Bike**: Modify bike details such as price and stock quantity.
- **Delete Bike**: Soft delete a bike, ensuring it is no longer available for transactions.

### 🛒 **Order Management**

- **Place Orders**: Reduce inventory when a bike is ordered, ensuring inventory accuracy.
- **Handle Stock**: Automatically update stock status (`inStock`) when quantities reach zero.
- **Error Handling**: Return appropriate messages for insufficient stock during order placement.

### 📊 **Revenue Calculation**

- **Calculate Revenue**: Use MongoDB's aggregation pipeline to compute total revenue from all orders.

---

## 🛠️ **Getting Started**

### ⚡ Prerequisites

- **Node.js** (v18+ recommended)
- **MongoDB** (Local or Cloud instance)
- **Git**
- **npm** or **yarn**

---

### 🚀 **Setup Instructions**

1. **Clone the Repository**

   ```bash
   git clone https://github.com/Mehedy-Tanvir/Bike-Store-PHA2.git
   cd bike-store
   ```

2. **Install Dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Setup Environment Variables**
   Create a `.env` file in the root directory and add the following:

   ```env
   PORT=3000
   MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/bike-store
   ```

4. **Run the Project**

   - **Development Mode**
     ```bash
     npm run start:dev
     # or
     yarn start:dev
     ```
   - **Production Mode**
     ```bash
     npm run build
     npm run start:prod
     # or
     yarn build && yarn start:prod
     ```

5. **Run Linter and Formatter**
   - To check for linting issues:
     ```bash
     npm run lint
     # or
     yarn lint
     ```
   - To fix linting and formatting:
     ```bash
     npm run lint:fix
     npm run prettier
     # or
     yarn lint:fix && yarn prettier
     ```

---

## 🧪 **API Endpoints**

### 1. **Add New Bike**

- **Endpoint**: `POST /api/products`
- **Request Body**:
  ```json
  {
    "name": "Xtreme Mountain Bike",
    "brand": "Giant",
    "price": 1200,
    "category": "Mountain",
    "description": "A high-performance bike built for tough terrains.",
    "quantity": 50
  }
  ```
- **Response**:
  ```json
  {
    "message": "Product added successfully",
    "status": true,
    "data": { ... }
  }
  ```

### 2. **Get All Bikes**

- **Endpoint**: `GET /api/products`
- **Query Parameters**:
  - `searchTerm` (optional): Search by `name`, `brand`, or `category`.
- **Response**:
  ```json
  {
    "message": "Bikes retrieved successfully",
    "status": true,
    "data": [ ... ]
  }
  ```

### 3. **Get Specific Bike**

- **Endpoint**: `GET /api/products/:productId`
- **Response**:
  ```json
  {
    "message": "Bike retrieved successfully",
    "status": true,
    "data": { ... }
  }
  ```

### 4. **Update a Bike**

- **Endpoint**: `PUT /api/products/:productId`
- **Request Body** (example):
  ```json
  {
    "price": 1300,
    "quantity": 30
  }
  ```
- **Response**:
  ```json
  {
    "message": "Bike updated successfully",
    "status": true,
    "data": { ... }
  }
  ```

### 5. **Delete a Bike**

- **Endpoint**: `DELETE /api/products/:productId`
- **Response**:
  ```json
  {
    "message": "Bike deleted successfully",
    "status": true
  }
  ```

### 6. **Place an Order**

- **Endpoint**: `POST /api/orders`
- **Request Body**:
  ```json
  {
    "email": "customer@example.com",
    "product": "648a45e5f0123c45678d9012",
    "quantity": 2,
    "totalPrice": 2400
  }
  ```
- **Response**:
  ```json
  {
    "message": "Order created successfully",
    "status": true,
    "data": { ... }
  }
  ```

### 7. **Calculate Revenue**

- **Endpoint**: `GET /api/orders/revenue`
- **Response**:
  ```json
  {
    "message": "Revenue calculated successfully",
    "status": true,
    "data": {
      "totalRevenue": 3600
    }
  }
  ```

---

## 🧩 **Project Structure**

```plaintext
├── src
│   ├── controllers       # Controllers for handling API logic
│   ├── models            # MongoDB models (Product, Order)
│   ├── routes            # API routes
│   ├── utils             # Utility functions and helpers
│   └── server.ts         # Application entry point
├── .env                  # Environment variables
├── .eslintrc.json        # ESLint configuration
├── tsconfig.json         # TypeScript configuration
├── package.json          # Dependencies and scripts
└── README.md             # Project documentation
```

---

## 📚 **Technologies Used**

- **Node.js** & **Express.js**
- **MongoDB** & **Mongoose**
- **TypeScript**
- **Zod** for request validation
- **ESLint** & **Prettier** for code quality
- **ts-node-dev** for seamless development

---

## 📧 **Contact**

For questions or support, please reach out via [your email or GitHub profile](https://github.com/Mehedy-Tanvir).
