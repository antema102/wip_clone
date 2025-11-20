import React from 'react';
import {View, Text} from 'react-native';
import { styles } from './styles';

export const FooterCandidat = (totalCandidate:string) => {

  return (
    <View style={styles.footerContainer}>
      <Text
        style={
          styles.footerScreenLabel
        }>{`Profils trouvés ${totalCandidate}`}</Text>
      
    </View>
  );
};
