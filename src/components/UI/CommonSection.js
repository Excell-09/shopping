import React from 'react';
import { Container } from 'react-bootstrap';
import './../../styles/CommonSection.css';

const CommonSection = ({ title }) => {
  return (
    <section className='bg-dark bg-opacity-75 height-banner w-100 align-items-center justify-content-center'>
      <Container>
        <h1 className='text-white'>{title}</h1>
      </Container>
    </section>
  );
};

export default CommonSection;
