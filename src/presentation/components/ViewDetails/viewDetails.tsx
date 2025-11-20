import React from 'react';
import {View,  Image, Text} from 'react-native';
import { images } from '../../../resources/constants';
import { viewStyles } from './style';

interface Props {
  label: string;
  value: string;
}

const getLabel = (label, value) => {
  switch (label) {
    case 'experience':
      if(parseInt(value)>1)
      return `${label}s`;
      else return label
    case 'disponibility':
      return 'travail';
    default:
      return label;
  }
};

const ViewDetails = ({label, value}: Props) => {
  return (
    <View style={[viewStyles.container]}>
      <View style={viewStyles.viewBlue}>
        <Image source={images.pointBlue} style={viewStyles.pointBlue} />
      </View>
      <View style={viewStyles.viewText}>
        <Text style={viewStyles.label}>{getLabel(label,value)} :</Text>
        <Text style={viewStyles.value}>{value}</Text>
      </View>
    </View>
  );
};

export default ViewDetails;
