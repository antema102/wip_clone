import React from 'react';
import {View} from 'react-native';
import {styles} from './styles';

const ProgressBar = props => {
  const {bgcolor, level} = props;

  return (
    <View style={styles.containerStyles}>
      <View
        style={[
          styles.fillerStyles,
          {backgroundColor: bgcolor, width: `${level}%`},
        ]}
      />
    </View>
  );
};

export default ProgressBar;
