import React from 'react';

import { styles } from './styles';
import { useMobile } from '../../../service/hooks/useMobile';
interface ViewDetailsType {
  label: string;
  value: string;
}
const ViewDetailsCandidat = ({ label, value }: ViewDetailsType) => {
  const { isMobile } = useMobile();
  return (
    <div style={isMobile ? '' : styles.containerText}>
      {!isMobile && <span style={styles.textLabel}>{label} :</span>}
      <div style={isMobile ? styles.contentTextMobile : {}}>
        {label === 'Experience' && isMobile && (
          <span style={{ fontSize: 12, fontWeight: '700' }}>Experience :</span>
        )}
        {label === 'Salaire brut (Ariary)' && isMobile ? (
          <span style={{ fontSize: 12 }}>{value} Ar</span>
        ) : (
          <span style={{ fontSize: 12 }}>{value}</span>
        )}
      </div>
    </div>
  );
};

export default ViewDetailsCandidat;
