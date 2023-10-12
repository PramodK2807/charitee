import { useState } from 'react';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !message) {
      alert('Please fill all fields');
      setSuccess(false);
      return false;
    } else {
      alert(`${name} ${email} & your message is ${message}`);
      setName('');
      setMessage('');
      setEmail('');
      setSuccess(true);
    }
  };
  return (
    <div>
      <div className='contact'>
        <div className='container'>
          <h1 className='position-absolute py-3 mb-5 bottom-0 text-light'>
            Contact
          </h1>
        </div>
      </div>

      <div className='contact_form container'>
        <div className='row'>
          <div className='col-md-8'>
            {success === true && (
              <p className='text-success'>Your message was successfully sent</p>
            )}
            {success === false && (
              <p className='text-danger'>Please enter all fields</p>
            )}

            <form className='w-100' onSubmit={handleSubmit}>
              <div>
                <label htmlFor='name'>Name</label>
                <input
                  type='text'
                  placeholder='Enter Name'
                  value={name}
                  name='name'
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor='email'>Email</label>
                <input
                  type='email'
                  placeholder='Enter Email'
                  name='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor='message'>Message</label>
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
              <div className='text-center'>
                <button
                  type='submit'
                  className='rounded-pill px-5 py-2 mt-3 bg-success'
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
          <div className='col-md-4'></div>
        </div>
      </div>
    </div>
  );
};
export default Contact;
