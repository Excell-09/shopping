import React,{useEffect} from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import './../styles/Cart.css';
import { cartActions } from '../redux/slice/cartSlice';
import convertusdtoidr from './../utils/convertusdtoidr';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';

const Cart = () => {
  const cartItem = useSelector((state) => state.cart.cartItems);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const navigate = useNavigate();
  const totalDisplay = new convertusdtoidr(totalAmount).formatString();
  const { pathname } = useLocation()
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <section className='py-4'>
      <Container>
        <Row>
          {cartItem.length === 0 ? (
            <h5 className='py-3'>No Product in cart</h5>
          ) : (
            <>
              <h3>Cart</h3>
              <Col
                lg={9}
                className='bg-white p-3 mb-3 shadow'>
                <table className='table bordered'>
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Title</th>
                      <th>Price</th>
                      <th>Qty</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItem.map((item, i) => {
                      return (
                        <Tr
                          item={item}
                          key={i}
                        />
                      );
                    })}
                  </tbody>
                </table>
              </Col>
              <Col lg={3}>
                <div className='bg-white p-3 shadow'>
                  <div className='d-flex justify-content-between align-items-center'>
                    <h6 className='d-block'>subtotal</h6>
                    <h6 className='fw-bold text-danger d-block'>Rp {totalDisplay}</h6>
                  </div>
                  <p>Ongkir akan dihitung saat checkout</p>
                  <div className='d-flex align-items-center gap-1'>
                    <Button
                      onClick={() => navigate('/checkout')}
                      variant='success'
                      disabled={cartItem === 0}>
                      Checkout
                    </Button>
                    <Button
                      variant='secondary'
                      onClick={() => navigate('/shop')}>
                      Back To Shop{' '}
                    </Button>
                  </div>
                </div>
              </Col>
            </>
          )}
        </Row>
      </Container>
    </section>
  );
};

const Tr = ({ item }) => {
  const dispatch = useDispatch();
  const displayItem = new convertusdtoidr(item.totalPrice).formatString();

  const handleDeleteById = () => {
    dispatch(cartActions.deleteItem(item.id));
  };
  return (
    <tr>
      <td className='img-cart'>
        <img
          width={'100%'}
          src={item.image}
          alt={item.title}
        />
      </td>
      <td>{item.title}</td>
      <td>{displayItem}</td>
      <td>{item.quantity}pc</td>
      <td className='d-flex justify-content-center'>
        <motion.span
          whileTap={{ scale: 0.9 }}
          className='pointer'
          onClick={handleDeleteById}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            width='24'
            height='24'>
            <path
              fill='none'
              d='M0 0h24v24H0z'
            />
            <path d='M17 6h5v2h-2v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8H2V6h5V3a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v3zm1 2H6v12h12V8zm-9 3h2v6H9v-6zm4 0h2v6h-2v-6zM9 4v2h6V4H9z' />
          </svg>
        </motion.span>
      </td>
    </tr>
  );
};
export default Cart;
