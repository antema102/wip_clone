import React from 'react';
import {View, Text, Image} from 'react-native';
import globalStyle from '../../../globalStyle/globalStyle';
import { images } from '../../../../resources/constants';

export const HeaderContainer = () => {
  return (
    <View
      style={[
        {elevation: 0},
        globalStyle.blueBanner,
        globalStyle.smallHeaderContainer,
      ]}>
      <View style={[globalStyle.alignTxtHeader]}>
        <Text style={globalStyle.headerScreenTitle}>Créer votre CV</Text>
        <Text style={[{maxWidth: '70%'}, globalStyle.headerScreenDescription]}>
          Veuillez remplir les différentes informations pour compléter votre CV
        </Text>
      </View>
      <Image style={globalStyle.imgBannerNotcrop} source={images.cvcreate} />
    </View>
  );
};
