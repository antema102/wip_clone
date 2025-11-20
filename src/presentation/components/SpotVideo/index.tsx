import React from 'react';
;
import {styles} from './styles';

export const SpotVideo = props => {
  const {data, navigation, showingTheVideo} = props;
  const advertisementImage = `${data?.thumbnail}`;
  return (
    <div style={styles.candidateContainer}>
      <button
        style={{flexDirection: 'row', paddingVertical: 15}}
        onClick={async () => await showingTheVideo(data.id)}>
        <div style={styles.candidateImgContainer}>
          <img
            style={styles.candidatImg}
            src={{uri: advertisementImage}}
          />
        </div>
        <div style={styles.candidateDetailsContainer}>
          <span style={styles.candidatName}>{data.name}</span>
          <span style={{color: 'black'}}>{data.description}</span>
        </div>
      </button>
    </div>
  );
};
