import React from 'react';
import './loading.css';

const Loading = ({small=false}) => {
  return <div className={`${small ? 'small-loading' : 'loading'}`} />;
};

export default Loading;
