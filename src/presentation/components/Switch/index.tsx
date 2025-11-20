import React from 'react';
import {View, Switch, StyleSheet, Text} from 'react-native';
import { COLORS, SIZES } from '../../../resources/constants';

interface Props {
  title?: string;
  value: boolean;
  onChangeValue: any;
  style?: any;
}
export const SwitchComponent = ({
  title,
  onChangeValue,
  value,
  style = {},
}: Props) => {
  return (
    <View style={[styles.container]}>
      <Text style={{fontSize: SIZES.h5}}>{title}</Text>
      <View>
        <Switch
          trackColor={{false: COLORS.blue_focused, true: COLORS.bleu_fonce_text}}
          thumbColor={value ? COLORS.darkgray : COLORS.bleu_fonce_text}
          onValueChange={onChangeValue}
          value={value}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    height: 30,
  },
});
