import React, { useState, useEffect } from 'react';
import { Container, Form, Row, Col, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import Loading from '../components/Loading/Loading';
import { auth } from '../firebase.config';

const initialState = {
  email: '',
  password: '',
};

const Login = () => {
  const [values, setValues] = useState(initialState);
  const { pathname } = useLocation();
  const { isloading, startLoading, stopLoading, alertMessage, clearAlert, alertSuccess, alertError, alertType, store } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const clearInput = () => {
    setValues({ ...values, ...initialState });
  };

  const handleInput = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    startLoading();
    clearAlert();
    const { email, password } = values;

    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      store.setLocal({ email: user.email, name: user.displayName, photoURL: user.photoURL });
      store.setCookies({ token: user.accessToken });
      alertSuccess('Login Success, Redirect...');
      setTimeout(() => {
        clearInput();
        clearAlert();
        stopLoading();
        navigate('/');
      }, 1500);
    } catch (error) {
      switch (error.code) {
        case 'auth/user-not-found':
          alertError('User Not Found');
          break;
        case 'auth/wrong-password':
          alertError('User Not Found');
          break;
        case 'auth/too-many-requests':
          alertError('Too Many Request, Please Refresh');
          return;
        default:
          console.log(error.code);
          break;
      }
    }
    stopLoading();
    return;
  };

  return (
    <section className='py-5'>
      <Container>
        <Row>
          <Col
            lg={6}
            className='m-auto p-4 bg-white shadow'>
            <h2 className='text-center'>Login</h2>
            {alertMessage && (
              <Alert
                className='text-center my-3'
                variant={alertType}>
                {alertMessage}
              </Alert>
            )}
            <Form
              autoComplete='off'
              autoCorrect='off'
              onSubmit={handleLogin}>
              <Form.Group className='mt-3'>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  disabled={isloading}
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
                  disabled={isloading}
                  onChange={handleInput}
                  value={values.password}
                  type='password'
                  required
                  name='password'
                  placeholder='Enter Password'
                />
              </Form.Group>

              <Button
                type='submit'
                variant='dark'
                className='w-100 my-3'
                disabled={isloading}>
                {isloading ? <Loading small /> : 'Login'}
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
