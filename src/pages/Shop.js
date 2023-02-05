import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useAppContext } from '../context/AppContext';
import './../styles/shop.css';
import ProductsList from './../components/UI/ProductsList';
import Loading from './../components/Loading/Loading';

const initialState = {
  categories: '',
  sort: '',
  search: '',
};

const Shop = () => {
  const [values, setValues] = useState(initialState);
  const { getProducts, products, isloading } = useAppContext();

  useEffect(() => {
    const { categories, sort, search } = values;
    getProducts({ categories, sorte: sort, search });

    //eslint-disable-next-line
  }, [values]);

  const filterCategory = [
    { display: 'filter by category', value: '' },
    { display: 'electronics', value: 'electronics' },
    { display: 'jewelery', value: 'jewelery' },
    { display: "men's clothing", value: "men's clothing" },
    { display: "women's clothing", value: "women's clothing" },
  ];

  const sortBy = [
    {
      display: 'Sort By',
      value: 'asc',
    },
    {
      display: 'A-Z',
      value: 'asc',
    },
    {
      display: 'Z-A',
      value: 'desc',
    },
  ];

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setValues({ ...values, [name]: value });
  };

  return (
    <section className='py-5'>
      <Container>
        <h2>Search</h2>
        <Row>
          <Col
            lg={3}
            md={3}
            className='mb-3'>
            <Form>
              <Form.Select
                name='categories'
                value={values.categories}
                onChange={handleInput}
                className='text-capitalize'>
                {filterCategory.map((item, i) => {
                  return (
                    <option
                      key={i}
                      className='text-capitalize'
                      value={item.value}>
                      {item.display}
                    </option>
                  );
                })}
              </Form.Select>
            </Form>
          </Col>
          <Col
            lg={2}
            md={2}
            className='mb-3'>
            <Form>
              <Form.Select
                name='sort'
                value={values.sort}
                onChange={handleInput}
                className='text-capitalize'>
                {sortBy.map((item, i) => {
                  return (
                    <option
                      key={i}
                      className='text-capitalize'
                      value={item.value}>
                      {item.display}
                    </option>
                  );
                })}
              </Form.Select>
            </Form>
          </Col>
          <Col
            lg={6}
            md={6}
            className='mb-3'>
            <div className='search-box d-flex align-items-center border-1 w-100'>
              <Form.Control
                name='search'
                value={values.search}
                onChange={handleInput}
                type='text'
                placeholder='Search...'
                className='bg-transparent border-none Myform-control'
              />
              <span>
                <i className='ri-search-line pointer fs-4'></i>
              </span>
            </div>
          </Col>
          <Col
            lg={1}
            md={1}>
            <Button
              variant='danger'
              type='reset'
              onClick={(e) => {
                e.preventDefault();

                return setValues({ ...values, ...initialState });
              }}>
              Reset
            </Button>
          </Col>
        </Row>

        {isloading ? (
          <div className='w-100 d-flex justify-content-center my-3'>
            <Loading />
          </div>
        ) : (
          <section>
            <Container>
              <Row>
                <ProductsList product={products} />
              </Row>
            </Container>
          </section>
        )}
      </Container>
    </section>
  );
};

export default Shop;
