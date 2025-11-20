import React from 'react';
import { TouchableOpacity, Dimensions, Text } from 'react-native';
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
  styleBtnOuter,
}: Props) => { 
  // Get the screen width using Dimensions
  const screenWidth = Dimensions.get('window').width;
  return (
  <>
    {!type && (
      <TouchableOpacity
        onPress={(e: any) => onPress(type)}
        style={[styles.appButtonContainerBtn, styleBtnOuter]}
      >
        <Text style={styleBtnTxt}>{title}</Text>
      </TouchableOpacity>
    )}
    {type && (
      <TouchableOpacity
        onPress={(e: any) => onPress(type)}
        style={[
          styles.appButtonContainer,
          type && type === 'valider' ? styles.validate : styles.inValidate,
          styleBtnOuter,
          type && type === 'valider'
            ? {
              marginRight: 4,
              marginLeft: 4,
              padding: 20,
            }
            : null,
        ]}
      >
        <Text style={styleBtnTxt}>{title}</Text>
      </TouchableOpacity>
    )}
  </>
)};
