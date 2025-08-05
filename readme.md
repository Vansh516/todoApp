# 📝 Task Management API with User Authentication

A complete RESTful API for managing users and their tasks, built using **Node.js**, **Express.js**, and **MongoDB**. It features secure user registration/login using JWT and supports full CRUD operations for personal task management.

## 🚀 Features

- 🔐 **User Authentication**
  - Register with name, email, password, and phone number
  - Login with secure JWT tokens (stored in HTTP-only cookies)
  - Logout functionality
- 👤 **User Management**
  - Update profile information
  - Change password securely
  - Delete account along with all related tasks
- ✅ **Task Management**
  - Create, view, update, and delete tasks
  - Only authenticated users can manage their own tasks
  - Task counts tracked per user

## 🧰 Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB + Mongoose**
- **JWT (JSON Web Token)**
- **express-async-handler**
- **Custom Middleware & Error Handling**

## 📁 Project Structure

```

task-manager-api/
├── controllers/
│   ├── auth.controller.js
│   └── task.controller.js
├── models/
│   ├── user.models.js
│   └── task.models.js
├── routes/
│   ├── auth.routes.js
│   └── task.routes.js
├── middlewares/
│   ├── auth.middleware.js
│   └── error.middleware.js
├── utils/
│   ├── Error.utils.js
│   └── jwt.utils.js
├── app.js / server.js
├── .env
└── package.json

````

## ⚙️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/task-manager-api.git
cd task-manager-api
````

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the root folder and add the following:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

### 4. Run the server

```bash
npm run dev
```

The server should now be running at `http://localhost:5000`.

## 🛡️ API Endpoints (Summary)

### Auth Routes

| Method | Endpoint           | Description           |
| ------ | ------------------ | --------------------- |
| POST   | /api/auth/register | Register a new user   |
| POST   | /api/auth/login    | Login and get token   |
| PUT    | /api/auth/profile  | Update user profile   |
| PUT    | /api/auth/password | Change user password  |
| DELETE | /api/auth/profile  | Delete user and tasks |
| GET    | /api/auth/logout   | Logout user           |

### Task Routes (Protected)

| Method | Endpoint       | Description            |
| ------ | -------------- | ---------------------- |
| POST   | /api/task      | Create a new task      |
| GET    | /api/task      | Get all user tasks     |
| GET    | /api/task/\:id | Get a specific task    |
| PUT    | /api/task/\:id | Update a specific task |
| DELETE | /api/task/\:id | Delete a task          |

## 🧪 Tools Used

* Postman or ThunderClient for testing
* MongoDB Atlas or local MongoDB
* Nodemon for live development

