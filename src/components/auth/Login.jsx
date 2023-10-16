import { Helmet } from 'react-helmet';
import '../../../src/assets/css/auth.css';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const Login = ({JsonData}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  useEffect(() => {
    // console.log(JsonData.users);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    localStorage.removeItem('charitee_auth');
    if (!email || !password) {
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'error',
        title: 'Please enter all fields',
        showConfirmButton: false,
        timerProgressBar: true,
        timer: 2000,
      });
      return false;
    }
    else {
      const findUser = JsonData.users.find(users => users.email === email)
      if (findUser && findUser.name === name && findUser.password === password) {
        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'success',
          title: 'Login Success',
          showConfirmButton: false,
          timerProgressBar: true,
          timer: 2000,
        });
        localStorage.setItem('charitee_auth', JSON.stringify({name, email}))
        navigate('/')
      }
      else {
        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'error',
          title: 'Invalid Credentials or name',
          showConfirmButton: false,
          timerProgressBar: true,
          timer: 3000,
        });
        return false
      }
    }
  };

  return (
    <div className='mt-5'>
      <Helmet>
        <title>Charitee - Login Page</title>
        <meta name='description' content='This is a charitee website' />
        <meta property='og:title' content='Charitee' />
        <meta property='og:description' content='Charitee' />
        <link rel='canonical' href='charitee.com' />
      </Helmet>
      <div className='container'>
        <h1 className='text-center'>Login Form</h1>
        <hr />
        <form onSubmit={handleSubmit} className='w-100'>
          <div className='row'>
            <div className='mb-2 col-12'>
              <div className='mb-2'>
                <label htmlFor='name'>Name</label>
              </div>
              <input
                type='text'
                className='w-100 px-4 py-2 rounded'
                id='name'
                placeholder='Enter Name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className='mb-2 col-sm-6'>
              <div className='mb-2'>
                <label htmlFor='email'>Email</label>
              </div>
              <input
                type='email'
                className='w-100 px-4 py-2 rounded'
                id='email'
                placeholder='Enter Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className='mb-2 col-sm-6 position-relative'>
              <div className='mb-2'>
                <label htmlFor='password'>Password</label>
              </div>
              <input
                type='password'
                className='w-100 px-4 py-2 rounded'
                id='password'
                placeholder='Enter Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {/* <div className='eye position-absolute end-0'>
                <img src="../../assets/images/password_not_visible.svg" className='w-100' alt="eye" />
              </div> */}
            </div>
            <div>
              <Link to='/forget'>Forget Password?</Link>
            </div>
          </div>
          <div className='text-center my-4'>
            <button type='submit' className='w-50 auth_btn rounded-pill'>
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
