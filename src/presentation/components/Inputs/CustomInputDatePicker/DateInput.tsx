import React from 'react';
;
import { COLORS, SIZES } from '../../../../resources/constants';
import { formsStyles } from '../../../globalStyle/formStyles';

interface Props {
  onPress: any;
  title: string;
  type?: string;
  value: Date;
  error?: any;
  showError?: any;
  todayDate?: boolean;
  isEditable?: boolean;
}
export default ({
  onPress,
  title,
  type,
  value,
  error,
  showError,
  todayDate,
  isEditable}: Props) => {

  if (!todayDate) {

    return (
      <button
        onClick={(e: any) => {
          e.preventDefault();
          onPress(type);
        }}
        style={{...formsStyles.itemInputStyle, ...showError && error !== '' && formsStyles.inputError, ...{
            justifyContent: 'flex-start', ...alignItems: 'center'}, ...({
            backgroundColor: !isEditable
              ? '#ffffff'
              : 'rgba(240), ...244, ...248, ...0.87)'}, ...}}>
        <span style={{ color: COLORS.black}}>{title}</span>
        {/* <img
          style={[formsStyles.dateIcon, { position: 'absolute', right: 20}]}
          src={require('../../../../ressources/images/date.png')}
        /> */}
      </button>
    );
  }
  return (
    <div>
      <button
        onClick={(e: any) => {
          e.preventDefault();
          onPress(type);
        }}
        style={{...formsStyles.itemInputStyle, ...{
            justifyContent: 'flex-start', ...alignItems: 'center', ...paddingHorizontal: 16}, ...({
            backgroundColor: !isEditable
              ? '#ffffff'
              : 'rgba(240), ...244, ...248, ...0.87)'}, ...}}>
        <span>{title}</span>
      </button>
    </div>
  );
};
