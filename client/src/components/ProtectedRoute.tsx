import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface ProtectedRouteProps {
  element: React.ReactElement; // The protected element to render if authenticated
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  // Get the token from localStorage
  const token = localStorage.getItem('authToken'); // Check token in localStorage

  const location = useLocation(); // Store current location to redirect after login

  // If the token doesn't exist, redirect to the login page
  if (!token) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return element; // Render the protected element if authenticated
};

export default ProtectedRoute;
