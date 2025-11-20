import React from 'react';
;
import styles from './styles';
import { images } from '../../../../../resources/constants';

const FlatOffer = props => {
  const {variable, displayDetail, avatar,imageStyle} = props;
  return (
    <button onClick={() => displayDetail(variable)}>
      <div style={styles.itemWrapperOffer}>
        <div style={styles.itemOffer}>
          <img
            style={[styles.logoSte,imageStyle]}
            src={avatar ? {uri: avatar} : images.avatar_6}
          />
          <div style={styles.textAlign}>
            <div>
              <span style={styles.titlePost} numberOfLines={1}>
                {variable.name}
              </span>
            </div>
            <div style={{paddingVertical: 5}}>
              <span style={styles.lieuPost}>{variable.lieu}</span>
            </div>
            <div>
              <span style={styles.periodePost}>{variable.date}</span>
            </div>
          </div>
        </div>
      </div>
    </button>
  );
};

export default FlatOffer;
