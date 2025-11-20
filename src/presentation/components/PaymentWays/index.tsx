import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, Modal, Image } from 'react-native';
import { useNavigate } from 'react-router-dom';

import { images } from '../../../resources/constants';

import { styles } from './styles';

export const PaymentWays = props => {
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
    <View style={styles.container}>
      <View style={styles.alignHorizontally}>
        {/* <Pressable onPress={handleMvolaPayment}>
          <Image
            style={styles.imgStyle}
            source={images.mvola}
          />
        </Pressable> */}
        <View style={styles.intermediate} />
        <Pressable onPress={handleOrangePayment}>
          <Image
            style={styles.imgStyle}
            source={images.orangeMoney}
          />
        </Pressable>
        <View style={styles.intermediate} />
        <Pressable onPress={handleVisaPayment}>
          <Image
            style={styles.imgStyle}
            source={images.visa}
          />
        </Pressable>
      </View>
    </View>
  );
};
