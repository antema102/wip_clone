import React from 'react';

import { styles } from './style';
import { DataView } from 'primereact/dataview';

interface appelOffersType {
  listOffers: string[];
  navigateCombinaisonCandidat: any;
}

const AppelOffers = ({
  listOffers,
  navigateCombinaisonCandidat,
}: appelOffersType) => {
  const itemOffers = (data: string, index: number) => {
    return (
      <button
        style={styles.appelOffersButton}
        onClick={() => navigateCombinaisonCandidat(index, data)}
      >
        <span style={styles.appelOffersButtonText}>{data}</span>
      </button>
    );
  };

  return (
    <div style={styles.appelOffersContainer}>
      <span style={styles.appelOffersTitle}>Appels d’offres :</span>
      <div style={styles.appelOffersContent}>
        <DataView
          value={listOffers}
          itemTemplate={(data, index) => itemOffers(data, index)}
          rows={2}
          paginator
          paginatorTemplate="PrevPageLink PageLinks NextPageLink"
        />
      </div>
    </div>
  );
};

export default AppelOffers;
