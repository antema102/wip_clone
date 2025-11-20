import React, { useEffect, useState } from 'react';

import { resultDate } from '../../../data/factory/dateFactory';
import { images } from '../../../resources/constants';
import styles from './styles';

const ItemsComponent = (props) => {
  const { offer, showDetails, index } = props;
  return (
    <button
      key={index}
      style={styles.card_templateItem}
      onClick={() => showDetails(offer.id)}
    >
      <img src={images.avatar_6} style={styles.image} />
      <div style={styles.wrapperTextItem}>
        <span style={styles.title}>{offer.title}</span>
        <span style={styles.jobPlaceItem}>{offer.place}</span>
      </div>
      <div style={styles.footerFrame}>
        <span style={styles.candidatExp}>{resultDate(offer.createdAt)}</span>
      </div>
    </button>
  );
};

export default ItemsComponent;
