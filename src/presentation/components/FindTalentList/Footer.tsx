import React from 'react';
;
import { styles } from './styles';

export const FooterCandidat = (totalCandidate:string) => {

  return (
    <div style={styles.footerContainer}>
      <span
        style={
          styles.footerScreenLabel
        }>{`Profils trouvés ${totalCandidate}`}</span>
      
    </div>
  );
};
