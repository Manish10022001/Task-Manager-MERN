# done. — Task Manager

> A clean, fast, and secure task management application built with the MERN stack.

**Live Demo:** [donedot.vercel.app](https://donedot.vercel.app)  
**Backend API:** [task-manager-mern-kn1z.onrender.com](https://task-manager-mern-kn1z.onrender.com)  

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [API Reference](#api-reference)
- [Database Schema](#database-schema)
- [Deployment](#deployment)
- [Screenshots](#screenshots)

---

## Overview

**done.** is a full-stack task management web application that allows users to register, log in, and manage their personal tasks. Each user sees only their own tasks, secured with JWT authentication. The app supports full CRUD operations, real-time filtering and search from the backend, and pagination.

The project demonstrates clean code architecture, RESTful API design, JWT-based authentication, middleware-driven validation, and a fully responsive UI.

---

## Features

### Core Features
- **Authentication** — Secure register and login with JWT tokens
- **Task Management** — Create, read, update, and delete tasks
- **Toggle Status** — Mark tasks as pending or completed
- **Protected Routes** — Tasks are only accessible to authenticated users
- **Form Validation** — Validated on both frontend and backend
- **Responsive UI** — Works seamlessly on mobile, tablet, and desktop
- **Error Handling** — Global error handler on backend, error messages on frontend
- **Search** — Search tasks by title or description, queried from MongoDB
- **Filter** — Filter tasks by All, Pending, or Completed status
- **Sort** — Sort tasks by newest, oldest, A→Z, Z→A
- **Pagination** — 6 tasks per page, handled entirely on the backend
- **Deployment** — Live on Vercel (frontend) and Render (backend)

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React.js, Vite, Tailwind CSS v4 |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| Authentication | JSON Web Tokens (JWT) |
| Password Hashing | bcryptjs |
| HTTP Client | Axios |
| Icons | Lucide React |
| Fonts | Outfit, Instrument Serif (Google Fonts) |
| Frontend Hosting | Vercel |
| Backend Hosting | Render |

---

## Project Structure

```
Task-Manager-MERN/
│
├── server/                          # Node.js + Express backend
│   ├── controllers/
│   │   ├── authController.js        # Register and login logic
│   │   └── taskController.js        # Task CRUD + search + pagination
│   ├── middleware/
│   │   ├── authMiddleware.js        # JWT token verification
│   │   ├── validate.js              # Input + query validation
│   │   └── errorMiddleware.js       # Global error handler
│   ├── models/
│   │   ├── User.js                  # User mongoose schema
│   │   └── Task.js                  # Task mongoose schema
│   ├── routes/
│   │   ├── authRoutes.js            # /api/auth endpoints
│   │   └── taskRoutes.js            # /api/tasks endpoints
│   ├── .env                         # Environment variables (not committed)
│   └── server.js                    # App entry point
│
└── client/                          # React + Vite frontend
    └── src/
        ├── api/
        │   └── axios.js             # Axios instance with auth interceptor
        ├── context/
        │   ├── AuthContext.jsx      # Global auth state provider
        │   └── useAuth.js           # useAuth custom hook
        ├── hooks/
        │   └── useTasks.js          # All task API calls in one hook
        ├── components/
        │   ├── Navbar.jsx           # Top navigation with search
        │   ├── TaskCard.jsx         # Individual task row
        │   ├── TaskModal.jsx        # Add / edit task modal
        │   ├── FilterBar.jsx        # Filter chips and sort dropdown
        │   ├── Pagination.jsx       # Page navigation
        │   ├── EmptyState.jsx       # Empty state illustration
        │   ├── ConfirmModal.jsx     # Delete and logout confirmation
        │   ├── ProtectedRoute.jsx   # Route guard for auth
        │   └── Footer.jsx           # App footer
        ├── pages/
        │   ├── Login.jsx            # Login page
        │   ├── Register.jsx         # Register page
        │   └── Dashboard.jsx        # Main task dashboard
        ├── App.jsx                  # Routes configuration
        ├── main.jsx                 # App entry point
        └── index.css                # Global styles + Tailwind
```

---

## Getting Started

### Prerequisites

- Node.js v18 or higher
- npm
- MongoDB Atlas account (free tier works)
- Git

### 1. Clone the repository

```bash
git clone https://github.com/Manish10022001/Task-Manager-MERN.git
cd Task-Manager-MERN
```

### 2. Backend setup

```bash
cd server
npm install
```

Create a `.env` file inside the `server` folder:

```env
PORT=8000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_secret_key_here
CLIENT_URL=http://localhost:5173
```

Start the backend development server:

```bash
npm run dev
```

Backend runs at `http://localhost:8000`

Verify it's working:
```
GET http://localhost:8000/health
```
Should return: `{ "status": "Health OK" }`

### 3. Frontend setup

Open a new terminal:

```bash
cd client
npm install
```

Create a `.env` file inside the `client` folder:

```env
VITE_API_URL=http://localhost:8000/api
```

Start the frontend development server:

```bash
npm run dev
```

Frontend runs at `http://localhost:5173`

---

## API Reference

### Authentication

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Register a new user | No |
| POST | `/api/auth/login` | Login and receive JWT token | No |

**Register request body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "123456"
}
```

**Login request body:**
```json
{
  "email": "john@example.com",
  "password": "123456"
}
```

**Auth response:**
```json
{
  "message": "Login successful",
  "token": "eyJhbGci...",
  "user": {
    "id": "64abc...",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

### Tasks

All task endpoints require the `Authorization: Bearer <token>` header.

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tasks` | Get tasks (supports query params) |
| POST | `/api/tasks/create` | Create a new task |
| PUT | `/api/tasks/update/:id` | Update task title, description, status |
| PATCH | `/api/tasks/update/:id` | Toggle task status only |
| DELETE | `/api/tasks/delete/:id` | Delete a task |

**GET /api/tasks — Query Parameters:**

| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `status` | string | Filter by status | `pending` or `completed` |
| `search` | string | Search title or description | `meeting` |
| `page` | number | Page number | `1` |
| `limit` | number | Tasks per page (max 50) | `6` |

**Example requests:**
```
GET /api/tasks
GET /api/tasks?status=pending
GET /api/tasks?search=meeting
GET /api/tasks?status=pending&search=meeting&page=1&limit=6
```

**GET /api/tasks response:**
```json
{
  "tasks": [...],
  "total": 15,
  "totalPending": 9,
  "totalCompleted": 6,
  "page": 1,
  "totalPages": 3,
  "hasNextPage": true,
  "hasPrevPage": false
}
```

---

## Database Schema

### User Schema

```js
{
  name:      { type: String, required: true, trim: true },
  email:     { type: String, required: true, unique: true, lowercase: true },
  password:  { type: String, required: true },  // hashed with bcryptjs
  timestamps: true
}
```

### Task Schema

```js
{
  title:       { type: String, required: true, trim: true },
  description: { type: String, default: '' },
  status:      { type: String, enum: ['pending', 'completed'], default: 'pending' },
  userId:      { type: ObjectId, ref: 'User', required: true },
  timestamps:  true
}
```

---

## Environment Variables

### Backend — `server/.env`

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port | `8000` |
| `MONGO_URI` | MongoDB Atlas URI | `mongodb+srv://...` |
| `JWT_SECRET` | JWT signing secret | `mysecretkey123` |
| `CLIENT_URL` | Frontend URL for CORS | `https://donedot.vercel.app` |

### Frontend — `client/.env`

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API base URL | `http://localhost:8000/api` |
---

## Author

Developed by **Manish Shirsat** .
