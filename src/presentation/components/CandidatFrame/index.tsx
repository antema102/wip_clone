import React from 'react';
;
import {styles} from './styles';

export const CandidatFrame = (title:string) => {
  return (
    <div style={[styles.blueBanner, styles.displayLeftHorizontal]}>
      <span style={[styles.displayCenterVertical, styles.text]}>{title}</span>
    </div>
  );
};
