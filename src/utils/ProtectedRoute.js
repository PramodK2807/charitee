import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false) 
  let location = useLocation();

  useEffect(() => {
    let userData = JSON.parse(localStorage.getItem('charitee_auth'));
    console.log(userData.email);
    if (userData) {
      setIsAuthenticated(true);
    }
  },[])

  if (isAuthenticated) {
    return <Navigate to='/auth/login' state={{ from: location }} replace />;
  }
  return children;
};

export default ProtectedRoute;
