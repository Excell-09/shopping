import React, { useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import heroImage from './../assets/hero_img.svg';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import './../styles/styles.css';
import Services from '../services/Services';
import ProductsList from '../components/UI/ProductsList';
import { useAppContext } from '../context/AppContext';
import Loading from '../components/Loading/Loading';
import TimePromo from '../components/UI/TimePromo';

const Home = () => {
  const year = new Date().getFullYear();
  const { getProducts, products, isloading } = useAppContext();
  const trendingProduct = products.slice(0, 4);
  const bestSeller = products.slice(4, 12);
  const newArrive = products.slice(12, 20);
  const promoProduct = products[products.length - 4];

  useEffect(() => {
    getProducts();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <section className='bg_primary '>
        <Container>
          <Row className='min-vh-100 align-items-center justify-content-center '>
            <Col
              lg={6}
              md={6}
              xs={12}>
              <article className='flex-column gap-1 d-flex align-items-start align-sm-center'>
                <h5 className='text-muted align-sm-center w-100'>Product Trend {year}</h5>
                <h2 className='text-capitalize align-sm-center w-100'>E-commerce terbesar no.1 indonesia</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit, qui necessitatibus cum minima consequuntur alias vel odio ipsa. Lorem ipsum dolor sit amet.</p>
                <motion.button
                  className='btn btn-primary align-self-center align-self-md-start'
                  whileTap={{ scale: 1.15 }}>
                  <Link
                    className='w-100 h-100 text-white'
                    to='/shop'>
                    Shop Now
                  </Link>
                </motion.button>
              </article>
            </Col>
            <Col
              lg={6}
              md={6}
              className='d-none d-md-flex'>
              <div className='justify-content-end d-flex '>
                <img
                  width={'85%'}
                  src={heroImage}
                  alt='heroimage'
                />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <Services />

      <section className='mt-5'>
        <Container>
          <Row>
            <Col lg={12}>
              <h2 className='text-center mb-4 fw-bold'>Trending Product</h2>
            </Col>
            {isloading ? (
              <Col
                lg={12}
                className='d-flex justify-content-center'>
                <Loading />
              </Col>
            ) : (
              <ProductsList products={trendingProduct} />
            )}
          </Row>
        </Container>
      </section>

      {isloading === false && (
        <>
          <section className='mt-5'>
            <Container>
              <Row>
                <Col lg={12}>
                  <h2 className='text-center mb-4 fw-bold'>Trending Product</h2>
                </Col>
                <ProductsList products={bestSeller} />
              </Row>
            </Container>
          </section>

          <section className='mt-5 bg-dark p-5'>
            <Container>
              <Row>
                <Col
                  lg={6}
                  className='mb-4 text-center'>
                  <div className='text-white'>
                    <h6 className='text-muted'>Limited Product</h6>
                    <h3>{promoProduct?.title && promoProduct.title}</h3>
                    <p>{promoProduct?.title && promoProduct.title}</p>
                  </div>
                  <TimePromo />
                  <Button>
                    <Link
                      className='text-white'
                      to={`shop/${promoProduct?.id && promoProduct.id}`}>
                      Buy Now!!!
                    </Link>
                  </Button>
                </Col>
                <Col
                  lg={6}
                  className='text-center'>
                  <img
                    className='promo__Image'
                    src={promoProduct?.image && promoProduct.image}
                    alt={promoProduct?.title && promoProduct.title}
                  />
                </Col>
              </Row>
            </Container>
          </section>

          <section className='mt-5'>
            <Container>
              <Row>
                <Col lg={12}>
                  <h2 className='text-center mb-4 fw-bold'>New Arrive</h2>
                </Col>
                <ProductsList products={newArrive} />
              </Row>
            </Container>
          </section>
        </>
      )}
    </>
  );
};

export default Home;
