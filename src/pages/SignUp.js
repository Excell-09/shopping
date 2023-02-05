import React, { useState } from 'react';
import { useEffect } from 'react';
import { Container, Form, Row, Col, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { auth } from '../firebase.config';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import Loading from './../components/Loading/Loading';
import { useAppContext } from './../context/AppContext';
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

const notif = {
  type: '',
  message: '',
};

const SignUp = () => {
  const [values, setValues] = useState(initialState);
  const [response, setResponese] = useState(notif);
  const [file, setFile] = useState('');
  const { pathname } = useLocation();
  const { isloading, startLoading, stopLoading } = useAppContext();

  const apperNotif = (status, messages) => {
    if (status === 'error') {
      setResponese({ type: 'danger', message: messages });
      return;
    }
    setResponese({ type: 'success', message: messages });
  };
  const disbaleNotif = () => {
    setResponese({ type: '', message: '' });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const handleInput = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const handleInputPhoto = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, email, password, passwordConfirm } = values;
    startLoading();
    disbaleNotif();

    if (password !== passwordConfirm) {
      apperNotif('error', 'Password Not Match');
      stopLoading();
      return;
    }

    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      console.log(user);
      const storageRef = await ref(storage, `images/${Date.now() + username}`);
      const uploadTask = await uploadBytesResumable(storageRef, file);

      uploadTask.on(
        (error) => {
          apperNotif('error', error.message);
        },
        async () => {
          await getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
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
        }
      );
    } catch (error) {
      apperNotif('error', error);
    }
    stopLoading();
    return;
  };

  return (
    <section className='py-4'>
      <Container>
        <Row>
          <Col
            lg={6}
            className='m-auto p-4 bg-white'>
            <h2 className='text-center'>Sign up</h2>
            {response?.message && (
              <Alert
                variant={response.type}
                className='text-center my-3'>
                {response.message}
              </Alert>
            )}
            <Form
              onSubmit={handleSubmit}
              autoComplete='off'
              autoCorrect='off'>
              <Form.Group className='mt-3'>
                <Form.Label>username</Form.Label>
                <Form.Control
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
              <Form.Group className='mt-3'>
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
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
                  onChange={handleInputPhoto}
                  type='file'
                />
              </Form.Group>

              <Button
                variant='dark'
                type='submit'
                disabled={isloading}
                className='w-100 my-3 d-flex justify-content-center align-items-center p-2'>
                {isloading ? <Loading small /> : 'SignUp'}
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
