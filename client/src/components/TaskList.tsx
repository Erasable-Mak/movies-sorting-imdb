// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchTasks } from '../store/actions';
// import { RootState, AppDispatch } from '../store';
// import axios from 'axios';
// import { clearUser } from '../store/userSlice';
// import * as XLSX from 'xlsx';
// import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, Select, MenuItem } from '@mui/material';
// import './componentall.css';
// import { useNavigate } from 'react-router-dom';
// import axiosInstance from '../types/axiosInstance'; // Import the Axios instance

// const TaskList = () => {
// const dispatch = useDispatch<AppDispatch>();
// const tasks = useSelector((state: RootState) => state.tasks);
// const history = useNavigate();
// const loading = useSelector((state: RootState) => state.loading);
// const token = useSelector((state: RootState) => state.user.token);
// // console.log("Token from Redux:", token);

// const [allmovies, setAllMovies] = useState<any[]>([]);  // State to hold movies
// const [error, setError] = useState<string>('');  // State to hold error message
// const [selectedMovie, setSelectedMovie] = useState<any>(null);  // Movie being edited
// const [updatedRating, setUpdatedRating] = useState<number | string>('');
// const [updatedStatus, setUpdatedStatus] = useState<string>('');

// enum MovieStatus {
//   To_Watch = 'To-Watch',
//   Already_seen = 'Already Seen',
// }

// useEffect(() => {
//     // dispatch(fetchTasks());

//     const fetchMovies = async () => {
//       try {
//         // const token = localStorage.getItem('authToken');

//         if (!token) {
//           console.error('No auth token found');
//           setError('You need to log in again.');
//           return;
//         }

//         // const response = await axios.get(`${import.meta.env.VITE_API_URL}/allmovies`, {
//         //   headers: {
//         //     Authorization: `Bearer ${token}`, // Ensure the token is being sent, hope so
//         //   },
//         // });
//         const response = await axiosInstance.get('/allmovies');


//         // Check if the response contains personal_movies or allmovies data
//         if (response.data && response.data.personal_movies) {
//           setAllMovies(response.data.personal_movies); // Display personal movies for User
//         } else if (response.data && response.data.allmovies) {
//           setAllMovies(response.data.allmovies); // Display all movies for Admin
//         } else {
//           setError('No movies found or invalid data returned.');
//         }
//       } catch (error) {
//         console.error('Error fetching movies:', error);
//         setError('Error fetching movies, please try again later.');
//       }
//     };

//     fetchMovies();
//   }, [dispatch]);

//   // Logout function
//   const handleLogout = () => {
//     localStorage.removeItem('authToken');
//     history('/'); // Redirect to login page
//   };

//   const handleDialogRoute = () => {
//     history('/allmoviestoaddbyuser');
//   };

//   const exportToExcel = () => {
//     const ws = XLSX.utils.json_to_sheet(allmovies);
//     const wb = { Sheets: { 'Movies': ws }, SheetNames: ['Movies'] };
//     const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });

//     const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
//     const data = new Blob([excelBuffer], { type: EXCEL_TYPE });
//     const url = window.URL.createObjectURL(data);
//     const link = document.createElement('a');
//     link.href = url;
//     link.download = 'Movies.xlsx';
//     link.click();
//   };

//   // Function to update rating and status of a movie
//   const handleUpdateMovie = async (movieId: number) => {
//     try {
//       // const response = await axios.put(
//       //   `${import.meta.env.VITE_API_URL}/movies/update/${movieId}`,
//       //   { status: updatedStatus, rating: updatedRating },
//       //   {
//       //     headers: {
//       //       Authorization: `Bearer ${localStorage.getItem('authToken')}`,
//       //     },
//       //   }
//       // );
//       const response = await axiosInstance.put(
//         `/movies/update/${movieId}`,
//         { status: updatedStatus, rating: updatedRating }
//       );      
//       if (response.status === 200) {
//         alert('Movie updated successfully');
//         setAllMovies(allmovies.map((movie) =>
//           movie.MovieId === movieId ? { ...movie, Status: updatedStatus, Rating: updatedRating } : movie
//         ));
//         setSelectedMovie(null);
//       }
//     } catch (error) {
//       console.error('Error updating movie:', error);
//       alert('Failed to update movie.');
//     }
//   };

//   // Function to handle deleting a movie
//   const handleDeleteMovie = async (movieId: number) => {
//     const confirmDelete = window.confirm('Are you sure you want to delete this movie?');

//     if (confirmDelete) {
//       try {
//         // const response = await axios.delete(
//         //   `${import.meta.env.VITE_API_URL}/movies/delete/${movieId}`,
//         //   {
//         //     headers: {
//         //       Authorization: `Bearer ${localStorage.getItem('authToken')}`,
//         //     },
//         //   }
//         // );
//         const response = await axiosInstance.delete(`/movies/delete/${movieId}`);

//         if (response.status === 200) {
//           alert('Movie deleted successfully');
//           setAllMovies(allmovies.filter(movie => movie.MovieId !== movieId));
//         }
//       } catch (error) {
//         console.error('Error deleting movie:', error);
//         alert('Failed to delete movie.');
//       }
//     }
//   };

//   return (
//     <div>
//       <button onClick={handleLogout} className="logout-btn">Logout</button>

//       <h2>Personal Movies List</h2>
//       {error && <p className="error-message">{error}</p>}
//       {allmovies.length === 0 ? (
//         <p>No movies found</p>
//       ) : (
//         <table className="movie-table">
//           <thead>
//             <tr>
//               <th>Title</th>
//               <th>Description</th>
//               <th>Genre</th>
//               <th>Release Date</th>
//               <th>Rating</th>
//               <th>Status</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {allmovies.map((movie) => (
//               <tr key={movie.MovieId}>
//                 <td>{movie.Title}</td>
//                 <td>{movie.Description}</td>
//                 <td>{movie.Genre}</td>
//                 <td>{movie.ReleaseDate}</td>
//                 <td>{movie.Rating}</td>
//                 <td>{movie.Status}</td>
//                 <td>
//                  <div className="button-container">
//                    <button 
//                     onClick={() => {
//                       setSelectedMovie(movie);
//                       setUpdatedRating(movie.Rating);
//                       setUpdatedStatus(movie.Status);
//                    }}
//                   >
//                   Update
//                  </button>
//                    <button onClick={() => handleDeleteMovie(movie.MovieId)}>
//                   Delete
//                  </button>
//                </div>
//                </td>

//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}

//       {selectedMovie && (
//         <Dialog open={true} onClose={() => setSelectedMovie(null)}>
//           <DialogTitle>Update Movie</DialogTitle>
//           <DialogContent>
//             <div>

//               <TextField
//                 label="Rating"
//                 name="rating"
//                 type="number"
//                 fullWidth
//                 value={updatedRating}
//                 onChange={(e) => setUpdatedRating(Math.min(5, Number(e.target.value)))}
//                 margin="normal"
//                 inputProps={{ max: 5, min: 0 }} // Ensure max is 5, and rating can't go below 0
//                />
//               <Select
//               label="Status"
//               value={updatedStatus}
//               onChange={(e) => setUpdatedStatus(e.target.value as MovieStatus)} // Cast the value to MovieStatus enum
//               fullWidth
//             >
//               {/* below will loop in all enum and generate value in drop down :_*/}
//               {Object.values(MovieStatus).map((status) => (
//                 <MenuItem key={status} value={status}>
//                   {status}
//                 </MenuItem>
//               ))}
//             </Select>
//             </div>
//             <DialogActions>
//               <Button onClick={() => setSelectedMovie(null)} color="primary">Cancel</Button>
//               <Button onClick={() => handleUpdateMovie(selectedMovie.MovieId)} color="primary">Update</Button>
//             </DialogActions>
//           </DialogContent>
//         </Dialog>
//       )}

//       <div className="flex">
//         <button onClick={handleDialogRoute} className="bg-blue-500 text-white">
//           Add Movies
//         </button>
//         <button onClick={exportToExcel} className="bg-green-500 text-white">
//           Export to Excel
//         </button>
//       </div>
//     </div>
//   );
// };

// export default TaskList;



// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchTasks } from '../store/actions';
// import { RootState, AppDispatch } from '../store';
// import axios from 'axios';
// import { clearUser } from '../store/userSlice';
// import * as XLSX from 'xlsx';
// import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, Select, MenuItem } from '@mui/material';
// import './componentall.css';
// import { useNavigate } from 'react-router-dom';
// import axiosInstance from '../types/axiosInstance';

// // Star Rating Component
// interface StarRatingProps {
//   rating: number;
//   onRatingChange?: (rating: number) => void;
//   editable?: boolean;
// }

// const StarRating = ({ rating, onRatingChange, editable = false }: StarRatingProps) => {
//   const [hoverRating, setHoverRating] = useState(0);

//   return (
//     <div className="star-rating">
//       {[1, 2, 3, 4, 5].map((star) => (
//         <span
//           key={star}
//           className={`star ${(hoverRating || rating) >= star ? 'filled' : ''} ${editable ? 'editable' : ''}`}
//           onClick={() => editable && onRatingChange && onRatingChange(star)}
//           onMouseEnter={() => editable && setHoverRating(star)}
//           onMouseLeave={() => editable && setHoverRating(0)}
//         >
//           ⭐
//         </span>
//       ))}
//     </div>
//   );
// };

// const TaskList = () => {
//   const dispatch = useDispatch<AppDispatch>();
//   const tasks = useSelector((state: RootState) => state.tasks);
//   const history = useNavigate();
//   const loading = useSelector((state: RootState) => state.loading);
//   const token = useSelector((state: RootState) => state.user.token);

//   const [allmovies, setAllMovies] = useState<any[]>([]);
//   const [error, setError] = useState<string>('');
//   const [selectedMovie, setSelectedMovie] = useState<any>(null);
//   const [updatedRating, setUpdatedRating] = useState<number>(0);
//   const [updatedStatus, setUpdatedStatus] = useState<string>('');

//   enum MovieStatus {
//     To_Watch = 'To-Watch',
//     Already_seen = 'Already Seen',
//   }

//   useEffect(() => {
//     const fetchMovies = async () => {
//       try {
//         if (!token) {
//           console.error('No auth token found');
//           setError('You need to log in again.');
//           return;
//         }

//         const response = await axiosInstance.get('/allmovies');

//         if (response.data && response.data.personal_movies) {
//           setAllMovies(response.data.personal_movies);
//         } else if (response.data && response.data.allmovies) {
//           setAllMovies(response.data.allmovies);
//         } else {
//           setError('No movies found or invalid data returned.');
//         }
//       } catch (error) {
//         console.error('Error fetching movies:', error);
//         setError('Error fetching movies, please try again later.');
//       }
//     };

//     fetchMovies();
//   }, [dispatch]);

//   const handleLogout = () => {
//     localStorage.removeItem('authToken');
//     history('/');
//   };

//   const handleDialogRoute = () => {
//     history('/allmoviestoaddbyuser');
//   };

//   const exportToExcel = () => {
//     const ws = XLSX.utils.json_to_sheet(allmovies);
//     const wb = { Sheets: { 'Movies': ws }, SheetNames: ['Movies'] };
//     const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });

//     const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
//     const data = new Blob([excelBuffer], { type: EXCEL_TYPE });
//     const url = window.URL.createObjectURL(data);
//     const link = document.createElement('a');
//     link.href = url;
//     link.download = 'Movies.xlsx';
//     link.click();
//   };

//   const handleUpdateMovie = async (movieId: number) => {
//     try {
//       const response = await axiosInstance.put(
//         `/movies/update/${movieId}`,
//         { status: updatedStatus, rating: updatedRating }
//       );      
//       if (response.status === 200) {
//         alert('Movie updated successfully');
//         setAllMovies(allmovies.map((movie) =>
//           movie.MovieId === movieId ? { ...movie, Status: updatedStatus, Rating: updatedRating } : movie
//         ));
//         setSelectedMovie(null);
//       }
//     } catch (error) {
//       console.error('Error updating movie:', error);
//       alert('Failed to update movie.');
//     }
//   };

//   const handleDeleteMovie = async (movieId: number) => {
//     const confirmDelete = window.confirm('Are you sure you want to delete this movie?');

//     if (confirmDelete) {
//       try {
//         const response = await axiosInstance.delete(`/movies/delete/${movieId}`);

//         if (response.status === 200) {
//           alert('Movie deleted successfully');
//           setAllMovies(allmovies.filter(movie => movie.MovieId !== movieId));
//         }
//       } catch (error) {
//         console.error('Error deleting movie:', error);
//         alert('Failed to delete movie.');
//       }
//     }
//   };

//   return (
//     <div className="task-list-container">
//       <button onClick={handleLogout} className="logout-btn">Logout</button>

//       <h2>Personal Movies List</h2>
//       {error && <p className="error-message">{error}</p>}
//       {allmovies.length === 0 ? (
//         <p>No movies found</p>
//       ) : (
//         <table className="movie-table">
//           <thead>
//             <tr>
//               <th>Title</th>
//               <th>Description</th>
//               <th>Genre</th>
//               <th>Release Date</th>
//               <th>Rating</th>
//               <th>Status</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {allmovies.map((movie) => (
//               <tr key={movie.MovieId}>
//                 <td>{movie.Title}</td>
//                 <td>{movie.Description}</td>
//                 <td>{movie.Genre}</td>
//                 <td>{movie.ReleaseDate}</td>
//                 <td>
//                   <StarRating rating={Number(movie.Rating)} />
//                 </td>
//                 <td>{movie.Status}</td>
//                 <td>
//                   <div className="button-container">
//                     <button 
//                       onClick={() => {
//                         setSelectedMovie(movie);
//                         setUpdatedRating(Number(movie.Rating));
//                         setUpdatedStatus(movie.Status);
//                       }}
//                     >
//                       Update
//                     </button>
//                     <button onClick={() => handleDeleteMovie(movie.MovieId)}>
//                       Delete
//                     </button>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}

//       {selectedMovie && (
//         <Dialog open={true} onClose={() => setSelectedMovie(null)}>
//           <DialogTitle>Update Movie</DialogTitle>
//           <DialogContent>
//             <div className="dialog-content">
//               <p>Rating:</p>
//               <StarRating 
//                 rating={updatedRating} 
//                 onRatingChange={(rating) => setUpdatedRating(rating)}
//                 editable
//               />
              
//               <Select
//                 label="Status"
//                 value={updatedStatus}
//                 onChange={(e) => setUpdatedStatus(e.target.value as MovieStatus)}
//                 fullWidth
//                 style={{ marginTop: '20px' }}
//               >
//                 {Object.values(MovieStatus).map((status) => (
//                   <MenuItem key={status} value={status}>
//                     {status}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </div>
//             <DialogActions>
//               <Button onClick={() => setSelectedMovie(null)} color="primary">Cancel</Button>
//               <Button onClick={() => handleUpdateMovie(selectedMovie.MovieId)} color="primary">Update</Button>
//             </DialogActions>
//           </DialogContent>
//         </Dialog>
//       )}

//       <div className="action-buttons">
//         <button onClick={handleDialogRoute} className="add-movie-btn">
//           Add Movies
//         </button>
//         <button onClick={exportToExcel} className="export-btn">
//           Export to Excel
//         </button>
//       </div>
//     </div>
//   );
// };

// export default TaskList;





import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks } from '../store/actions';
import { RootState, AppDispatch } from '../store';
import axios from 'axios';
import { clearUser } from '../store/userSlice';
import * as XLSX from 'xlsx';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, Select, MenuItem } from '@mui/material';
import './componentall.css';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../types/axiosInstance';

// Enhanced Star Rating Component
interface StarRatingProps {
  rating: number;
  onRatingChange?: (rating: number) => void;
  editable?: boolean;
  size?: number;
}

const StarRating = ({ rating, onRatingChange, editable = false, size = 24 }: StarRatingProps) => {
  const [hoverRating, setHoverRating] = useState(0);
  const [displayRating, setDisplayRating] = useState(rating);

  useEffect(() => {
    setDisplayRating(rating);
  }, [rating]);

  const handleMouseEnter = (star: number) => {
    if (editable) {
      setHoverRating(star);
    }
  };

  const handleMouseLeave = () => {
    if (editable) {
      setHoverRating(0);
    }
  };

  const handleClick = (star: number) => {
    if (editable && onRatingChange) {
      onRatingChange(star);
      setDisplayRating(star);
    }
  };

  return (
    <div className="star-rating" style={{ fontSize: `${size}px` }}>
      {[1, 2, 3, 4, 5].map((star) => {
        const isFilled = (hoverRating || displayRating) >= star;
        return (
          <span
            key={star}
            className={`star ${isFilled ? 'filled' : 'empty'} ${editable ? 'editable' : ''}`}
            onClick={() => handleClick(star)}
            onMouseEnter={() => handleMouseEnter(star)}
            onMouseLeave={handleMouseLeave}
            style={{ cursor: editable ? 'pointer' : 'default' }}
          >
            {isFilled ? '★' : '☆'}
          </span>
        );
      })}
    </div>
  );
};

const TaskList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const tasks = useSelector((state: RootState) => state.tasks);
  const history = useNavigate();
  const loading = useSelector((state: RootState) => state.loading);
  const token = useSelector((state: RootState) => state.user.token);

  const [allmovies, setAllMovies] = useState<any[]>([]);
  const [error, setError] = useState<string>('');
  const [selectedMovie, setSelectedMovie] = useState<any>(null);
  const [updatedRating, setUpdatedRating] = useState<number>(0);
  const [updatedStatus, setUpdatedStatus] = useState<string>('');

  enum MovieStatus {
    To_Watch = 'To-Watch',
    Already_seen = 'Already Seen',
  }

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        if (!token) {
          console.error('No auth token found');
          setError('You need to log in again.');
          return;
        }

        const response = await axiosInstance.get('/allmovies');

        if (response.data && response.data.personal_movies) {
          setAllMovies(response.data.personal_movies);
        } else if (response.data && response.data.allmovies) {
          setAllMovies(response.data.allmovies);
        } else {
          setError('No movies found or invalid data returned.');
        }
      } catch (error) {
        console.error('Error fetching movies:', error);
        setError('Error fetching movies, please try again later.');
      }
    };

    fetchMovies();
  }, [dispatch]);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    history('/');
  };

  const handleDialogRoute = () => {
    history('/allmoviestoaddbyuser');
  };

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(allmovies);
    const wb = { Sheets: { 'Movies': ws }, SheetNames: ['Movies'] };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });

    const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
    const data = new Blob([excelBuffer], { type: EXCEL_TYPE });
    const url = window.URL.createObjectURL(data);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Movies.xlsx';
    link.click();
  };

  const handleUpdateMovie = async (movieId: number) => {
    try {
      const response = await axiosInstance.put(
        `/movies/update/${movieId}`,
        { status: updatedStatus, rating: updatedRating }
      );      
      if (response.status === 200) {
        alert('Movie updated successfully');
        setAllMovies(allmovies.map((movie) =>
          movie.MovieId === movieId ? { ...movie, Status: updatedStatus, Rating: updatedRating } : movie
        ));
        setSelectedMovie(null);
      }
    } catch (error) {
      console.error('Error updating movie:', error);
      alert('Failed to update movie.');
    }
  };

  const handleDeleteMovie = async (movieId: number) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this movie?');

    if (confirmDelete) {
      try {
        const response = await axiosInstance.delete(`/movies/delete/${movieId}`);

        if (response.status === 200) {
          alert('Movie deleted successfully');
          setAllMovies(allmovies.filter(movie => movie.MovieId !== movieId));
        }
      } catch (error) {
        console.error('Error deleting movie:', error);
        alert('Failed to delete movie.');
      }
    }
  };

  return (
    <div className="task-list-container">
      <button onClick={handleLogout} className="logout-btn">Logout</button>

      <h2>Personal Movies List</h2>
      {error && <p className="error-message">{error}</p>}
      {allmovies.length === 0 ? (
        <p>No movies found</p>
      ) : (
        <table className="movie-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Genre</th>
              <th>Release Date</th>
              <th>Rating</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {allmovies.map((movie) => (
              <tr key={movie.MovieId}>
                <td>{movie.Title}</td>
                <td>{movie.Description}</td>
                <td>{movie.Genre}</td>
                <td>{movie.ReleaseDate}</td>
                <td>
                  <div className="rating-display">
                    <StarRating rating={Number(movie.Rating)} size={20} />
                    <span className="rating-value">{movie.Rating}</span>
                  </div>
                </td>
                <td>{movie.Status}</td>
                <td>
                  <div className="button-container">
                    <button 
                      onClick={() => {
                        setSelectedMovie(movie);
                        setUpdatedRating(Number(movie.Rating));
                        setUpdatedStatus(movie.Status);
                      }}
                    >
                      Update
                    </button>
                    <button onClick={() => handleDeleteMovie(movie.MovieId)}>
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {selectedMovie && (
        <Dialog open={true} onClose={() => setSelectedMovie(null)}>
          <DialogTitle>Update Movie: {selectedMovie.Title}</DialogTitle>
          <DialogContent>
            <div className="dialog-content">
              <div className="rating-selector">
                <p>Rating:</p>
                <StarRating 
                  rating={updatedRating} 
                  onRatingChange={(rating) => setUpdatedRating(rating)}
                  editable
                  size={32}
                />
                <div className="rating-selected-value">
                  Selected: {updatedRating} star{updatedRating !== 1 ? 's' : ''}
                </div>
              </div>
              
              <Select
                label="Status"
                value={updatedStatus}
                onChange={(e) => setUpdatedStatus(e.target.value as MovieStatus)}
                fullWidth
                style={{ marginTop: '20px' }}
              >
                {Object.values(MovieStatus).map((status) => (
                  <MenuItem key={status} value={status}>
                    {status}
                  </MenuItem>
                ))}
              </Select>
            </div>
            <DialogActions>
              <Button onClick={() => setSelectedMovie(null)} color="primary">Cancel</Button>
              <Button onClick={() => handleUpdateMovie(selectedMovie.MovieId)} color="primary">Update</Button>
            </DialogActions>
          </DialogContent>
        </Dialog>
      )}

      <div className="action-buttons">
        <button onClick={handleDialogRoute} className="add-movie-btn">
          Add Movies
        </button>
        <button onClick={exportToExcel} className="export-btn">
          Export to Excel
        </button>
      </div>
    </div>
  );
};

export default TaskList;