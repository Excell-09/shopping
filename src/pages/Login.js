import React, { useState, useEffect } from 'react';
import { Container, Form, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const initialState = {
  email: '',
  password: '',
};

const Login = () => {
  const [values, setValues] = useState(initialState);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const handleInput = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    console.log(values);
  };

  return (
    <section className='py-4'>
      <Container>
        <Row>
          <Col
            lg={6}
            className='m-auto p-4 bg-white'>
            <h2 className='text-center'>Login</h2>
            <Form>
              <Form.Group className='mt-3'>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  onChange={handleInput}
                  value={values.email}
                  type='email'
                  required
                  name='email'
                  placeholder='Enter Email'
                />
              </Form.Group>
              <Form.Group className='mt-3'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  onChange={handleInput}
                  value={values.password}
                  type='password'
                  required
                  name='password'
                  placeholder='Enter Password'
                />
              </Form.Group>

              <Button
                variant='dark'
                className='w-100 my-3'>
                Login
              </Button>
              <p className='text-center'>
                Don't Have Account? <Link to={'/signup'}>Register</Link>
              </p>
            </Form>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Login;
