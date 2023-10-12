import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [colorChange, setColorchange] = useState(false);
  const [navBg, setNavBg] = useState(false);
  const location = useLocation();
  useEffect(() => {
    if (location.pathname.includes('/auth')) {
      setNavBg(true);
      console.log(true);
      }
    else {
        setNavBg(false);
      }
  }, [location]);

  const changeNavbarColor = () => {
    if (window.scrollY >= 100) {
      setColorchange(true);
    } else {
      setColorchange(false);
    }
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
                <li className='px-2 mx-2'>
                  <NavLink className='text-light' to='/contact'>
                    Contact
                  </NavLink>
                </li>
              </ul>
            </div>
            <div>
              <button className='rounded-pill bg-warning px-5 py-2'>
                <NavLink className='fw-bold text-dark' to='/auth/login'>
                  Login
                </NavLink>
              </button>
              <button className='rounded-pill bg-warning px-5 py-2'>
                <NavLink className='fw-bold text-dark' to='/auth/register'>
                  Register
                </NavLink>
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};
export default Navbar;
