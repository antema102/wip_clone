import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import styles from './styles';
import { images } from '../../../../../resources/constants';

const FlatOffer = props => {
  const {variable, displayDetail, avatar,imageStyle} = props;
  return (
    <TouchableOpacity onPress={() => displayDetail(variable)}>
      <View style={styles.itemWrapperOffer}>
        <View style={styles.itemOffer}>
          <Image
            style={[styles.logoSte,imageStyle]}
            source={avatar ? {uri: avatar} : images.avatar_6}
          />
          <View style={styles.textAlign}>
            <View>
              <Text style={styles.titlePost} numberOfLines={1}>
                {variable.name}
              </Text>
            </View>
            <View style={{paddingVertical: 5}}>
              <Text style={styles.lieuPost}>{variable.lieu}</Text>
            </View>
            <View>
              <Text style={styles.periodePost}>{variable.date}</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default FlatOffer;
