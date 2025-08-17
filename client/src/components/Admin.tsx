// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { clearUser } from '../store/userSlice';
// import axios from 'axios';
// import * as XLSX from 'xlsx';
// import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
// import { RootState, AppDispatch } from '../store';
// import './componentall.css';

// const Admin = () => {
//   const dispatch = useDispatch<AppDispatch>();
//   const token = useSelector((state: RootState) => state.user.token); // Get token from Redux store
//   const history = useNavigate();
  
//   const [allmovies, setAllMovies] = useState<any[]>([]); // State to hold movies
//   const [error, setError] = useState<string>(''); // State to hold error message
//   const [openDialog, setOpenDialog] = useState(false);
//   const [newMovie, setNewMovie] = useState({
//     title: '',
//     description: '',
//     genre: '',
//     releaseDate: '',
//   });

//   // Fetch movies from the API
//   useEffect(() => {
//     const fetchMovies = async () => {
//       if (!token) {
//         setError('You need to log in again.');
//         return;
//       }

//       try {
//         const response = await axios.get(`${import.meta.env.VITE_API_URL}/allmovies`, {
//           headers: {
//             Authorization: `Bearer ${token}`, // Use token from Redux
//           },
//         });

//         if (response.data?.personal_movies) {
//           setAllMovies(response.data.personal_movies);
//         } else if (response.data?.allmovies) {
//           setAllMovies(response.data.allmovies);
//         } else {
//           setError('No movies found or invalid data returned.');
//         }
//       } catch (error) {
//         setError('Error fetching movies, please try again later.');
//       }
//     };

//     fetchMovies();
//   }, [token]);

//   // Handle logout
//   const handleLogout = () => {
//     // dispatch(clearUser()); // Clear token from Redux store
//     history('/'); // Redirect to login page
//   };

//   // Open the movie dialog for adding a new movie
//   const handleDialogOpen = () => {
//     setOpenDialog(true);
//   };

//   // Close the movie dialog
//   const handleDialogClose = () => {
//     setOpenDialog(false);
//     setNewMovie({
//       title: '',
//       description: '',
//       genre: '',
//       releaseDate: '',
//     });
//   };

//   // Handle form input changes for new movie
//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setNewMovie((prev) => ({ ...prev, [name]: value }));
//   };

//   // Handle submitting new movie
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!token) {
//       setError('You need to log in again.');
//       return;
//     }

//     const movieData = {
//       title: newMovie.title,
//       description: newMovie.description,
//       genre: newMovie.genre,
//       releaseDate: newMovie.releaseDate,
//     };

//     try {
//       const response = await axios.post(`${import.meta.env.VITE_API_URL}/movies`, movieData, {
//         headers: {
//           Authorization: `Bearer ${token}`, // Use token from Redux
//         },
//       });

//       if (response.status === 201) {
//         const updatedMovies = await axios.get(`${import.meta.env.VITE_API_URL}/allmovies`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         setAllMovies(updatedMovies.data.personal_movies);
//         handleDialogClose();
//       } else {
//         setError('Failed to add movie.');
//       }
//     } catch (error) {
//       setError('Error submitting movie: ' + (error instanceof Error ? error.message : 'Unknown error'));
//     }
//   };

//   // Export movies to Excel
//   const exportToExcel = () => {
//     const ws = XLSX.utils.json_to_sheet(allmovies);
//     const wb = { Sheets: { 'Movies': ws }, SheetNames: ['Movies'] };
//     const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });

//     const data = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
//     const url = window.URL.createObjectURL(data);
//     const link = document.createElement('a');
//     link.href = url;
//     link.download = 'Movies.xlsx';
//     link.click();
//   };

//   return (
//     <div>
//       <button onClick={handleLogout} className="logout-btn">Logout</button>

//       <h2>Movies List</h2>
//       {error && <p className="error-message">{error}</p>}
//       {allmovies?.length === 0 ? (
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
//             </tr>
//           </thead>
//           <tbody>
//             {allmovies?.map((movie) => (
//               <tr key={movie.MovieId}>
//                 <td>{movie.Title}</td>
//                 <td>{movie.Description}</td>
//                 <td>{movie.Genre}</td>
//                 <td>{movie.ReleaseDate}</td>
//                 <td>{movie.Rating}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}

//       <div className="flex">
//         <button onClick={handleDialogOpen} className="bg-blue-500 text-white">
//           Add a Movie
//         </button>
//         <button onClick={exportToExcel} className="bg-green-500 text-white">
//           Export to Excel
//         </button>
//       </div>

//       <Dialog open={openDialog} onClose={handleDialogClose}>
//         <DialogTitle>Add a New Movie</DialogTitle>
//         <DialogContent>
//           <form onSubmit={handleSubmit}>
//             <TextField label="Title" name="title" fullWidth value={newMovie.title} onChange={handleChange} margin="normal" />
//             <TextField label="Description" name="description" fullWidth value={newMovie.description} onChange={handleChange} margin="normal" />
//             <TextField label="Genre" name="genre" fullWidth value={newMovie.genre} onChange={handleChange} margin="normal" />
//             <TextField label="Release Date" name="releaseDate" fullWidth value={newMovie.releaseDate} onChange={handleChange} margin="normal" />
//             <DialogActions>
//               <Button onClick={handleDialogClose} color="primary">Cancel</Button>
//               <Button type="submit" color="primary">Submit</Button>
//             </DialogActions>
//           </form>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// };

// export default Admin;





// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { clearUser } from '../store/userSlice';
// import axios from 'axios';
// import * as XLSX from 'xlsx';
// import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
// import { RootState, AppDispatch } from '../store';
// import './componentall.css';

// const Admin = () => {
//   const dispatch = useDispatch<AppDispatch>();
//   const token = useSelector((state: RootState) => state.user.token); // Get token from Redux store
//   const history = useNavigate();
  
//   const [allmovies, setAllMovies] = useState<any[]>([]); // State to hold movies
//   const [error, setError] = useState<string>(''); // State to hold error message
//   const [openDialog, setOpenDialog] = useState(false);
//    const [fetching, setFetching] = useState<boolean>(true); // Boolean variable to track fetching state
//   const [newMovie, setNewMovie] = useState({
//     title: '',
//     description: '',
//     genre: '',
//     releaseDate: '',
//   });

//   // Fetch movies from the API
// const fetchMovies = async () => {
//       if (!token) {
//         setError('You need to log in again.');
//         return;
//       }

//       try {
//         const response = await axios.get(`${import.meta.env.VITE_API_URL}/allmovies`, {
//           headers: {
//             Authorization: `Bearer ${token}`, // Use token from Redux
//           },
//         });

//         if (response.data?.personal_movies) {
//           setAllMovies(response.data.personal_movies);
//         } else if (response.data?.allmovies) {
//           setAllMovies(response.data.allmovies);
//         } else {
//           setError('No movies found or invalid data returned.');
//         }
//       } catch (error) {
//         setError('Error fetching movies, please try again later.');
//       }finally {
//         setFetching(false);  // Set fetching to false after data fetch completes
//       }
//     };


//       // Trigger fetching on component mount and when fetching is true
//       useEffect(() => {
//         if (fetching) {
//           fetchMovies();
//         }
//       }, [fetching]); // This useEffect depends on 'fetching'

//   // Handle logout
//   const handleLogout = () => {
//     // dispatch(clearUser()); // Clear token from Redux store
//     history('/'); // Redirect to login page
//   };

//   // Open the movie dialog for adding a new movie
//   const handleDialogOpen = () => {
//     setOpenDialog(true);
//   };

//   // Close the movie dialog
//   const handleDialogClose = () => {
//     setOpenDialog(false);
//     setNewMovie({
//       title: '',
//       description: '',
//       genre: '',
//       releaseDate: '',
//     });
//   };

//   // Handle form input changes for new movie
//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setNewMovie((prev) => ({ ...prev, [name]: value }));
//   };

//   // Handle submitting new movie
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!token) {
//       setError('You need to log in again.');
//       return;
//     }

//     const movieData = {
//       title: newMovie.title,
//       description: newMovie.description,
//       genre: newMovie.genre,
//       releaseDate: newMovie.releaseDate,
//     };

//     try {
//       const response = await axios.post(`${import.meta.env.VITE_API_URL}/movies`, movieData, {
//         headers: {
//           Authorization: `Bearer ${token}`, // Use token from Redux
//         },
//       });

//       if (response.status === 201) {
//         setFetching(true); // Trigger the fetching again after adding to personal list
//         const updatedMovies = await axios.get(`${import.meta.env.VITE_API_URL}/allmovies`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         setAllMovies(updatedMovies.data.personal_movies);
//         handleDialogClose();
//       } else {
//         setError('Failed to add movie.');
//       }
//     } catch (error) {
//       setError('Error submitting movie: ' + (error instanceof Error ? error.message : 'Unknown error'));
//     }
//   };

//   // Export movies to Excel
//   const exportToExcel = () => {
//     const ws = XLSX.utils.json_to_sheet(allmovies);
//     const wb = { Sheets: { 'Movies': ws }, SheetNames: ['Movies'] };
//     const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });

//     const data = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
//     const url = window.URL.createObjectURL(data);
//     const link = document.createElement('a');
//     link.href = url;
//     link.download = 'Movies.xlsx';
//     link.click();
//   };

//   return (
//     <div>
//       <button onClick={handleLogout} className="logout-btn">Logout</button>

//       <h2>Movies List</h2>
//       {error && <p className="error-message">{error}</p>}
//       {allmovies?.length === 0 ? (
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
//             </tr>
//           </thead>
//           <tbody>
//             {allmovies?.map((movie) => (
//               <tr key={movie.MovieId}>
//                 <td>{movie.Title}</td>
//                 <td>{movie.Description}</td>
//                 <td>{movie.Genre}</td>
//                 <td>{movie.ReleaseDate}</td>
//                 <td>{movie.Rating}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}

//       <div className="flex">
//         <button onClick={handleDialogOpen} className="bg-blue-500 text-white">
//           Add a Movie
//         </button>
//         <button onClick={exportToExcel} className="bg-green-500 text-white">
//           Export to Excel
//         </button>
//       </div>

//       <Dialog open={openDialog} onClose={handleDialogClose}>
//         <DialogTitle>Add a New Movie</DialogTitle>
//         <DialogContent>
//           <form onSubmit={handleSubmit}>
//             <TextField label="Title" name="title" fullWidth value={newMovie.title} onChange={handleChange} margin="normal" />
//             <TextField label="Description" name="description" fullWidth value={newMovie.description} onChange={handleChange} margin="normal" />
//             <TextField label="Genre" name="genre" fullWidth value={newMovie.genre} onChange={handleChange} margin="normal" />
//             <TextField label="Release Date" name="releaseDate" fullWidth value={newMovie.releaseDate} onChange={handleChange} margin="normal" />
//             <DialogActions>
//               <Button onClick={handleDialogClose} color="primary">Cancel</Button>
//               <Button type="submit" color="primary">Submit</Button>
//             </DialogActions>
//           </form>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// };

// export default Admin;




// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { clearUser } from '../store/userSlice';
// import axios from 'axios';
// import * as XLSX from 'xlsx';
// import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
// import { RootState, AppDispatch } from '../store';
// import './componentall.css';

// const Admin = () => {
//   const dispatch = useDispatch<AppDispatch>();
//   const token = useSelector((state: RootState) => state.user.token); // Get token from Redux store
//   const history = useNavigate();
  
//   const [allmovies, setAllMovies] = useState<any[]>([]); // State to hold movies
//   const [error, setError] = useState<string>(''); // State to hold error message
//   const [openDialog, setOpenDialog] = useState(false);
//   const [fetching, setFetching] = useState<boolean>(true); // Boolean variable to track fetching state
//   const [newMovie, setNewMovie] = useState({
//     title: '',
//     description: '',
//     genre: '',
//     releaseDate: '',
//   });

//   // Fetch movies from the API
//   const fetchMovies = async () => {
//     if (!token) {
//       setError('You need to log in again.');
//       return;
//     }

//     try {
//       const response = await axios.get(`${import.meta.env.VITE_API_URL}/movies/with_avg_rating`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (response.data?.movies) {
//         setAllMovies(response.data.movies); // Set movies with average ratings
//       } else {
//         setError('No movies found or invalid data returned.');
//       }
//     } catch (error) {
//       setError('Error fetching movies, please try again later.');
//     } finally {
//       setFetching(false);  // Set fetching to false after data fetch completes
//     }
//   };

//   // Trigger fetching on component mount and when fetching is true
//   useEffect(() => {
//     if (fetching) {
//       fetchMovies();
//     }
//   }, [fetching]); // This useEffect depends on 'fetching'

//   // Handle logout
//   const handleLogout = () => {
//     // dispatch(clearUser()); // Clear token from Redux store
//     history('/'); // Redirect to login page
//   };

//   // Open the movie dialog for adding a new movie
//   const handleDialogOpen = () => {
//     setOpenDialog(true);
//   };

//   // Close the movie dialog
//   const handleDialogClose = () => {
//     setOpenDialog(false);
//     setNewMovie({
//       title: '',
//       description: '',
//       genre: '',
//       releaseDate: '',
//     });
//   };

//   // Handle form input changes for new movie
//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setNewMovie((prev) => ({ ...prev, [name]: value }));
//   };

//   // Handle submitting new movie
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!token) {
//       setError('You need to log in again.');
//       return;
//     }

//     const movieData = {
//       title: newMovie.title,
//       description: newMovie.description,
//       genre: newMovie.genre,
//       releaseDate: newMovie.releaseDate,
//     };

//     try {
//       const response = await axios.post(`${import.meta.env.VITE_API_URL}/movies`, movieData, {
//         headers: {
//           Authorization: `Bearer ${token}`, // Use token from Redux
//         },
//       });

//       if (response.status === 201) {
//         setFetching(true); // Trigger the fetching again after adding to personal list
//         const updatedMovies = await axios.get(`${import.meta.env.VITE_API_URL}/movies/with_avg_rating`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         setAllMovies(updatedMovies.data.movies);
//         handleDialogClose();
//       } else {
//         setError('Failed to add movie.');
//       }
//     } catch (error) {
//       setError('Error submitting movie: ' + (error instanceof Error ? error.message : 'Unknown error'));
//     }
//   };

//   // Export movies to Excel
//   const exportToExcel = () => {
//     const ws = XLSX.utils.json_to_sheet(allmovies);
//     const wb = { Sheets: { 'Movies': ws }, SheetNames: ['Movies'] };
//     const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });

//     const data = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
//     const url = window.URL.createObjectURL(data);
//     const link = document.createElement('a');
//     link.href = url;
//     link.download = 'Movies.xlsx';
//     link.click();
//   };

//   return (
//     <div>
//       <button onClick={handleLogout} className="logout-btn">Logout</button>

//       <h2>Movies List</h2>
//       {error && <p className="error-message">{error}</p>}
//       {allmovies?.length === 0 ? (
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
//             </tr>
//           </thead>
//           <tbody>
//             {allmovies?.map((movie) => (
//               <tr key={movie.MovieId}>
//                 <td>{movie.Title}</td>
//                 <td>{movie.Description}</td>
//                 <td>{movie.Genre}</td>
//                 <td>{movie.ReleaseDate}</td>
//                 <td>{movie.AverageRating !== undefined && movie.AverageRating !== null ? movie.AverageRating : 0}</td>{/* Display Average Rating */}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}

//       <div className="flex">
//         <button onClick={handleDialogOpen} className="bg-blue-500 text-white">
//           Add a Movie
//         </button>
//         <button onClick={exportToExcel} className="bg-green-500 text-white">
//           Export to Excel
//         </button>
//       </div>

//       <Dialog open={openDialog} onClose={handleDialogClose}>
//         <DialogTitle>Add a New Movie</DialogTitle>
//         <DialogContent>
//           <form onSubmit={handleSubmit}>
//             <TextField label="Title" name="title" fullWidth value={newMovie.title} onChange={handleChange} margin="normal" />
//             <TextField label="Description" name="description" fullWidth value={newMovie.description} onChange={handleChange} margin="normal" />
//             <TextField label="Genre" name="genre" fullWidth value={newMovie.genre} onChange={handleChange} margin="normal" />
//             <TextField label="Release Date" name="releaseDate" fullWidth value={newMovie.releaseDate} onChange={handleChange} margin="normal" />
//             <DialogActions>
//               <Button onClick={handleDialogClose} color="primary">Cancel</Button>
//               <Button type="submit" color="primary">Submit</Button>
//             </DialogActions>
//           </form>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// };

// export default Admin;


import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearUser } from '../store/userSlice';
import axios from 'axios';
import * as XLSX from 'xlsx';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { RootState, AppDispatch } from '../store';
import './componentall.css';

// Star Rating Component
interface StarRatingProps {
  rating: number;
  size?: number;
}

const StarRating = ({ rating, size = 20 }: StarRatingProps) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="star-rating" style={{ fontSize: `${size}px` }}>
      {[...Array(fullStars)].map((_, i) => (
        <span key={`full-${i}`} className="star filled">★</span>
      ))}
      {hasHalfStar && <span className="star half">★</span>}
      {[...Array(emptyStars)].map((_, i) => (
        <span key={`empty-${i}`} className="star empty">☆</span>
      ))}
      <span className="rating-value">({rating.toFixed(1)})</span>
    </div>
  );
};

const Admin = () => {
  const dispatch = useDispatch<AppDispatch>();
  const token = useSelector((state: RootState) => state.user.token);
  const history = useNavigate();
  
  const [allmovies, setAllMovies] = useState<any[]>([]);
  const [error, setError] = useState<string>('');
  const [openDialog, setOpenDialog] = useState(false);
  const [fetching, setFetching] = useState<boolean>(true);
  const [newMovie, setNewMovie] = useState({
    title: '',
    description: '',
    genre: '',
    releaseDate: '',
  });

  const fetchMovies = async () => {
    if (!token) {
      setError('You need to log in again.');
      return;
    }

    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/movies/with_avg_rating`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data?.movies) {
        setAllMovies(response.data.movies.map((movie: any) => ({
          ...movie,
          AverageRating: movie.AverageRating !== undefined && movie.AverageRating !== null ? 
                       parseFloat(movie.AverageRating) : 0
        })));
      } else {
        setError('No movies found or invalid data returned.');
      }
    } catch (error) {
      setError('Error fetching movies, please try again later.');
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    if (fetching) {
      fetchMovies();
    }
  }, [fetching]);

  const handleLogout = () => {
    history('/');
  };

  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setNewMovie({
      title: '',
      description: '',
      genre: '',
      releaseDate: '',
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewMovie((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token) {
      setError('You need to log in again.');
      return;
    }

    const movieData = {
      title: newMovie.title,
      description: newMovie.description,
      genre: newMovie.genre,
      releaseDate: newMovie.releaseDate,
    };

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/movies`, movieData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 201) {
        setFetching(true);
        const updatedMovies = await axios.get(`${import.meta.env.VITE_API_URL}/movies/with_avg_rating`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAllMovies(updatedMovies.data.movies);
        handleDialogClose();
      } else {
        setError('Failed to add movie.');
      }
    } catch (error) {
      setError('Error submitting movie: ' + (error instanceof Error ? error.message : 'Unknown error'));
    }
  };

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(allmovies);
    const wb = { Sheets: { 'Movies': ws }, SheetNames: ['Movies'] };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });

    const data = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const url = window.URL.createObjectURL(data);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Movies.xlsx';
    link.click();
  };

  return (
    <div className="admin-container">
      <button onClick={handleLogout} className="logout-btn">Logout</button>

      <h2>Movies List</h2>
      {error && <p className="error-message">{error}</p>}
      {allmovies?.length === 0 ? (
        <p>No movies found</p>
      ) : (
        <table className="movie-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Genre</th>
              <th>Release Date</th>
              <th>Average Rating</th>
            </tr>
          </thead>
          <tbody>
            {allmovies?.map((movie) => (
              <tr key={movie.MovieId}>
                <td>{movie.Title}</td>
                <td>{movie.Description}</td>
                <td>{movie.Genre}</td>
                <td>{movie.ReleaseDate}</td>
                <td>
                  <StarRating 
                    rating={movie.AverageRating} 
                    size={18} 
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div className="action-buttons">
        <button onClick={handleDialogOpen} className="add-movie-btn">
          Add a Movie
        </button>
        <button onClick={exportToExcel} className="export-btn">
          Export to Excel
        </button>
      </div>

      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>Add a New Movie</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField label="Title" name="title" fullWidth value={newMovie.title} onChange={handleChange} margin="normal" required />
            <TextField label="Description" name="description" fullWidth value={newMovie.description} onChange={handleChange} margin="normal" required />
            <TextField label="Genre" name="genre" fullWidth value={newMovie.genre} onChange={handleChange} margin="normal" required />
            <TextField 
              label="Release Date" 
              name="releaseDate" 
              fullWidth 
              value={newMovie.releaseDate} 
              onChange={handleChange} 
              margin="normal" 
              type="date"
              InputLabelProps={{ shrink: true }}
              required
            />
            <DialogActions>
              <Button onClick={handleDialogClose} color="primary">Cancel</Button>
              <Button type="submit" color="primary">Submit</Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Admin;

