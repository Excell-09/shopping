import React from 'react';
import { Col } from 'react-bootstrap';
import './../../styles/styles.css';
import { motion } from 'framer-motion';
import convertusdtoidr from '../../utils/convertusdtoidr';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { cartActions } from '../../redux/slice/cartSlice';
import { toast } from 'react-toastify';

const ProductCard = ({ id, title, price, thumbnail, category, sameUrl }) => {
  let money = new convertusdtoidr(price).formatString();
  const dispatch = useDispatch();

  const addToCart = () => {
    dispatch(
      cartActions.addItem({
        id: id,
        title: title,
        image: thumbnail,
        totalPrice: price,
      })
    );
    toast.success(title + ' PRODUCT ADDED');
  };

  return (
    <Col
      lg={3}
      md={4}
      sm={6}
      className='hover-card bg-white'>
      <div className='text-dark d-flex justify-content-between flex-column p-4 h-100'>
        <div className='img__products__container'>
          <Link to={`/shop/${id}`}>
            <img
              className='img__product'
              src={thumbnail}
              alt={title}
            />
          </Link>
        </div>

        <div>
          <Link
            to={`/shop/${id}`}
            className='text-dark d-block fw-semibold'>
            {title}
          </Link>
          <span className='text-capitalize text-muted'>{category}</span>
        </div>

        <div className='d-flex justify-content-between align-items-center'>
          <small className='text-danger fw-bolder fs-5'>Rp {money}</small>
          <motion.i
            whileTap={{ scale: 1.1 }}
            className='ri-add-circle-fill btn-add pointer'
            onClick={addToCart}></motion.i>
        </div>
      </div>
    </Col>
  );
};

export default ProductCard;
