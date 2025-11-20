import React, { useEffect } from 'react';
import { Dialog } from 'primereact/dialog';

import styles from './styles';
import { SIZES, COLORS, FONTS } from '../../../resources/constants';
// import { useEffect } from "react";

export const Loader = () => {
  return (
    <div style={styles.centeredView}>
      <Dialog transparent={true} visible={true}>
        <div style={styles.centeredView}>
          <div style={styles.modalView}>
            <span className="spinner" size="large" color={COLORS.secondary} />
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default Loader;
