import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import { buttonsStyles } from '../../../globalStyle/boutonStyle';
import { SIZES, icons } from '../../../../resources/constants';
import globalStyle from '../../../globalStyle/globalStyle';

interface Props {
  title: string;
  btnLabel?: boolean;
  onPress: any;
  name: string;
}

export const LayerSwitch = ({ title, btnLabel, onPress, name }: Props) => {
  const handleChange = () => {
    onPress(name);
  };

  const optionalFieldTitle = 'Optionnel';

  return (
    <View style={styles.layerTitleContainer}>
      <Text>
        <Text style={buttonsStyles.titleSwitch}>{title}</Text>
        {name === 'more' ? (
          <Text
            style={[
              buttonsStyles.titleSwitch,
              { fontSize: SIZES.h5 },
            ]}>{` (${optionalFieldTitle})`}</Text>
        ) : null}
      </Text>
      <TouchableOpacity
        style={[styles.imgContainer, globalStyle.elevationBlue]}
        onPress={handleChange}>
        {btnLabel ? (
          <Image source={{ uri: icons.arrowFldown }} style={styles.iconMoins} />
        ) : (
          <Image source={{ uri: icons.arrowFlup }} style={styles.iconPlus} />
        )}
      </TouchableOpacity>
    </View>
  );
};
