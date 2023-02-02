import React from 'react';
import './services.css';
import { Container, Row, Col } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { FaMotorcycle, FaMoneyBillAlt } from 'react-icons/fa';
import { BiPackage } from 'react-icons/bi';
import { AiFillStar } from 'react-icons/ai';

const Services = () => {
  return (
    <section className='my-5'>
      <Container>
        <Row>
          <Col
            lg='3'
            md='4'>
            <motion.div
              whileHover={{ scale: 1.15 }}
              className='d-flex align-items-center justify-content-center gap-2 p-3 bg-success'>
              <FaMotorcycle
                size={'3.5rem'}
                className='rounded-5 text-white p-2 bg-dark'
              />
              <div>
                <h6 className='fw-bold fs-5'>Gratis ongkir</h6>
                <p className='text-white'>Lorem ipsum dolor sit amet.</p>
              </div>
            </motion.div>
          </Col>
          <Col
            lg='3'
            md='4'>
            <motion.div
              whileHover={{ scale: 1.15 }}
              className='d-flex align-items-center justify-content-center gap-2 p-3  bg-info'>
              <FaMoneyBillAlt
                size={'3.5rem'}
                className='rounded-5 text-white p-2 bg-dark'
              />
              <div>
                <h6 className='fw-bold fs-5'>Garansi 100%</h6>
                <p className='text-white'>Lorem ipsum dolor sit amet.</p>
              </div>
            </motion.div>
          </Col>
          <Col
            lg='3'
            md='4'>
            <motion.div
              whileHover={{ scale: 1.15 }}
              className='d-flex align-items-center justify-content-center gap-2 p-3  bg-warning'>
              <AiFillStar
                size={'3.5rem'}
                className='rounded-5 text-white p-2 bg-dark'
              />
              <div>
                <h6 className='fw-bold fs-5'>Original 100%</h6>
                <p className='text-white'>Lorem ipsum dolor sit amet.</p>
              </div>
            </motion.div>
          </Col>
          <Col
            lg='3'
            md='4'>
            <motion.div
              whileHover={{ scale: 1.15 }}
              className='d-flex align-items-center justify-content-center gap-2 p-3  bg-primary'>
              <BiPackage
                size={'3.5rem'}
                className='rounded-5 text-white p-2 bg-dark'
              />
              <div>
                <h6 className='fw-bold fs-5'>Aman</h6>
                <p className='text-white'>Lorem ipsum dolor sit amet.</p>
              </div>
            </motion.div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Services;
