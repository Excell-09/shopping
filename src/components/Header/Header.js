import { Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { AiOutlineHeart } from 'react-icons/ai';
import { BiShoppingBag } from 'react-icons/bi';
import logo from './../../assets/logo.png';
import profile from './../../assets/profile.jpg';
import './Style.css';
import { motion } from 'framer-motion';
import { GiHamburgerMenu } from 'react-icons/gi';
import NavbarMobile from '../NavbarMobile/NavbarMobile';
import { useAppContext } from '../../context/AppContext';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from './../../firebase.config';
import { useLocation } from 'react-router-dom';

export const NAVLINK = [
  { display: 'Home', to: '/' },
  { display: 'Shop', to: '/shop' },
  { display: 'Cart', to: '/cart' },
];
const Header = () => {
  const { toggelNav, store } = useAppContext();
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const navigate = useNavigate();
  let user = localStorage.getItem('user');
  user = JSON.parse(user);
  const [subNav, setSubNav] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    setSubNav(false);
    window.scrollTo(0, 0);
  }, [pathname]);

  const navigateToCart = () => {
    navigate('cart');
  };

  return (
    <header className={`position-sticky top-0 start-0 w-100 bg-white z-1000 shadow`}>
      <Container>
        <div className='d-flex justify-content-between align-items-center py-3'>
          <div
            className='logo-nav pointer'
            onClick={() => navigate('/')}>
            <img
              width={'100%'}
              src={logo}
              alt='logo'
            />
          </div>

          <div className='gap-4 nav_link d-none d-sm-flex'>
            {NAVLINK.map((item, i) => {
              if (item.display === 'Home' || item.display === 'Shop') {
                return (
                  <NavLink
                    className={(navClass) => (navClass.isActive ? 'hover-active' : '')}
                    key={i}
                    to={item.to}
                    reloadDocument>
                    {item.display}
                  </NavLink>
                );
              }
              return (
                <NavLink
                  className={(navClass) => (navClass.isActive ? 'hover-active' : '')}
                  key={i}
                  to={item.to}>
                  {item.display}
                </NavLink>
              );
            })}
          </div>
          <div className='d-flex justify-content-between align-items-center gap-3'>
            <span className='position-relative pointer'>
              <AiOutlineHeart size={'1.7rem'} />
              <small className='notif-display'>1</small>
            </span>
            <span
              className='position-relative pointer'
              onClick={navigateToCart}>
              <BiShoppingBag size={'1.7rem'} />
              <small className='notif-display'>{totalQuantity}</small>
            </span>

            <span className='profile-nav position-relative'>
              {user ? (
                <>
                  <motion.img
                    whileTap={{ scale: 1.2 }}
                    className='rounded-5 pointer'
                    width={'100%'}
                    src={user.photoURL}
                    alt='profile'
                    onClick={() => setSubNav(!subNav)}
                  />
                  <div className={`position-absolute d-flex flex-column bg-dark text-center m-2 rounded-1 shadow ${!subNav && 'd-none'}`}>
                    <span className='p-2 text-capitalize text-white'>{user.name}</span>
                    <hr className='border-top-2 m-0' />
                    <span
                      className='p-2 pointer bg-danger fw-semibold text-white'
                      onClick={() => {
                        signOut(auth);
                        navigate('/login');
                        store.removeLocal();
                      }}>
                      LogOut
                    </span>
                  </div>
                </>
              ) : (
                <>
                  <motion.img
                    whileTap={{ scale: 1.2 }}
                    className='rounded-5 pointer'
                    width={'100%'}
                    src={profile}
                    alt='profile'
                    onClick={() => setSubNav(!subNav)}
                  />
                  <div className={`position-absolute d-flex flex-column bg-dark text-center m-2 rounded-1 shadow ${!subNav && 'd-none'}`}>
                    <span
                      className='p-2 pointer bg-primary fw-semibold text-white'
                      onClick={() => {
                        navigate('/login');
                      }}>
                      Login
                    </span>
                  </div>
                </>
              )}
            </span>

            <GiHamburgerMenu
              size={'2rem'}
              className='d-sm-none'
              onClick={() => toggelNav()}
            />
          </div>
        </div>
      </Container>

      <NavbarMobile />
    </header>
  );
};

export default Header;
