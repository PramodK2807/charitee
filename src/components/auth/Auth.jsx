import React, { useEffect, useState } from 'react';
import '../../../src/assets/css/auth.css';
import { NavLink } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import JsonData from '../../db.json'

const Auth = () => {
  const [loginAuth, setLoginAuth] = useState(true);
  const [registerAuth, setRegisterAuth] = useState(false);

  useEffect(() => {
  }, [loginAuth, registerAuth]);

  const loginTrue = () => {
    setLoginAuth(true);
    setRegisterAuth(false);
  };
  const registerTrue = () => {
    setLoginAuth(false);
    setRegisterAuth(true);
  };

  return (
    <div className='auth_bg'>
      <div className='container'>
        <div className='row align-items-center justify-content-center mt-5'>
          <div className='col-md-6 col-xl-5 col-xxl-4 bg-light rounded'>
            <div className='row'>
              <div className='col-6 p-0'>
                <button
                  onClick={loginTrue}
                  className={`w-100 bg-light ${loginAuth ? 'auth_active' : ''}`}
                >
                  <NavLink to='/auth/login' className='text-dark fw-bold'>
                    Login
                  </NavLink>
                </button>
              </div>
              <div className='col-6 p-0'>
                <button
                  onClick={registerTrue}
                  className={`w-100 bg-light ${
                    registerAuth ? 'auth_active' : ''
                  }`}
                >
                  <NavLink to='/auth/login' className='text-dark fw-bold'>
                    Register
                  </NavLink>
                </button>
              </div>
            </div>

            {loginAuth ? (
              <Login JsonData={JsonData} />
            ) : (
              <Register JsonData={JsonData} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
