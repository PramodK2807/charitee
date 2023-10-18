import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const Authentication = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  let location = useLocation();

  // const protectedRoute = /^\/protected\//.test(location.pathname) ? true : false;

  useEffect(() => {
    let userData = JSON.parse(localStorage.getItem('charitee_auth'));

    if (userData) {
      // console.log(userData);
      setIsAuthenticated(true);
    } else {
      // console.log('else', isAuthenticated);
      setIsAuthenticated(false);
    }
  }, []);

  // console.log(isAuthenticated);

  // console.log(protectedRoute);
  if (isAuthenticated === null || isAuthenticated === false) {
    return <Navigate to='/auth/login' state={{ from: location }} replace />;
  }

  return children;
};

export default Authentication;

