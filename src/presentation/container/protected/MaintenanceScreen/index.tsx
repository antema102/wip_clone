import React from 'react';
import { styles } from './styles';
import { images } from '../../../../resources/constants';
const MaintenanceScreen = () => {
  return (
    <div style={styles.container}>
      <img src={images.logo} style={styles.logoWip} />
      <span style={styles.title}>WipWork en maintenance</span>
      <img
        src={
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLkEUUEXMjlpZNgCggb86TWss1L8ZNdmhE1hF32Jy1E4nIKMol7-XsFqkhdp5dKOFgfjc&usqp=CAU'
        }
        style={styles.image}
      />
      <span style={styles.text}>
        Dans le but d'améliorer ses performances, notre site est actuellement en
        cours de maintenance.
      </span>
      <span style={styles.text}>Merci de votre compréhension.</span>
    </div>
  );
};

export default MaintenanceScreen;
