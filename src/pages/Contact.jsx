import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import JsonContact from '../db.json';
import { useNavigate } from 'react-router-dom';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(null);

  const navigate = useNavigate()

  useEffect(() => {
    if (success === true || success === false) {
      const timeout = setTimeout(() => {
        setSuccess(null);
      }, 5000);

      return () => clearTimeout(timeout);
    }
  }, [success]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !message) {
      setSuccess(false);
      return false;
    } else {
      const createdAt = Date.now();
      const newContact = {
        id: createdAt.toString(),
        name: name,
        email: email,
        message: message,
        createdAt: createdAt,
      };
      JsonContact.contacts.push(newContact);
      setSuccess(true)
      navigate('/request')
    }
  };

  return (
    <div className='contact pb-5'>
      <Helmet>
        <title>Charitee - Contact Page</title>
        <meta name='description' content='This is a charitee contact page' />
        <meta property='og:title' content='Charitee Contact Page' />
        <meta property='og:description' content='Charitee Contact Page' />
        <link rel='canonical' href='charitee.com' />
      </Helmet>

      <div className='contact_form container'>
        <h1 className='text-center py-5 text-light'>Contact Form</h1>
        <div className='row justify-content-between align-items-center'>
          <div className='col-md-5 border border-warning bg-white rounded'>
            <form className='w-100' onSubmit={handleSubmit}>
              <div className='row'>
                <div className='col-6'>
                  <div>
                    <label className='mt-3 mb-2' htmlFor='name'>
                      Name
                    </label>
                    <input
                      type='text'
                      placeholder='Enter Name'
                      value={name}
                      name='name'
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                </div>
                <div className='col-6'>
                  <div>
                    <label className='mt-3 mb-2' htmlFor='email'>
                      Email
                    </label>
                    <input
                      type='email'
                      placeholder='Enter Email'
                      name='email'
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div>
                <label className='mt-3 mb-2' htmlFor='message'>
                  Message
                </label>
                <textarea
                  placeholder='Please enter message'
                  className='w-100'
                  name='message'
                  id='message'
                  rows='5'
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                ></textarea>
              </div>
              {success === true && (
                <p className='text-success text-center'>
                  Your message sent successfully
                </p>
              )}
              {success === false && (
                <p className='text-danger text-center'>
                  Please enter all fields
                </p>
              )}
              <div className='text-center'>
                <button
                  type='submit'
                  className='rounded-pill px-5 py-2 my-3 bg-success'
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
          <div className='col-md-6 my-5 my-md-0'>
            <h2 className='text-warning fw-bold'>
              Lets discuss something cool on your{' '}
              <span className='text-success'>projects</span> need
            </h2>
            <div className='my-5'>
              <p className='fw-bold text-light'>
                <span>&#9993;</span> contact@techgropse.com
              </p>
              <p className='fw-bold text-light'>
                <span>&#x1F4F1;</span> +91 123456789
              </p>
              <p className='fw-bold text-light'>
                <span>&#x1F4CC;</span> Noida Sectore 63
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Contact;
