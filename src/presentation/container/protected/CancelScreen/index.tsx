import React, { useEffect, useState } from 'react';
;

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
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <div style={styles.logoForm}>
          <img
            src={{ uri: icons.cancel }}
            style={{ width: '100%', height: 200, objectFit: 'contain' as const }}
          />
          <img
            src={{ uri: images.logo }}
            style={{ width: '100%', height: 200, objectFit: 'contain' as const }}
          />
          <div style={{ width: '100%', height: 200, marginTop: 30 }}>
            <span style={[{ color: COLORS.black, fontWeight: 'bold', textAlign: 'center' }, FONTS.h2]}>
              {HOME.CANCEL}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
