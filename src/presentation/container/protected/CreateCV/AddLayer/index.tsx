import React from 'react';
import {View, Text} from 'react-native';

import Buttons from '../../../../components/Button/button';
import { COLORS, icons } from '../../../../../resources/constants';
import globalStyle from '../../../../globalStyle/globalStyle';
import styles from '../styles';

export const AddLayer = props => {
  const {title, label, onChange, color, style} = props;
  return (
    <View
      style={[{justifyContent: 'space-between', flexDirection: 'row'}, style]}>
      <Text style={styles.titleBtn}>{title}</Text>
      <Buttons
        {...props}
        onPress={onChange}
        title={label}
        color={color}
        _style={[
          {
            width: 32,
            height: 32,
            backgroundColor: COLORS.orange,
            borderRadius: 18,
            paddingTop: 10,
          },
          globalStyle.elevationOrange,
          ,
        ]}
        icon={icons.plus}
        iconStyles={{
          marginTop: -5,
          marginLeft: 5,
          justifyContent: 'center',
          width: 20,
          height: 20,
        }}
      />
    </View>
  );
};
