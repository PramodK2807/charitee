import { useEffect, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [localData, setLocalData] = useState(null);
  // const [isHovered, setIsHovered] = useState(false);
  const [colorChange, setColorchange] = useState(false);
  const [navBg, setNavBg] = useState(false);
  const [hidden, setHidden] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('charitee_auth'));

    //     location.pathname.includes('/auth') ||
    // /^\/protected\//.test(location.pathname)

    setLocalData(userData);
    if (location.pathname !== '/') {
      setNavBg(true);
    } else {
      setNavBg(false);
    }
  }, [location]);

  useEffect(() => {}, [localData]);

  const changeNavbarColor = () => {
    if (window.scrollY >= 100) {
      setColorchange(true);
    } else {
      setColorchange(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('charitee_auth');
    setLocalData(null);
    navigate('/');
  };

  const closeNav = () => {
    setHidden(!hidden);
  }
  window.addEventListener('scroll', changeNavbarColor);
  return (
    <>
      <nav
        className={`py-2 navbar navbar-expand-md ${
          colorChange ? 'nav_clr position-fixed z-5 w-100' : ''
        } ${navBg ? 'nav_clr' : ''}`}
      >
        <div class='container'>
          <NavLink
            style={{ fontSize: '40px', color: 'white', fontWeight: 'bold' }}
            to='/'
          >
            Charitee
          </NavLink>
          <button
            class='navbar-toggler bg-light'
            type='button'
            data-bs-toggle='collapse'
            data-bs-target='#navbarNav'
            // aria-controls='navbarNav'
            // aria-expanded='true'
            // aria-label='Toggle navigation'
          >
            <span class='navbar-toggler-icon'></span>
          </button>
          <div
            class='collapse rounded navbar-collapse navbar_ul_clr justify-content-end mt-2 py-2 px-2'
            id='navbarNav'
          >
            <ul
              style={{
                fontSize: '20px',
                fontWeight: '500',
                fontFamily: 'cursive',
              }}
              class='navbar-nav'
            >
              <li className='px-2 mx-2 py-2'>
                <a onClick={closeNav} href='/#contact' className='text-light'>
                  Contact
                </a>
              </li>
              <li className='px-2 mx-2 py-2'>
                <NavLink
                  onClick={closeNav}
                  className=' text-light'
                  to='/request'
                >
                  Request
                </NavLink>
              </li>
              <li className='px-2 mx-2 py-2'>
                <NavLink onClick={closeNav} className='text-light' to='/todo'>
                  Todo
                </NavLink>
              </li>
              <li className='px-2 mx-2 py-2'>
                <NavLink onClick={closeNav} className='text-light' to='/cart'>
                  Cart
                </NavLink>
              </li>
            </ul>
            <div>
              {localData ? (
                <div className='user_logo position-relative'>
                  <p className='name position-absolute'>
                    {localData?.name?.split(' ')[0].charAt(0).toUpperCase()}
                    {localData?.name?.split(' ')[1]
                      ? localData?.name?.split(' ')[1].charAt(0).toUpperCase()
                      : ''}
                  </p>

                  <div className='position-absolute rounded user_container'>
                    <div className='no_div position-relative'></div>
                    <div className='user_profile_box py-3 rounded position-relative border border-success'>
                      <NavLink
                        to='/protected/dashboard'
                        className='text-dark px-5'
                      >
                        Profile
                      </NavLink>
                      <button
                        onClick={handleLogout}
                        className='w-100 px-5 mt-4'
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <button className='rounded-pill bg-warning px-5 py-2'>
                  <NavLink className='fw-bold text-dark' to='/auth/login'>
                    Login
                  </NavLink>
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>
      
    </>
  );
};
export default Navbar;
