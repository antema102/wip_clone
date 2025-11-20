import React, { useEffect, useState } from 'react';
import { View, Text, Image } from 'react-native';

import { styles } from './styles';
import { FONTS, COLORS, images, icons } from '../../../../resources/constants';
import { HOME } from '../../../../data/constants/strings';


export const CancelScreen = () => {

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
            source={{ uri: icons.cancel }}
            style={{ width: '100%', height: 200, resizeMode: 'contain' }}
          />
          <Image
            source={{ uri: images.logo }}
            style={{ width: '100%', height: 200, resizeMode: 'contain' }}
          />
          <View style={{ width: '100%', height: 200, marginTop: 30 }}>
            <Text style={[{ color: COLORS.black, fontWeight: 'bold', textAlign: 'center' }, FONTS.h2]}>
              {HOME.CANCEL}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};
