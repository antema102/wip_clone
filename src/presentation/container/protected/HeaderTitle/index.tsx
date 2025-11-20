import React from 'react';
import { ScrollView, TouchableOpacity, View, Text } from 'react-native';
import { styles } from './styles'
import { images } from '../../../../resources/constants';
interface headerTitle {
  title: string,
  _style?: object
  _styleText?:object
}

const HeaderTitle = ({ title, _style,_styleText }: headerTitle) => {
  return (
    <View style={[styles.headerCreateCv, _style]}>
      <Text style={[styles.headerCreateCvText,_styleText]}>{title}</Text>
      <img src={images.bannerImage} style={styles.headerCreateCvIcon} />
    </View>
  );
};

export default HeaderTitle;
