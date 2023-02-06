import React, { useState } from 'react';
import { useEffect } from 'react';
import { Container, Form, Row, Col, Button, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { auth } from '../firebase.config';
import Loading from './../components/Loading/Loading';
import { useAppContext } from './../context/AppContext';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { setDoc, doc } from 'firebase/firestore';
import { storage } from '../firebase.config';
import { db } from '../firebase.config';

const initialState = {
  username: '',
  email: '',
  password: '',
  passwordConfirm: '',
};

const SignUp = () => {
  const [values, setValues] = useState(initialState);
  const [file, setFile] = useState(null);
  const { pathname } = useLocation();
  const { isloading, startLoading, stopLoading, alertSuccess, alertError, clearAlert, alertMessage, alertType } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const handleInput = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const clearInput = () => {
    setValues({ ...values, ...initialState });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, email, password, passwordConfirm } = values;
    startLoading();
    clearAlert();

    if (password !== passwordConfirm) {
      alertError('Password Not Match');
      console.log(alertMessage);
      stopLoading();
      return;
    }

    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);

      // this code not running why?
      const storageRef = ref(storage, `images/${Date.now() + ' ' + username}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.then(() => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          await updateProfile(user, {
            displayName: username,
            photoURL: downloadURL,
          });

          await setDoc(doc(db, 'users', user.uid), {
            uid: user.uid,
            displayName: username,
            email,
            photoURL: downloadURL,
          });
        });
      });
      alertSuccess('Account Created, Redirect...');
      clearInput();
      setTimeout(() => {
        navigate('/login');
        stopLoading();
        clearAlert();
      }, 1500);
    } catch (error) {}
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
            <h2 className='text-center'>Sign up</h2>
            {alertMessage !== '' && (
              <Alert
                variant={alertType}
                className='text-center my-3'>
                {alertMessage}
              </Alert>
            )}
            <Form
              onSubmit={handleSubmit}
              autoComplete='off'
              autoCorrect='off'>
              <Form.Group className='mt-3'>
                <Form.Label>Username</Form.Label>
                <Form.Control
                  disabled={isloading}
                  onChange={handleInput}
                  value={values.username}
                  type='text'
                  required
                  name='username'
                  placeholder='Enter username'
                />
              </Form.Group>
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
              <Form.Group className='mt-3'>
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  disabled={isloading}
                  onChange={handleInput}
                  value={values.passwordConfirm}
                  type='password'
                  required
                  name='passwordConfirm'
                  placeholder='Enter Confirm Password'
                />
              </Form.Group>
              <Form.Group className='mt-3'>
                <Form.Label>Photo Profile</Form.Label>
                <Form.Control
                  disabled={isloading}
                  onChange={(e) => setFile(e.target.files[0])}
                  type='file'
                />
              </Form.Group>

              <Button
                variant='dark'
                type='submit'
                disabled={isloading}
                className='w-100 my-3 d-flex justify-content-center align-items-center p-2'>
                {isloading ? <Loading small /> : 'Sign Up'}
              </Button>
              <p className='text-center'>
                Already Have Account? <Link to={'/login'}>Register</Link>
              </p>
            </Form>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default SignUp;
