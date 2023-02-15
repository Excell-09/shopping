import React from 'react';
import { AiFillCheckCircle } from 'react-icons/ai';

const Payment = () => {
  return (
    <div className='min-vh-100 d-flex align-items-center justify-content-center'>
      <AiFillCheckCircle className='text-success fs-1 m' />
      <h1 className='font-bold fs-1'>Payment Success</h1>
    </div>
  );
};

export default Payment;
