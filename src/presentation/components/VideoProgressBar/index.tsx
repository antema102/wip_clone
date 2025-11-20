import React from 'react';

import { styles } from './styles';

interface Props {
  progressBar: any;
  waitingText: string;
  goBack?: any;
}

const VideoProgressBar = ({ progressBar, waitingText, goBack }: Props) => {
  return (
    <div style={styles.containerModal}>
      <div style={{ height: 15 }}></div>
      <div style={{ paddingVertical: 7 }}>
        <span style={styles.waitingText}>{waitingText}</span>
      </div>
      <div style={{ height: 10 }}></div>
      <div style={styles.progressContainer}>
        <div style={{ ...styles.inner, width: `${progressBar}%` }} />
        <span style={styles.label}>{progressBar}%</span>
      </div>
      <div style={{ height: 10 }}></div>
      <div style={{ paddingVertical: 7 }}>
        <button
          style={{ ...styles.button, ...styles.buttonClose }}
          onClick={goBack}
        >
          <span style={styles.textStyle}>Annuler</span>
        </button>
      </div>
    </div>
  );
};

export default VideoProgressBar;
