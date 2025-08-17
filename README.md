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

Movies Site Project/
├── client/ # React frontend
│ ├── src/
│ │ ├── components/ # React components
│ │ ├── store/ # Redux store & slices
│ │ ├── types/ # TypeScript type definitions
│ │ └── App.tsx # Main application component
│ ├── package.json # Frontend dependencies
│ └── vite.config.ts # Vite configuration
├── server/ # Flask backend
│ ├── server.py # Main Flask application
│ ├── instance/ # Database files
│ └── requirements.txt # Python dependencies
└── README.md # This file





## �� API Endpoints

### Authentication
- `POST /signup` - User registration
- `POST /login` - User authentication

### Movies
- `GET /allmovies` - Get user's personal movies (JWT required)
- `GET /allmoviestoaddbyuser` - Get available movies to add (JWT required)
- `POST /addmov` - Add movie to personal list (JWT required)
- `POST /movies` - Add new movie to database (Admin only)
- `PUT /movies/update/<id>` - Update movie status/rating (JWT required)
- `DELETE /movies/delete/<id>` - Remove movie from personal list (JWT required)
- `GET /movies/with_avg_rating` - Get all movies with average ratings (JWT required)

## ��️ Database Schema

The application uses several key tables:
- **UserTable** - User accounts and credentials
- **MoviesList** - Master list of all movies
- **PersonalMoviesList** - User-specific movie collections
- **MovieAverageRatings** - Calculated average ratings
- **Roles** & **RoleMatch** - User role management

## 🔒 Security Features

- JWT token-based authentication
- Password hashing with Werkzeug
- Role-based access control
- CORS protection
- SQL injection prevention with parameterized queries

## 🚧 Development

### Running in Development Mode
- Backend: `python server.py` (debug mode enabled)
- Frontend: `npm run dev` (hot reload enabled)

### Building for Production
```bash
cd client
npm run build
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍�� Author

**Bhavna** - [GitHub Profile](https://github.com/Erasable-Mak)

## �� Acknowledgments

- Flask community for the excellent web framework
- React team for the powerful frontend library
- SQL Server community for database support

---

⭐ **Star this repository if you find it helpful!**
