import React from 'react';
;
import {styles} from './styles';

const ProgressBar = props => {
  const {bgcolor, level} = props;

  return (
    <div style={styles.containerStyles}>
      <div
        style={[
          styles.fillerStyles,
          {backgroundColor: bgcolor, width: `${level}%`},
        ]}
      />
    </div>
  );
};

export default ProgressBar;
