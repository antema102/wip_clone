import React from 'react';
import { View, Animated, Text, TouchableOpacity } from 'react-native';
import { styles } from './styles';

interface Props {
  progressBar: any;
  waitingText: string;
  goBack?: any;
}

const VideoProgressBar = ({
  progressBar,
  waitingText,
  goBack,
}: Props) => {
  return (
    <View style={styles.containerModal}>
      <View style={{ height: 15 }}></View>
      <View style={{ paddingVertical: 7 }}>
        <Text style={styles.waitingText}>{waitingText}</Text>
      </View>
      <View style={{ height: 10 }}></View>
      <View style={styles.progressContainer}>
        <Animated.View style={[styles.inner, { width: `${progressBar}%` }]} />
        <Animated.Text style={styles.label}>{progressBar}%</Animated.Text>
      </View>
      <View style={{ height: 10 }}></View>
      <View style={{ paddingVertical: 7 }}>
        <TouchableOpacity
          style={[styles.button, styles.buttonClose]}
          onPress={goBack}>
          <Text style={styles.textStyle}>Annuler</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default VideoProgressBar;
