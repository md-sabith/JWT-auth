# JWT-Auth

A simple full-stack authentication project using JWT, built with **Node.js + Express** on the backend, **MongoDB / Mongoose** for data storage, and **React** on the frontend. Demonstrates signup, login, token-based authentication, storing user info, and protected routes.

---

## 🛠️ Features

- User signup with email, name, password + role (admin / customer)  
- Password hashing with bcrypt  
- Login returns a JWT token + user info  
- Frontend saves token & user info in localStorage  
- Header shows username when logged in; supports logout  
- Email normalization (lowercase + trim) to avoid duplicates  
- Protected backend endpoints (usable with middleware)  
- Basic error handling (invalid credentials, existing email, missing fields)

---

## 📦 Tech Stack

| Backend | Frontend |
|---|---|
| Node.js, Express | React (functional components/hooks) |
| MongoDB with Mongoose | React Router for navigation |
| JWT for auth tokens | Axios for HTTP requests |
| bcrypt for hashing passwords | Tailwind (or other CSS) for styling (if applicable) |

---

## 🚀 Getting Started

1. Clone the repo  
   ```bash
   git clone https://github.com/md-sabith/JWT-auth.git
   cd JWT-auth
