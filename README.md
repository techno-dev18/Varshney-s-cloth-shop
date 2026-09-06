/# Varshney's Cloth Shop

A modern full-stack fashion e-commerce web application built for browsing, discovering, and purchasing clothing products online.

The project provides a complete shopping experience including product discovery, category filtering, authentication, cart management, wishlist management, order placement, order tracking, profile management, and an admin-ready architecture.

---

## 🌐 Live Demo

**Frontend:**  
https://varshneyscloth-shop-frontend.onrender.com

**Backend API:**  
https://varshney-s-cloth-shop.onrender.com

---

## 📌 Project Overview

**Varshney's Cloth Shop** is a full-stack e-commerce platform designed around a premium fashion-store experience.

Customers can:

- Browse clothing collections
- Explore products by category
- Search and filter products
- View detailed product information
- Select product sizes
- Add products to their basket
- Manage basket quantities
- Add/remove products from wishlist
- Create an account
- Login securely
- Update their profile
- Change their password
- Place orders
- View previous orders
- View individual order details
- Track order status
- Contact the store
- Learn more about the brand

The application uses a React frontend, Node.js/Express backend, and MongoDB Atlas database.

---

# ✨ Features

## 👕 Product Management

- 14 clothing categories
- 42 products
- Product images
- Product name
- Brand
- Category
- Gender
- Price
- Discount
- Ratings
- Available sizes
- Tagline
- Description
- Product features
- Product details

### Available Categories

1. T-Shirts
2. Hoodies
3. Sweatshirts
4. Trousers
5. Shorts
6. Cargo Pants
7. Blazers
8. Suits
9. Ethnic Wear
10. Sarees
11. Palazzos
12. Coats
13. Sports Wear
14. Accessories

---

# 🔎 Product Discovery

Users can discover products through:

- Category browsing
- Product search
- Gender filtering
- Rating filtering
- Price sorting
- Category-specific collections
- Individual product pages

---

# 🛒 Basket / Cart

Authenticated users can:

- Add products to basket
- Select product size
- Change quantity
- Remove products
- View total quantity
- View order total
- Continue shopping
- Proceed to checkout

The basket is connected to the backend and associated with the logged-in user.

---

# ❤️ Wishlist

Users can:

- Add products to wishlist
- Remove products from wishlist
- View their wishlist
- See wishlist item count in the header

Wishlist operations are protected by authentication.

---

# 🔐 Authentication

The application uses JWT-based authentication.

Features include:

- User registration
- User login
- Logout
- Protected API routes
- Authentication middleware
- Password hashing
- Password change
- User profile
- JWT stored using cookies

Passwords are hashed using `bcryptjs`.

---

# 👤 User Profile

Users can:

- View account information
- Edit their profile
- Update personal information
- Change password
- Logout

The account area is protected for authenticated users.

---

# 📦 Orders

Authenticated users can:

- Place orders
- View order history
- View individual orders
- View ordered products
- View delivery address
- View payment information
- View order total
- Track order status

Order details are stored in MongoDB and associated with the user.

---

# 🚚 Order Tracking

Orders include a visual tracking flow such as:

```text
Placed
  ↓
Confirmed
  ↓
Processing
  ↓
Shipped
  ↓
Delivered