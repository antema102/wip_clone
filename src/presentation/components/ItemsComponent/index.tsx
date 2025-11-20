import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { resultDate } from '../../../data/factory/dateFactory';
import { images } from '../../../resources/constants';
import styles from './styles';

const ItemsComponent = props => {
  const {offer, showDetails, index} = props;
  return (
    <TouchableOpacity
      key={index}
      style={styles.card_templateItem}
      onPress={() => showDetails(offer.id)}>
      <Image source={images.avatar_6} style={styles.image} />
      <View style={styles.wrapperTextItem}>
        <Text style={styles.title}>{offer.title}</Text>
        <Text style={styles.jobPlaceItem}>{offer.place}</Text>
      </View>
      <View style={styles.footerFrame}>
        <Text style={styles.candidatExp}>{resultDate(offer.createdAt)}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ItemsComponent;
