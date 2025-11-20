import React from 'react';
;
import { styles } from './styles';

export const HeaderScreen = (title: string) => {
  return (
    <div style={[styles.blueBanner, styles.displayLeftHorizontal]}>
      <span style={[styles.displayCenterVertical, styles.headerFullTitle]}>
        {title}
      </span>
    </div>
  );
};
