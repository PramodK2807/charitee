import React from 'react';
import { Navigate } from 'react-router-dom';

const Auth = (Component) => {
  const isAuthenticated = true;

  return class AuthenticatedComponent extends React.Component {
    render() {
        if (!isAuthenticated) {
          return <Navigate to='/auth/login'/>
      }
    }
  };
};

export default Auth;
