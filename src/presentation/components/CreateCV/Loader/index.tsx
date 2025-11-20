import React, {useEffect} from 'react';
import { Dialog } from 'primereact/dialog';

import styles from './styles';
import { COLORS } from '../../../../resources/constants';

export const Loader = () => {
  return (
    <div style={styles.centeredView}>
      <Dialog transparent={true} visible={true}>
        <div style={styles.centeredView}>
          <div style={styles.modalView}>
            <span className="spinner" size="large" color={COLORS.primary} />
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default Loader;
