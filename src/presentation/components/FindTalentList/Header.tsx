import React from 'react';
;
import { styles } from './styles';

export const HeaderScreen = ({ title, description }: { title: string, description: string }) => {
  return (
    <div style={styles.headerContainer}>
      <span style={styles.headerScreenTitle}>{title}</span>
      <span style={styles.headerScreenDescription}>{description}</span>
    </div>
  );
};
