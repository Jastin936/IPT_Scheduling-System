# IPT Scheduling System

A robust scheduling application designed to streamline appointment management, resource allocation, and time tracking. Built as part of the Integrative Programming and Technologies (IPT) curriculum.

## 🚀 Features
* **Dynamic Scheduling:** Efficiently manage and allocate time slots without overlaps.
* **User Management:** Distinct roles and permissions for system administrators and regular users.
* **Real-time Validations:** Prevents double-booking and scheduling conflicts out of the box.

## 🛠️ Tech Stack
* **Backend:** Python (Django / Flask - *adjust based on your exact framework*)
* **Database:** MySQL / SQLite
* **Frontend:** HTML5, CSS3, JavaScript (Bootstrap / Tailwind)

---

## 💻 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine.

### Prerequisites
Make sure you have Python 3.x installed on your system.

### Installation & Setup

## 🛠️ Step 1: Backend Setup (Django REST Framework)

1. **Initialize Environment and Install Dependencies:**
   ```bash
   
   git clone [https://github.com/Jastin936/IPT_Scheduling-System.git](https://github.com/Jastin936/IPT_Scheduling-System.git)
   cd IPT_Scheduling-System
   
   # Create and activate a python virtual environment
   python -m venv venv
   
   # activate a virtual environment
   venv\Scripts\activate
   
   # Install Django, Django REST Framework, JWT Auth, and CORS headers
   pip install django djangorestframework djangorestframework-simplejwt django-cors-headers

2. **Create the Django Project and App**
     ```bash
     # Create the main project configuration named 'backend'
     django-admin startproject backend .
     
     # Create an app specifically for your scheduling logic
     python manage.py startapp events

## 💻 Step 2: Frontend Setup (React + Vite)

1. **Initialize Vite and Install Dependencies**
     ```bash
     # Create the React Vite project
     npm create vite@latest frontend -- --template react

     # Navigate into the frontend folder
     cd frontend

     # Install the standard package dependencies
     npm install

     # Install Axios for API requests and React Router for page navigation
     npm install axios react-router-dom

2. **Frontend Folder Structure**
     ```plaintext
     src/
     ├── components/
     │   ├── Navbar.jsx
     │   └── ProtectedRoute.jsx
     │
     ├── context/
     │   └── AuthContext.jsx
     │
     ├── pages/
     │   ├── Login.jsx
     │   ├── Register.jsx
     │   └── Dashboard.jsx
     │
     ├── services/
     │   └── api.js
     │
     ├── App.jsx
     └── main.jsx
    ```

## 🚀 Step 3: Running Your Project

1. **Start the Django Backend**
     ```bash
     # Create migration files based on changes in models.py
     python manage.py makemigrations

     # Apply migrations and update the database schema
     python manage.py migrate

     # Start the Django development server
     python manage.py runserver

**Your API will be live at* `http://127.0.0.1:8000/`

2. **Start the React Frontend**
     ```bash
     # In your frontend directory terminal
     npm run dev

**Your user interface will be live at* `http://localhost:5173/`

## ⚙️ Backend Endpoint Architecture Blueprint
     ```plaintext
    HTTP Method       API Endpoint                Purpose
    POST              /api/register/              Creates a new user profile
    POST              /api/token/                 Exchanges password for JWT tokens
    POST              /api/token/refresh/         Refreshes expired access tokens
    GET/POST          /api/events/                Lists user's events / Creates a new event
    GET/PUT/DELETE    /api/events/<id>/           Reads, updates, or deletes a specific event
