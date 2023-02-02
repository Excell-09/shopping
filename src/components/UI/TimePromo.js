import React from 'react';
import { useState, useLayoutEffect } from 'react';

const TimePromo = () => {
  const [days, setDays] = useState(null);
  const [hours, sethours] = useState(null);
  const [minutes, setminutes] = useState(null);
  const [seconds, setseconds] = useState(null);

  let interval;

  const getCount = () => {
    const destination = new Date('Oct 10, 2023').getTime();

    interval = setInterval(() => {
      const now = new Date().getTime();
      const deffrent = destination - now;

      const day = Math.floor(deffrent / (1000 * 60 * 60 * 24));
      const hour = Math.floor((deffrent % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((deffrent % (1000 * 60 * 60)) / (1000 * 60));
      const second = Math.floor((deffrent % (1000 * 60)) / 1000);

      if (destination < 0) clearInterval(interval.current);
      else {
        setDays(day);
        sethours(hour);
        setminutes(minutes);
        setseconds(second);
      }
    });
  };

  useLayoutEffect(() => {
    getCount();
  });

  return (
    <div className='text-white d-flex align-items-center gap-3 mb-3 justify-content-center'>
      <div className='text-white d-flex align-items-center gap-3'>
        <div>
          <h6>Days</h6>
          <h3 className='text-center'>{days}</h3>
        </div>
        <span className='fs-1'>:</span>
      </div>
      <div className='text-white d-flex align-items-center gap-3'>
        <div>
          <h6>Hours</h6>
          <h3 className='text-center'>{hours}</h3>
        </div>
        <span className='fs-1'>:</span>
      </div>
      <div className='text-white d-flex align-items-center gap-3'>
        <div>
          <h6>Minutes</h6>
          <h3 className='text-center'>{minutes}</h3>
        </div>
        <span className='fs-1  d-none d-sm-block'>:</span>
      </div>
      <div className='text-white d-flex align-items-center gap-3 d-none d-sm-block'>
        <div>
          <h6>Second</h6>
          <h3 className='text-center'>{seconds}</h3>
        </div>
      </div>
    </div>
  );
};

export default TimePromo;
