# 🏡 HavenFlow - Property Rental & Booking Platform

HavenFlow is a modern Property Rental & Booking Platform that connects tenants and property owners through a secure and transparent rental marketplace. Tenants can explore rental properties, add favorites, book properties, make secure Stripe payments, and leave reviews. Owners can manage their listings and booking requests, while administrators moderate users, properties, and transactions.

---

## 🌐 Live Website

🔗 Live Site: https://your-live-link.vercel.app

---

## 📌 Project Purpose

The goal of HavenFlow is to simplify the property rental process by providing a secure online platform where:

- Tenants can search and book rental properties.
- Property owners can manage their listings.
- Admins can monitor and control the entire platform.
- Online payments are completed securely using Stripe.

---

# ✨ Key Features

## 🔐 Authentication

- Email & Password Login
- Google Authentication
- JWT Authentication
- Protected Private Routes
- Role-Based Access Control
- Three User Roles:
  - Tenant
  - Owner
  - Admin

---

## 🏠 Property Management

- Browse Approved Properties
- Property Search
- Backend Filtering
- Backend Sorting
- Pagination
- Property Details
- Property Reviews
- Add to Favorites

---

## 📅 Booking System

- Property Booking
- Booking Modal
- Booking Status
  - Pending
  - Approved
  - Rejected

---

## 💳 Secure Payment

- Stripe Payment Gateway
- Payment Success Page
- Transaction History
- Payment Records

---

## 👤 Tenant Dashboard

- My Bookings
- My Favorites
- User Profile

---

## 🏢 Owner Dashboard

- Dashboard Analytics
- Monthly Earnings Chart
- Add Property
- Update Property
- Delete Property
- Manage Booking Requests

---

## 🛡️ Admin Dashboard

- Manage Users
- Change User Roles
- Approve Properties
- Reject Properties
- Property Feedback
- Monitor Bookings
- Transaction Management

---

## 📊 Dashboard Features

- Responsive Dashboard
- Analytics Cards
- Monthly Earnings Chart
- Booking Statistics

---

## 🎨 UI Features

- Modern UI
- Responsive Design
- Framer Motion Animation
- HeroUI Components
- Dark Theme
- Loading Page
- Error Page

---

# 🛠️ Technologies Used

## Frontend

- Next.js 15 (App Router)
- React.js
- HeroUI
- Tailwind CSS
- Framer Motion
- React Hook Form
- React Hot Toast
- Axios
- JWT Decode
- React Icons
- Lucide React
- Recharts
- Stripe

---

## Backend

- Node.js
- Express.js
- MongoDB Atlas
- JWT
- bcryptjs
- Stripe
- dotenv
- cors

---

# 📦 NPM Packages

## Client

```bash
next
react
react-dom
tailwindcss
@heroui/react
motion
axios
react-hook-form
react-hot-toast
react-icons
lucide-react
@stripe/react-stripe-js
@stripe/stripe-js
recharts
jwt-decode
```

## Server

```bash
express
mongodb
jsonwebtoken
bcryptjs
cors
dotenv
stripe
cookie-parser
```

---

# 🔐 Environment Variables

## Client

```env
NEXT_PUBLIC_SERVER_URL=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
NEXT_PUBLIC_IMGBB_KEY=
```

## Server

```env
PORT=
MONGODB_URI=
JWT_SECRET=
STRIPE_SECRET_KEY=
CLIENT_URL=
```

---

# 📁 Project Structure

```
Client
│
├── app
├── components
├── hooks
├── providers
├── lib
└── utils

Server
│
├── routes
├── middleware
├── controllers
├── utils
└── index.js
```

---

# 🚀 Installation

## Clone Repository

```bash
git clone https://github.com/your-username/havenflow-client.git
```

## Install Client

```bash
cd havenflow-client
npm install
npm run dev
```

---

## Server

```bash
git clone https://github.com/your-username/havenflow-server.git

cd havenflow-server

npm install

npm run dev
```

---

# 🔑 User Roles

## Tenant

- Browse Properties
- Add Favorites
- Book Property
- Make Payment
- Write Reviews

---

## Owner

- Add Property
- Manage Properties
- View Analytics
- Accept/Reject Booking Requests

---

## Admin

- Manage Users
- Approve Properties
- Reject Properties
- Manage Bookings
- View Transactions

---

# 📈 Future Improvements

- Dark / Light Theme
- PDF Earnings Report
- Social Share
- Email Notifications
- Property Map
- Real-time Notifications

---

# 👨‍💻 Developed By

**Toufik Hossain**

Email: toufikhossain546@gmail.com

LinkedIn:
https://www.linkedin.com/in/toufik-hossain-779b62201

---

# ⭐ Thank You

Thank you for visiting HavenFlow.