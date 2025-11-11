# TaskMangement Full Stack Application

## 🚀 Project Overview

A **Scalable Web App** built with **React.js (frontend)** and **Node.js/Express (backend)**.  
Features **user authentication, profile management, and task dashboard** with full CRUD operations.

**Live Demo:** https://user-management-frontend-a7l6.vercel.app


---

## 🌟 Key Features

### Authentication & User Management

- Signup & Login with **JWT authentication**
- Profile fetching & update
- Password hashing using **bcrypt**
- Protected routes for dashboard and profile

### Task Dashboard

- Create, Read, Update, Delete tasks
- Search tasks by title
- Filter tasks by status (Todo, In Progress, Done)
- Logout functionality

### UI & UX

- Responsive design using **Bootstrap** + custom CSS
- Clean, modern, and intuitive layout
- Works seamlessly on **desktop & mobile devices**

---

## 🛠 Tech Stack

- **Frontend:** React.js, Bootstrap, TailwindCSS (optional), Axios, React Router
- **Backend:** Node.js, Express.js, SQLite, bcrypt, JWT
- **Other:** Postman / Swagger for API documentation

---

## ⚡ Setup Instructions

### Backend

1. Navigate to backend folder:

```bash
cd backend
Install dependencies:

npm install


Create a .env file:

PORT=4000
JWT_SECRET=your_secret_key


Run backend server:

node app.js

Frontend

Navigate to frontend folder:

cd frontend


Install dependencies:

npm install


Run frontend:

npm start


Access the app at http://localhost:5174

---
```
## 🔗 API Endpoints (Sample Overview)

 ### 🧑‍💼 Authentication APIs

 ```

```

| Method   | Endpoint            | Description                 | Auth Required |
| -------- | ------------------- | --------------------------- | ------------- |
| **POST** | `/api/auth/signup`  | Register a new user         | ❌ No          |
| **POST** | `/api/auth/login`   | Login and receive JWT token | ❌ No          |
| **GET**  | `/api/auth/profile` | Get logged-in user profile  | ✅ Yes (JWT)   |

```

📸 Screenshots

![Login Page](screenshots/login.png)
![Signup Page](screenshots/signup.png)
![Dashboard Page](screenshots/dashboard.png)



📚 References

React.js Documentation

Node.js & Express Documentation

SQLite Documentation
```
