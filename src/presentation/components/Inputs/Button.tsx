import React from 'react';
;
import styles  from './style';

interface Props {
  onPress: any;
  title: string;
  type?: string;
  styleBtnTxt?: any;
  styleBtnOuter?: any;
}
export default ({
  onPress,
  title,
  type,
  styleBtnTxt,
  styleBtnOuter}: Props) => { 
  // Get the screen width using Dimensions
  const screenWidth = window.innerWidth;
  return (
  <>
    {!type && (
      <button
        onClick={(e: any) => onPress(type)}
        style={[styles.appButtonContainerBtn, styleBtnOuter]}
      >
        <span style={styleBtnTxt}>{title}</span>
      </button>
    )}
    {type && (
      <button
        onClick={(e: any) => onPress(type)}
        style={{...styles.appButtonContainer, ...(type && type === 'valider' ? styles.validate : styles.inValidate), ...styleBtnOuter, ...(type && type === 'valider'
            ? {
              marginRight: 4), ...marginLeft: 4, ...padding: 20}
            : null, ...}}
      >
        <span style={styleBtnTxt}>{title}</span>
      </button>
    )}
  </>
)};
