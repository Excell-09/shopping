import React from 'react';
import { Col } from 'react-bootstrap';
import { AiFillPlusCircle } from 'react-icons/ai';
import './../../styles/styles.css';
import convertusdtoidr from '../../utils/convertusdtoidr';
import { Link } from 'react-router-dom';

const ProductCard = ({ id, title, price, thumbnail, category }) => {
  let money = new convertusdtoidr(price).formatString();

  return (
    <Col
      lg={3}
      md={4}
      sm={6}
      className='hover-card'>
      <Link
        to={`shop/${id}`}
        className='text-dark d-flex justify-content-between flex-column p-4 h-100'>
        <div className='img__products__container'>
          <img
            className='img__product'
            src={thumbnail}
            alt={title}
          />
        </div>

        <div>
          <h5>{title}</h5>
          <span className='text-capitalize text-muted'>{category}</span>
        </div>

        <div className='d-flex justify-content-between align-items-center'>
          <small className='text-danger fw-bolder'>Rp {money}</small>
          <AiFillPlusCircle
            size={'1.7rem'}
            className={'pointer'}
          />
        </div>
      </Link>
    </Col>
  );
};

export default ProductCard;
