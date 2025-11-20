import React from 'react';

import { COLORS, SIZES } from '../../../resources/constants';

interface Props {
  title?: string;
  value: boolean;
  onChangeValue: any;
  style?: any;
}
export const SwitchComponent = {
  title,
  onChangeValue,
  value,
  style = {}}: Props) => {
  return (
    <div style={[styles.container]}>
      <span style={{fontSize: SIZES.h5}}>{title}</span>
      <div>
        <input type="checkbox"
          trackColor={{false: COLORS.blue_focused, true: COLORS.bleu_fonce_text}}
          thumbColor={value ? COLORS.darkgray : COLORS.bleu_fonce_text}
          onValueChange={onChangeValue}
          value={value}
        />
      </div>
    </div>
  );
};
const styles = {
  container: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    height: 30}});
