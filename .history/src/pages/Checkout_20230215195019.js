import React from 'react';
import { Container, Form, Col, Row, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import './../styles/checkout.css';
import convertIdr from './../utils/convertusdtoidr';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

// const intialState = {
//   name: '',
//   email: '',
//   phone: '',
//   address: '',
//   city: '',
//   postalCode: '',
//   country: '',
// };

const Checkout = () => {
  const totalQty = useSelector((state) => state.cart.totalQuantity);
  let totalAmount = useSelector((state) => state.cart.totalAmount);
  const { pathname } = useLocation();
  totalAmount = new convertIdr(totalAmount).formatString();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <section className='py-4'>
      <Container>
        <h3 className='mb-3'>Checkout</h3>
        <Row>
          <Col
            lg={8}
            className='bg-white p-4 mb-4 shadow'>
            <h6>Billing Information</h6>
            <Form>
              <Form.Group className='mt-3'>
                <Form.Control
                  required
                  type='text'
                  name='name'
                  placeholder='Enter Your Name'
                />
              </Form.Group>
              <Form.Group className='mt-3'>
                <Form.Control
                  required
                  type='email'
                  name='email'
                  placeholder='Enter Your Email'
                />
              </Form.Group>
              <Form.Group className='mt-3'>
                <Form.Control
                  required
                  type='tel'
                  name='phone'
                  placeholder='Phone Number'
                />
              </Form.Group>
              <Form.Group className='mt-3'>
                <Form.Control
                  required
                  type='text'
                  name='address'
                  placeholder='Street Address'
                />
              </Form.Group>
              <Form.Group className='mt-3'>
                <Form.Control
                  required
                  type='text'
                  name='city'
                  placeholder='City'
                />
              </Form.Group>
              <Form.Group className='mt-3'>
                <Form.Control
                  required
                  type='text'
                  name='postalCode'
                  placeholder='postal Code'
                />
              </Form.Group>
              <Form.Group className='mt-3'>
                <Form.Control
                  required
                  type='text'
                  name='country'
                  placeholder='Country'
                />
              </Form.Group>
            </Form>
          </Col>
          <Col
            lg={4}
            className='bg-dark p-4 text-white mb-4 shadow'>
            <div className='d-flex flex-column gap-2'>
              <h6 className='d-flex justify-content-between'>
                Total Quantity : <span className='fw-bold'>{totalQty} items</span>
              </h6>
              <h6 className='d-flex justify-content-between'>
                Subtotal : <span className='fw-bold'>Rp {totalAmount}</span>
              </h6>
              <div>
                <h6 className='d-flex justify-content-between'>
                  Shipping : <span className='fw-bold'>0</span>
                </h6>
                <h6 className='d-flex justify-content-between'>
                  Free Shipping : <span className='fw-bold'>0</span>
                </h6>
              </div>
              <hr className='border border-2' />
              <h5 className='d-flex justify-content-between'>
                Total Cost : <span className='fw-bold'>Rp {totalAmount}</span>
              </h5>
            </div>
            <Button
              onClick={() => navigate('/payment')}
              variant='light'
              className='mt-2'>
              Place An Order
            </Button>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Checkout;
