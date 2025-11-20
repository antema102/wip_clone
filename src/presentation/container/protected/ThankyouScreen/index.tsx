import React, { useEffect, useState } from 'react';
import { View, Text, Image } from 'react-native';

import { styles } from './styles';
import { FONTS, SIZES, COLORS, images, icons } from '../../../../resources/constants';
import { ERROR, HOME, INSCRIPTION, ROLEACCOUNT } from '../../../../data/constants/strings';


export const ThankyouScreen = (props: any): any => {
 
  useEffect(() => {
    setTimeout(() => {
      window.postMessage('close', '*');
      window.opener?.postMessage('close', '*');
    }, 5000);
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <View style={styles.logoForm}>
        <Image
            source={icons.greenCheck}
            style={{ width: '100%', height: 200, resizeMode: 'contain' }}
          />
          <Image
            source={images.logo}
            style={{ width: '100%', height: 200, resizeMode: 'contain' }}
          />
          <View style={{ width: '100%', height: 200, marginTop: 30 }}>
            <Text style={[{ color: COLORS.black, fontWeight: 'bold',  textAlign: 'center' }, FONTS.h2]}>
              {HOME.THANKYOU}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};
