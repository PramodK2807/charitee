import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { submitRequest } from '../store/features/requests/requestSlice';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(null);

  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    if (success === true || success === false) {
      const timeout = setTimeout(() => {
        setSuccess(null);
      }, 5000);

      return () => clearTimeout(timeout);
    }
  }, [success]);

  const formatDate = (timestamp) => {
    const options = { day: '2-digit', month: 'short', year: 'numeric' };
    return new Date(timestamp).toLocaleDateString(undefined, options);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !message) {
      setSuccess(false);
      return false;
    } else {
      const createdAt = Date.now();
      const formattedDate = formatDate(createdAt);
      const newContact = {
        id: createdAt.toString(),
        name: name,
        email: email,
        message: message,
        createdAt: formattedDate,
        status:"Pending"
      };
      dispatch(submitRequest(newContact));
      // JsonContact.contacts.push(newContact);
      setSuccess(true)
      navigate('/request')
    }
  };

  return (
    <div className='contact'>
      <Helmet>
        <title>Charitee - Contact Page</title>
        <meta name='description' content='This is a charitee contact page' />
        <meta property='og:title' content='Charitee Contact Page' />
        <meta property='og:description' content='Charitee Contact Page' />
        <link rel='canonical' href='charitee.com' />
      </Helmet>

      <div className='contact_form container py-5'>
        <h1 className='text-center py-5 text-light'>{''}</h1>
        <div className='row justify-content-between align-items-center mx-3 mx-sm-0'>
          <div className='col-md-6 col-xl-4 border border-warning bg-white rounded'>
            <form className='w-100 px-md-3' onSubmit={handleSubmit}>
              <h2 className='my-3 py-2 text-center contact_us_title'>
                Contact Us
              </h2>
              <hr />
              <div className='row '>
                <div className='col-12'>
                  <div className='contact_us_container'>
                    <input
                      type='text'
                      placeholder=''
                      value={name}
                      name='name'
                      onChange={(e) => setName(e.target.value)}
                    />
                    <label className='mt-3 mb-2' htmlFor='name'>
                      Name
                    </label>
                  </div>
                </div>
                <div className='col-12'>
                  <div className='contact_us_container'>
                    <input
                      type='email'
                      placeholder=''
                      name='email'
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <label className='mt-3 mb-2' htmlFor='email'>
                      Email
                    </label>
                  </div>
                </div>
              </div>
              <div className='contact_us_container'>
                <textarea
                  placeholder=' '
                  className='w-100'
                  name='message'
                  id='message'
                  rows='5'
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                ></textarea>
                <label className='mt-3 mb-2' htmlFor='message'>
                  Message
                </label>
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
          <div className='col-md-6 col-xl-7 my-5 my-md-0'>
            <h2 className='text-warning fw-bold'>
              Lets discuss something cool on your
              <span className='text-success'> projects</span> need
            </h2>
            <div className='my-5'>
              <p className='fw-bold text-light'>
                <span>&#9993;</span> contact@techgropse.com
              </p>
              <p className='fw-bold text-light'>
                <span>&#x1F4F1;</span> +91 123456789
              </p>
              <p className='fw-bold text-light'>
                <span>&#x1F4CC;</span> Noida Sector 63
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Contact;
