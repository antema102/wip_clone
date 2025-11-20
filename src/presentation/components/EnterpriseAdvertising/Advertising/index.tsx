import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import { COLORS, images } from '../../../../resources/constants';
import { useNavigate } from 'react-router-dom';

interface AdvertisingType {
  isAd: number,
  data: {
    image: string,
    file: string,
    isVideo: string,
    name: string,
    title: string,
    description: string,
    link: string,
    contact: string
  }
}

export const Advertising = (props: AdvertisingType) => {
  const navigate = useNavigate();
  const { data, isAd } = props;
  const advertisementImage = `${isAd ? data?.image : data?.file}`;
  return (
    <TouchableOpacity
      style={{ flexDirection: 'row', alignItems: 'center', gap: 24, padding: 24, borderRadius: 10, backgroundColor: 'rgba(51, 153, 255, 0.1)', margin: 20 }}
      onPress={() =>
        navigate('/EntrepriseOfferCreateScreen', {
          state: {
            data: data,
            advertisement: isAd ? 0 : 1,
          }
        })}>
      <View style={styles.candidateImgContainer}>
        <Image
          style={styles.candidatImg}
          source={data.isVideo ? { uri: images.thumbnail } : { uri: advertisementImage }}
        />
      </View>
      <View style={styles.candidateDetailsContainer}>
        <Text style={styles.candidatName}>
          {isAd ? data.name : data.title}
        </Text>
        <Text style={styles.candidatPost}>{data.description}</Text>
        <Text style={styles.candidatPost}>
          {isAd ? data.link : data?.contact}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
