import { useEffect, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [localData, setLocalData] = useState(null);
  // const [isHovered, setIsHovered] = useState(false);
  const [colorChange, setColorchange] = useState(false);
  const [navBg, setNavBg] = useState(false);
  const location = useLocation();
  const navigate = useNavigate()
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
    navigate('/')
  };
  window.addEventListener('scroll', changeNavbarColor);
  return (
    <>
      <nav
        className={`py-2 ${
          colorChange ? 'nav_clr position-fixed z-5 w-100' : ''
        } ${navBg ? 'nav_clr' : ''}`}
      >
        <div className='container'>
          <div className='d-flex align-items-center justify-content-between'>
            <div className='logo'>
              <h1 className='text-light'>Charitee</h1>
            </div>
            <div className='nav_links'>
              <ul className='d-flex align-items-center'>
                <li className='px-2 mx-2'>
                  <NavLink className='text-light' to='/'>
                    Home
                  </NavLink>
                </li>
                {/* <li className='px-2 mx-2'>
                  <NavLink className='text-light' href='#contact'>
                    Contact
                  </NavLink>
                </li> */}
                <li className='px-2 mx-2'>
                  <a href='/#contact' className='text-light'>
                    Contact
                  </a>
                </li>
                <li className='px-2 mx-2'>
                  <NavLink className='text-light' to='/request'>
                    Request
                  </NavLink>
                </li>
              </ul>
            </div>
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
