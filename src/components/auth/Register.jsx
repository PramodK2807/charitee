import { Helmet } from 'react-helmet';
import '../../../src/assets/css/auth.css';

// import user from '../../db.json';

import { useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const Register = ({ JsonData }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setCPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (cpassword !== password) {
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'error',
        title: 'Password not match',
        showConfirmButton: false,
        timerProgressBar: true,
        timer: 3000,
      });
      return false;
    }
    if (!name || !email || !gender || !password || !cpassword) {
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'error',
        title: 'Please enter all fields',
        showConfirmButton: false,
        timerProgressBar: true,
        timer: 3000,
      });
      return false;
    } else {
      let user = {
        name,
        email,
        password,
        cpassword,
        gender,
      };
      JsonData.users.push(user);
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: 'Register Success',
        showConfirmButton: false,
        timerProgressBar: true,
        timer: 3000,
      });
      navigate('/');
    }
  };

  return (
    <div className='mt-5'>
      <Helmet>
        <title>Charitee - Signup Page</title>
        <meta name='description' content='This is a charitee website' />
        <meta property='og:title' content='Charitee' />
        <meta property='og:description' content='Charitee' />
        <link rel='canonical' href='charitee.com' />
      </Helmet>
      <div className='container'>
        <h1 className='text-center'>Sign Up Form</h1>
        <hr />
        <form onSubmit={handleSubmit} className='w-100'>
          <div className='row'>
            <div className='mb-2 col-sm-6'>
              <div className='mb-2'>
                <label htmlFor='name'>Name</label>
              </div>
              <input
                type='text'
                className='w-100 px-4 py-2 rounded'
                id='name'
                placeholder='Enter Name'
                onChange={(e) => setName(e.target.value)}
                value={name}
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
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>
            <div className='mb-2 col-12'>
              <div className='mb-2'>
                <label htmlFor='gender'>Select Gender</label>
              </div>
              <select
                name='gender'
                id='gender'
                className='w-100 px-4 py-2 rounded'
                onChange={(e) => setGender(e.target.value)}
              >
                <option value=''>Choose option below</option>
                <option value='male'>Male</option>
                <option value='female'>Female</option>
              </select>
            </div>
            <div className='mb-2 col-sm-6'>
              <div className='mb-2'>
                <label htmlFor='password'>Password</label>
              </div>
              <input
                type='password'
                className='w-100 px-4 py-2 rounded'
                id='password'
                placeholder='Enter Password'
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </div>
            <div className='mb-2 col-sm-6'>
              <div className='mb-2'>
                <label htmlFor='cpassword'>Confirm Password</label>
              </div>
              <input
                type='password'
                className='w-100 px-4 py-2 rounded'
                id='cpassword'
                placeholder='Re-enter Password'
                onChange={(e) => setCPassword(e.target.value)}
                value={cpassword}
              />
            </div>
          </div>
          <div className='text-center my-4'>
            <button type='submit' className='w-50 auth_btn rounded-pill'>
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
