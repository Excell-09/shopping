import React from 'react';
import { Container, ListGroup, Row, Col } from 'react-bootstrap';
import { GoLocation } from 'react-icons/go';
import { BsFillTelephoneFill } from 'react-icons/bs';
import { MdEmail } from 'react-icons/md';
import logo from './../../assets/logo.png';
import { Link } from 'react-router-dom';

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className='bg-dark'>
      <Container>
        <Row className='text-white py-5 px-1 p-lg-5'>
          <Col
            lg={5}
            md={6}
            className='mb-4'>
            <div className='logo-nav pointer'>
              <img
                width={'100%'}
                src={logo}
                alt='logo'
              />
            </div>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad, non?Lorem ipsum dolor sit amet consectetur.</p>
          </Col>
          <Col
            lg={2}
            md={6}
            className='mb-4'>
            <div>
              <ListGroup>
                <h6>Top Categories</h6>
                <ListGroup.Item className='bg-transparent ps-0'>
                  <Link
                    className='text-muted'
                    to={'#'}>
                    Trending
                  </Link>
                </ListGroup.Item>
                <ListGroup.Item className='bg-transparent ps-0'>
                  <Link
                    className='text-muted'
                    to={'#'}>
                    Best Seller
                  </Link>
                </ListGroup.Item>
                <ListGroup.Item className='bg-transparent ps-0'>
                  <Link
                    className='text-muted'
                    to={'#'}>
                    New Arrive
                  </Link>
                </ListGroup.Item>
              </ListGroup>
            </div>
          </Col>
          <Col
            lg={2}
            md={6}
            className='mb-4'>
            <div>
              <ListGroup>
                <h6>Pages</h6>
                <ListGroup.Item className='bg-transparent ps-0'>
                  <Link
                    reloadDocument
                    className='text-muted'
                    to={'/'}>
                    Home
                  </Link>
                </ListGroup.Item>
                <ListGroup.Item className='bg-transparent ps-0'>
                  <Link
                    reloadDocument
                    className='text-muted'
                    to={'shop'}>
                    Shop
                  </Link>
                </ListGroup.Item>
                <ListGroup.Item className='bg-transparent ps-0'>
                  <Link
                    reloadDocument
                    className='text-muted'
                    to={'login'}>
                    Login
                  </Link>
                </ListGroup.Item>
                <ListGroup.Item className='bg-transparent ps-0'>
                  <Link
                    reloadDocument
                    className='text-muted'
                    to={'pricacy'}>
                    Privacy Policy
                  </Link>
                </ListGroup.Item>
              </ListGroup>
            </div>
          </Col>
          <Col
            lg={3}
            md={6}
            className='mb-4'>
            <div>
              <ListGroup>
                <h6>Top Categories</h6>
                <ListGroup.Item className='bg-transparent ps-0'>
                  <GoLocation className='text-muted me-2' />
                  <span className='text-muted'>Singkawang Barat</span>
                </ListGroup.Item>
                <ListGroup.Item className='bg-transparent ps-0'>
                  <BsFillTelephoneFill className='text-muted me-2' />
                  <span className='text-muted'>089602391929</span>
                </ListGroup.Item>
                <ListGroup.Item className='bg-transparent ps-0'>
                  <MdEmail className='text-muted me-2' />
                  <span className='text-muted text-wrap'>excell.agcb12@ gmail.com</span>
                </ListGroup.Item>
              </ListGroup>
            </div>
          </Col>
        </Row>
        <Row>
          <Col lg={12}>
            <span className='d-block text-muted text-center mb-4'>Copyright {year}, developed by Excell. All rights reserved</span>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
