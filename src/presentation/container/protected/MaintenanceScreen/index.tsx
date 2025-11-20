import React from 'react';
import { View, Image, Text } from 'react-native';
import { styles } from './styles';
import { images } from '../../../../resources/constants';

const MaintenanceScreen = () => {
  return (
    <View style={styles.container}>
      <Image
        source={images.logo}
        style={styles.logoWip}
      />
      <Text style={styles.title}>WipWork en maintenance</Text>
      <Image
        source={{
          uri:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLkEUUEXMjlpZNgCggb86TWss1L8ZNdmhE1hF32Jy1E4nIKMol7-XsFqkhdp5dKOFgfjc&usqp=CAU',
        }}
        style={styles.image}
      />
      <Text style={styles.text}>
        Dans le but d'améliorer ses performances, notre site est actuellement en cours de maintenance.
      </Text>
      <Text style={styles.text}>
        Merci de votre compréhension.
      </Text>
    </View>
  );
};

export default MaintenanceScreen;
