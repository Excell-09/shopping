import React from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppContext } from './../context/AppContext';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Loading from './../components/Loading/Loading';
import './../styles/productDetail.css';
import convertusdtoidr from './../utils/convertusdtoidr';
import ProductsList from './../components/UI/ProductsList';

const ProductDetails = () => {
  const { products, getProductById, isloading, getProductRecomedation, productsRecomendation, isloadingReco } = useAppContext();
  const { id } = useParams();

  useEffect(() => {
    getProductById(id);
    getProductRecomedation();

    //eslint-disable-next-line
  }, []);

  console.log(productsRecomendation);

  let { title, image, description, price, rating } = products;
  price = new convertusdtoidr(price).formatString();

  return (
    <section>
      {isloading ? (
        <Col
          lg={12}
          className='text-center p-3'>
          <Loading />
        </Col>
      ) : (
        <Container>
          <Row className='py-5'>
            <>
              <Col
                lg={6}
                className='justify-content-center d-flex'>
                <div className='detail__img mb-5'>
                  <img
                    width={'100%'}
                    src={image}
                    alt={title}
                  />
                </div>
              </Col>
              <Col lg={6}>
                <h4>{title}</h4>
                <div className='d-flex align-items-center gap-1 mt-3'>
                  <div>
                    <i className='ri-star-fill text-warning'></i>
                    <i className='ri-star-fill text-warning'></i>
                    <i className='ri-star-fill text-warning'></i>
                    <i className='ri-star-fill text-warning'></i>
                    <i className='ri-star-fill text-warning'></i>
                  </div>
                  <div className='text-muted'> / From {rating?.rate && rating.count} People</div>
                </div>
                <p>{description}</p>
                <h5 className='text-danger fw-bold'>Rp {price}</h5>
                <Button
                  variant='info'
                  className='fw-bold text-light shadow mt-3'>
                  Add To Cart
                </Button>
              </Col>
            </>
            <Col lg={6}></Col>
          </Row>
          <Row className='my-5'>
            <Col lg={12}>
              <h3>Recomendasi</h3>
            </Col>
            {isloadingReco ? (
              <Col
                lg={12}
                className='text-center p-3'>
                <Loading />
              </Col>
            ) : (
              <ProductsList product={productsRecomendation} />
            )}
          </Row>
        </Container>
      )}
    </section>
  );
};

export default ProductDetails;
