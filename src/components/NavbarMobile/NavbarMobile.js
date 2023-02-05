import React from 'react';
import { NavLink } from 'react-router-dom';
import { NAVLINK } from '../Header/Header';
import './../Header/Style.css';
import { GiHamburgerMenu } from 'react-icons/gi';
import { useAppContext } from '../../context/AppContext';

const NavbarMobile = () => {
  const { toggelNav, openNav } = useAppContext();

  return (
    <nav className={`position-absolute top-0 end-0 min-vh-100 w-100 bg-dark bg-opacity-50 ${openNav ? 'd-block' : 'd-none'}  d-sm-none`}>
      <div className='position-absolute top-0 end-0 min-vh-100 w-30 bg-light nav_link d-flex flex-column p-2 pt-3'>
        <GiHamburgerMenu
          className='align-self-end mb-2'
          onClick={() => toggelNav()}
          size={'2rem'}
        />
        {NAVLINK.map((item, i) => {
          return (
            <NavLink
              reloadDocument
              key={i}
              to={item.to}
              onClick={() => toggelNav()}
              className={(navClass) => (navClass.isActive ? 'hover-active text-center p-3' : 'text-center p-3')}>
              {item.display}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};

export default NavbarMobile;
