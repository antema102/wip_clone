import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {styles} from './styles';

export const SpotVideo = props => {
  const {data, navigation, showingTheVideo} = props;
  const advertisementImage = `${data?.thumbnail}`;
  return (
    <View style={styles.candidateContainer}>
      <TouchableOpacity
        style={{flexDirection: 'row', paddingVertical: 15}}
        onPress={async () => await showingTheVideo(data.id)}>
        <View style={styles.candidateImgContainer}>
          <Image
            style={styles.candidatImg}
            source={{uri: advertisementImage}}
          />
        </View>
        <View style={styles.candidateDetailsContainer}>
          <Text style={styles.candidatName}>{data.name}</Text>
          <Text style={{color: 'black'}}>{data.description}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};
