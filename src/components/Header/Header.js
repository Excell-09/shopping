import { Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { AiOutlineHeart } from 'react-icons/ai';
import { BiShoppingBag } from 'react-icons/bi';
import logo from './../../assets/logo.png';
import profile from './../../assets/profile.jpg';
import './Style.css';
import { motion } from 'framer-motion';

const Header = () => {
  const NAVLINK = [
    { display: 'Home', to: '/' },
    { display: 'Shop', to: '/shop' },
    { display: 'Cart', to: '/cart' },
  ];

  return (
    <header className=''>
      <Container>
        <div className='d-flex justify-content-between align-items-center py-3'>
          <div className='logo-nav pointer'>
            <img
              width={'100%'}
              src={logo}
              alt='logo'
            />
          </div>

          <div className='d-flex gap-4 nav_link'>
            {NAVLINK.map((item, i) => {
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
            <span className='position-relative pointer'>
              <BiShoppingBag size={'1.7rem'} />
              <small className='notif-display'>1</small>
            </span>

            <span className='profile-nav '>
              <motion.img
                whileTap={{scale:1.2}}
                className='rounded-5 pointer'
                width={'100%'}
                src={profile}
                alt='profile'
              />
            </span>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
