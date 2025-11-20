import React from 'react';

import { Divider } from 'primereact/divider';
import styles from './styles';

interface ButtonAsideProps {
  title: string;
  onPress?: any;
  icon?: any;
  toogle?: any;
}

const ButtonAside = ({ title, onPress, icon, toogle }: ButtonAsideProps) => {
  return toogle ? (
    <div style={styles.containerButton}>
      <div style={styles.button}>
        <div style={styles.buttonContent}>
          <img src={icon} style={styles.buttonIcon} />
          <span style={styles.buttonTitle}>{title}</span>
        </div>
      </div>
      <Divider type="solid" />
    </div>
  ) : (
    <div style={styles.containerButton}>
      <button style={styles.button} onClick={onPress}>
        <div style={styles.buttonContent}>
          <img src={icon} style={styles.buttonIcon} />
          <span style={styles.buttonTitle}>{title}</span>
        </div>
      </button>
      <Divider type="solid" />
    </div>
  );
};

export default ButtonAside;
