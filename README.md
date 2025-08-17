# 🎬 Movies Site Project

A full-stack web application for managing and rating movies, built with React/TypeScript frontend and Flask Python backend.

## ✨ Features

- **User Authentication & Authorization**
  - Secure login/signup system with JWT tokens
  - Role-based access control (Admin/User)
  - Password hashing for security

- **Movie Management**
  - Browse and search movies
  - Add movies to personal watchlist
  - Rate movies (1-10 scale)
  - Track movie status (Watched, Watching, Plan to Watch)
  - View average ratings from all users

- **Admin Features**
  - Add new movies to the database
  - View all movies in the system
  - Manage user accounts

- **User Dashboard**
  - Personal movie collection
  - Movie ratings and reviews
  - Watchlist management

## 🏗️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Redux Toolkit** for state management
- **Vite** for build tooling
- **CSS3** for styling
- **Axios** for API communication

### Backend
- **Flask** (Python web framework)
- **JWT Extended** for authentication
- **PyODBC** for SQL Server connectivity
- **Flask-CORS** for cross-origin requests
- **Werkzeug** for password hashing

### Database
- **Microsoft SQL Server** with ODBC driver
- **Structured database schema** for users, movies, and ratings

## 🚀 Getting Started

### Prerequisites
- Python 3.8+
- Node.js 16+
- SQL Server with ODBC Driver 17
- Git

### Backend Setup

1. **Navigate to server directory:**
   ```bash
   cd server
   ```

2. **Install Python dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

3. **Configure database connection:**
   - Update database credentials in `server.py`
   - Ensure SQL Server is running
   - Verify ODBC Driver 17 is installed

4. **Run the Flask server:**
   ```bash
   python server.py
   ```
   Server will start at `http://localhost:5000`

### Frontend Setup

1. **Navigate to client directory:**
   ```bash
   cd client
   ```

2. **Install Node.js dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```
   Frontend will be available at `http://localhost:5173`

## 📁 Project Structure
