import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { COLORS } from '../../../resources/constants';
import { Carousel } from 'primereact/carousel';

const screenHeight = Dimensions.get('window').height;

export default StyleSheet.create({
  containerCarousel: {
    flexDirection: 'column',
    gap: 16,
  },
  carouselName: {
    marginTop: 16,
    fontSize: 14,
    color: 'rgba(0, 0, 0, 0.6)',
    textTransform:'uppercase'
  },
  buttonCarousel: {
    backgroundColor: COLORS.blueInput,
    padding: 10,
    borderRadius: 5,
    alignSelf: 'flex-start',
  },
});
