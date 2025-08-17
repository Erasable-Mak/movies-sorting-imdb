// // axiosInstance.ts
// import axios, { AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios';
// import { store } from '../store';  // Import your Redux store

// // Create Axios instance
// const axiosInstance = axios.create({
//   baseURL: import.meta.env.VITE_API_URL, // Your API base URL
// });

// // Add request interceptor
// axiosInstance.interceptors.request.use(
//   (config: InternalAxiosRequestConfig) => {
//     // Access the token from Redux store
//     const token = store.getState().user.token; // Get token from Redux store
//     console.log('Token from Redux in Axios Interceptor:', token); // Optional: log the token

//     if (token) {
//       config.headers = config.headers || {}; // Ensure headers exist
//       (config.headers as any)['Authorization'] = `Bearer ${token}`; // Add token to request header
//     }

//     return config;  // Return the modified config
//   },
//   (error) => {
//     return Promise.reject(error);  // Handle request errors
//   }
// );

// // Add response interceptor (optional, handle errors globally)
// axiosInstance.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     if (error.response && error.response.status === 401) {
//       console.log('Token expired or invalid, please log in again.');
//       // Optionally log out the user here, or redirect to login page
//       localStorage.removeItem('authToken');  // Clear token from localStorage
//     //   store.dispatch(clearUser());  // Dispatch action to clear user from Redux
//     }
//     return Promise.reject(error);
//   }
// );

// export default axiosInstance;



//axiosInstance.ts
import axios from 'axios';
import { store } from '../store';

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Replace with your API base URL
  timeout: 10000, // Set timeout for requests if needed
});

// Add a request interceptor to attach the token
axiosInstance.interceptors.request.use(
  (config) => {
    // Get token from localStorage
    const token = localStorage.getItem('authToken');
    
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`; // Attach token to headers
    }

    return config;
  },
  (error) => {
    // Handle request errors
    return Promise.reject(error);
  }
);

// Optionally: Add a response interceptor to handle errors (e.g., token expiration)
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Handle token expiration or unauthorized access
      // Clear token and redirect to login
      localStorage.removeItem('authToken');
      window.location.href = '/login'; // Redirect to login page
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;

