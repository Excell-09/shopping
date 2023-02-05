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

export const NAVLINK = [
  { display: 'Home', to: '/' },
  { display: 'Shop', to: '/shop' },
  { display: 'Cart', to: '/cart' },
];
const Header = () => {
  const { toggelNav } = useAppContext();
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const navigate = useNavigate();

  const navigateToCart = () => {
    navigate('cart');
  };

  return (
    <header className={`position-sticky top-0 start-0 w-100 bg-white z-1000`}>
      <Container>
        <div className='d-flex justify-content-between align-items-center py-3'>
          <div className='logo-nav pointer'>
            <img
              width={'100%'}
              src={logo}
              alt='logo'
            />
          </div>

          <div className='gap-4 nav_link d-none d-sm-flex'>
            {NAVLINK.map((item, i) => {
              return (
                <NavLink
                  className={(navClass) => (navClass.isActive ? 'hover-active' : '')}
                  key={i}
                  to={item.to}
                  reloadDocument>
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

            <span className='profile-nav '>
              <motion.img
                whileTap={{ scale: 1.2 }}
                className='rounded-5 pointer'
                width={'100%'}
                src={profile}
                alt='profile'
              />
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
