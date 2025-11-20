import React, { useState, useEffect } from 'react';
import { Dialog } from 'primereact/dialog';

import { useNavigate } from 'react-router-dom';

import { images } from '../../../resources/constants';

import { styles } from './styles';

export const PaymentWays = (props) => {
  const navigate = useNavigate();
  const handleOrangePayment = () => {
    navigate('/CBScreen#top', { state: { type: 'orange' } });
    window.scrollTo(0, 0);
  };
  const handleMvolaPayment = () => {
    navigate('/CBScreen#top', { state: { type: 'mvola' } });
    window.scrollTo(0, 0);
  };
  const handleVisaPayment = () => {
    navigate('/CBScreen#top', { state: { type: 'visa' } });
    window.scrollTo(0, 0);
  };
  return (
    <div style={styles.container}>
      <div style={styles.alignHorizontally}>
        {/* <button onClick={handleMvolaPayment}>
          <img
            style={styles.imgStyle}
            src={images.mvola}
          />
        </button> */}
        <div style={styles.intermediate} />
        <button onClick={handleOrangePayment}>
          <img style={styles.imgStyle} src={images.orangeMoney} />
        </button>
        <div style={styles.intermediate} />
        <button onClick={handleVisaPayment}>
          <img style={styles.imgStyle} src={images.visa} />
        </button>
      </div>
    </div>
  );
};
