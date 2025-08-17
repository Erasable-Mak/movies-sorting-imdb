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

// const AllMoviesToAddByUser = () => {
//   const dispatch = useDispatch<AppDispatch>();
//   const history = useNavigate();
//   const loading = useSelector((state: RootState) => state.loading);

//   const [allmovies, setAllMovies] = useState<any[]>([]);  // State to hold movies
//   const [error, setError] = useState<string>('');  // State to hold error message
//   const [selectedMovies, setSelectedMovies] = useState<Set<number>>(new Set()); // Track selected movie IDs
//   const [fetching, setFetching] = useState<boolean>(true); // Boolean variable to track fetching state

//   const token = useSelector((state: RootState) => state.user.token); // Get token from Redux store

//   // Function to fetch movies
//   const fetchMovies = async () => {
//     if (!token) {
//       setError('You need to log in again.');
//       return;
//     }

//     try {
//       const url = `${import.meta.env.VITE_API_URL}/allmoviestoaddbyuser`;
//       const response = await axios.get(url, {
//         headers: {
//           Authorization: `Bearer ${token}`,  // Use token from Redux
//         },
//       });

//       if (response.data && response.data.personal_movies) {
//         setAllMovies(response.data.personal_movies); // Display personal movies for User
//       } else if (response.data && response.data.allmovies) {
//         setAllMovies(response.data.allmovies); // Display all movies for Admin
//       } else {
//         setError('No movies found or invalid data returned.');
//       }
//     } catch (error) {
//       console.error('Error fetching movies:', error);
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

//   const handleLogout = () => {
//     // dispatch(clearUser()); // Clear user data from Redux
//     history('/'); // Redirect to login page
//   };

//   const handleCheckboxChange = (movieId: number) => {
//     const updatedSelectedMovies = new Set(selectedMovies);
//     if (updatedSelectedMovies.has(movieId)) {
//       updatedSelectedMovies.delete(movieId);  // Unselect movie if already selected
//     } else {
//       updatedSelectedMovies.add(movieId);  // Select movie
//     }
//     setSelectedMovies(updatedSelectedMovies);
//   };

//   const handleAddToPersonalList = async () => {
//     if (selectedMovies.size === 0) {
//       setError('Please select at least one movie.');
//       return;
//     }

//     const selectedMovieList = allmovies.filter(movie => selectedMovies.has(movie.MovieId));

//     const movieData = selectedMovieList.map(movie => ({
//       MovieID: movie.MovieId,
//       title: movie.Title,
//       description: movie.Description,
//       genre: movie.Genre,
//       releaseDate: movie.ReleaseDate,
//     }));

//     try {
//       if (!token) {
//         console.error('No auth token found');
//         setError('You need to log in again.');
//         return;
//       }

//       console.log('Auth Token:', token);
//       const response = await axios.post(`${import.meta.env.VITE_API_URL}/addmov`, movieData, {
//         headers: {
//           Authorization: `Bearer ${token}`,  // Use token from Redux
//         },
//       });

//       if (response.status === 201) {
//         // Successfully added, now update the movie list
//         setFetching(true); // Trigger the fetching again after adding to personal list
//         setSelectedMovies(new Set()); // Reset selection
//         history('/tasks');
//       } else {
//         setError('Failed to add movies to the personal list.');
//       }
//     } catch (error) {
//       console.error('Error adding movies:', error);
//       setError('Error adding movies, please try again later.');
//     }
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

//   return (
//     <div>
//       <button onClick={handleLogout} className="logout-btn">Logout</button>

//       <h2>Add below Movies from the List to your Personal List</h2>
//       {error && <p className="error-message">{error}</p>}
//       {allmovies?.length === 0 ? (
//         <p>No movies found</p>
//       ) : (
//         <table className="movie-table">
//           <thead>
//             <tr>
//               <th>Select</th>
//               <th>Title</th>
//               <th>Description</th>
//               <th>Genre</th>
//               <th>Release Date</th>
//             </tr>
//           </thead>
//           <tbody>
//             {allmovies?.map((movie) => (
//               <tr key={movie.MovieId}>
//                 <td>
//                   <input 
//                     type="checkbox" 
//                     checked={selectedMovies.has(movie.MovieId)} 
//                     onChange={() => handleCheckboxChange(movie.MovieId)} 
//                   />
//                 </td>
//                 <td>{movie.Title}</td>
//                 <td>{movie.Description}</td>
//                 <td>{movie.Genre}</td>
//                 <td>{movie.ReleaseDate}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}

//       <div className="flex">
//         <button onClick={handleAddToPersonalList} className="bg-blue-500 text-white">
//           Add to Personal List
//         </button>
//         <button onClick={exportToExcel} className="bg-green-500 text-white">
//           Export to Excel
//         </button>
//       </div>
//     </div>
//   );
// };

// export default AllMoviesToAddByUser;




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

// const AllMoviesToAddByUser = () => {
//   const dispatch = useDispatch<AppDispatch>();
//   const history = useNavigate();
//   const loading = useSelector((state: RootState) => state.loading);

//   const [allmovies, setAllMovies] = useState<any[]>([]);  // State to hold movies
//   const [error, setError] = useState<string>('');  // State to hold error message
//   const [selectedMovies, setSelectedMovies] = useState<Set<number>>(new Set()); // Track selected movie IDs
//   const [fetching, setFetching] = useState<boolean>(true); // Boolean variable to track fetching state

//   const token = useSelector((state: RootState) => state.user.token); // Get token from Redux store

//   // Function to fetch movies
//   // const fetchMovies = async () => {
//   //   if (!token) {
//   //     setError('You need to log in again.');
//   //     return;
//   //   }

//   //   try {
//   //     const url = `${import.meta.env.VITE_API_URL}/allmoviestoaddbyuser`;
//   //     const response = await axios.get(url, {
//   //       headers: {
//   //         Authorization: `Bearer ${token}`,  // Use token from Redux
//   //       },
//   //     });

//   //     if (response.data && response.data.personal_movies) {
//   //       setAllMovies(response.data.personal_movies); // Display personal movies for User
//   //     } else if (response.data && response.data.allmovies) {
//   //       setAllMovies(response.data.allmovies); // Display all movies for Admin
//   //     } else {
//   //       setError('No movies found or invalid data returned.');
//   //     }
//   //   } catch (error) {
//   //     console.error('Error fetching movies:', error);
//   //     setError('Error fetching movies, please try again later.');
//   //   } finally {
//   //     setFetching(false);  // Set fetching to false after data fetch completes
//   //   }
//   // };

//   const fetchMovies = async () => {
//     if (!token) {
//       setError('You need to log in again.');
//       return;
//     }

//     try {
//       const response = await axios.get(`${import.meta.env.VITE_API_URL}/allmoviestoaddbyuser`, {
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

//   const handleLogout = () => {
//     // dispatch(clearUser()); // Clear user data from Redux
//     history('/'); // Redirect to login page
//   };

//   const handleCheckboxChange = (movieId: number) => {
//     const updatedSelectedMovies = new Set(selectedMovies);
//     if (updatedSelectedMovies.has(movieId)) {
//       updatedSelectedMovies.delete(movieId);  // Unselect movie if already selected
//     } else {
//       updatedSelectedMovies.add(movieId);  // Select movie
//     }
//     setSelectedMovies(updatedSelectedMovies);
//   };

//   const handleAddToPersonalList = async () => {
//     if (selectedMovies.size === 0) {
//       setError('Please select at least one movie.');
//       return;
//     }

//     const selectedMovieList = allmovies.filter(movie => selectedMovies.has(movie.MovieId));

//     const movieData = selectedMovieList.map(movie => ({
//       MovieID: movie.MovieId,
//       title: movie.Title,
//       description: movie.Description,
//       genre: movie.Genre,
//       releaseDate: movie.ReleaseDate,
//     }));

//     try {
//       if (!token) {
//         console.error('No auth token found');
//         setError('You need to log in again.');
//         return;
//       }

//       // console.log('Auth Token:', token);
//       const response = await axios.post(`${import.meta.env.VITE_API_URL}/addmov`, movieData, {
//         headers: {
//           Authorization: `Bearer ${token}`,  // Use token from Redux
//         },
//       });

//       if (response.status === 201) {
//         // Successfully added, now update the movie list
//         setFetching(true); // Trigger the fetching again after adding to personal list
//         setSelectedMovies(new Set()); // Reset selection
//         history('/tasks');
//       } else {
//         setError('Failed to add movies to the personal list.');
//       }
//     } catch (error) {
//       console.error('Error adding movies:', error);
//       setError('Error adding movies, please try again later.');
//     }
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

//   return (
//     <div>
//       <button onClick={handleLogout} className="logout-btn">Logout</button>

//       <h2>Add below Movies from the List to your Personal List</h2>
//       {error && <p className="error-message">{error}</p>}
//       {allmovies?.length === 0 ? (
//         <p>No movies found</p>
//       ) : (
//         <table className="movie-table">
//           <thead>
//             {/* <tr>
//               <th>Select</th>
//               <th>Title</th>
//               <th>Description</th>
//               <th>Genre</th>
//               <th>Release Date</th>
//             </tr> */}
//             <tr>
//               <th>Select</th>
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
//                 <td>
//                   <input 
//                     type="checkbox" 
//                     checked={selectedMovies.has(movie.MovieId)} 
//                     onChange={() => handleCheckboxChange(movie.MovieId)} 
//                   />
//                 </td>
//                 {/* <td>{movie.Title}</td>
//                 <td>{movie.Description}</td>
//                 <td>{movie.Genre}</td>
//                 <td>{movie.ReleaseDate}</td> */}
//                 <td>{movie.Title}</td>
//                 <td>{movie.Description}</td>
//                 <td>{movie.Genre}</td>
//                 <td>{movie.ReleaseDate}</td>
//                 <td>{movie.AverageRating !== undefined && movie.AverageRating !== null ? movie.AverageRating : 0}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}

//       <div className="flex">
//         <button onClick={handleAddToPersonalList} className="bg-blue-500 text-white">
//           Add to Personal List
//         </button>
//         <button onClick={exportToExcel} className="bg-green-500 text-white">
//           Export to Excel
//         </button>
//       </div>
//     </div>
//   );
// };

// export default AllMoviesToAddByUser;


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

// Star Rating Component
interface StarRatingProps {
  rating: number;
  size?: number;
}

const StarRating = ({ rating, size = 18 }: StarRatingProps) => {
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

const AllMoviesToAddByUser = () => {
  const dispatch = useDispatch<AppDispatch>();
  const history = useNavigate();
  const loading = useSelector((state: RootState) => state.loading);

  const [allmovies, setAllMovies] = useState<any[]>([]);
  const [error, setError] = useState<string>('');
  const [selectedMovies, setSelectedMovies] = useState<Set<number>>(new Set());
  const [fetching, setFetching] = useState<boolean>(true);

  const token = useSelector((state: RootState) => state.user.token);

  const fetchMovies = async () => {
    if (!token) {
      setError('You need to log in again.');
      return;
    }

    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/allmoviestoaddbyuser`, {
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

  const handleCheckboxChange = (movieId: number) => {
    const updatedSelectedMovies = new Set(selectedMovies);
    if (updatedSelectedMovies.has(movieId)) {
      updatedSelectedMovies.delete(movieId);
    } else {
      updatedSelectedMovies.add(movieId);
    }
    setSelectedMovies(updatedSelectedMovies);
  };

  const handleAddToPersonalList = async () => {
    if (selectedMovies.size === 0) {
      setError('Please select at least one movie.');
      return;
    }

    const selectedMovieList = allmovies.filter(movie => selectedMovies.has(movie.MovieId));

    const movieData = selectedMovieList.map(movie => ({
      MovieID: movie.MovieId,
      title: movie.Title,
      description: movie.Description,
      genre: movie.Genre,
      releaseDate: movie.ReleaseDate,
    }));

    try {
      if (!token) {
        console.error('No auth token found');
        setError('You need to log in again.');
        return;
      }

      const response = await axios.post(`${import.meta.env.VITE_API_URL}/addmov`, movieData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 201) {
        setFetching(true);
        setSelectedMovies(new Set());
        history('/tasks');
      } else {
        setError('Failed to add movies to the personal list.');
      }
    } catch (error) {
      console.error('Error adding movies:', error);
      setError('Error adding movies, please try again later.');
    }
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

  return (
    <div className="movie-selection-container">
      <button onClick={handleLogout} className="logout-btn">Logout</button>

      <h2>Add Movies to Your Personal List</h2>
      {error && <p className="error-message">{error}</p>}
      {allmovies?.length === 0 ? (
        <p>No movies found</p>
      ) : (
        <table className="movie-table">
          <thead>
            <tr>
              <th>Select</th>
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
                <td>
                  <input 
                    type="checkbox" 
                    checked={selectedMovies.has(movie.MovieId)} 
                    onChange={() => handleCheckboxChange(movie.MovieId)} 
                  />
                </td>
                <td>{movie.Title}</td>
                <td>{movie.Description}</td>
                <td>{movie.Genre}</td>
                <td>{movie.ReleaseDate}</td>
                <td>
                  <StarRating rating={movie.AverageRating} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div className="action-buttons">
        <button onClick={handleAddToPersonalList} className="add-movies-btn">
          Add Selected to Personal List
        </button>
        <button onClick={exportToExcel} className="export-btn">
          Export to Excel
        </button>
      </div>
    </div>
  );
};

export default AllMoviesToAddByUser;
