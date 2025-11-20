import React from 'react';
;
import { COLORS } from '../../../resources/constants';
import { Carousel } from 'primereact/carousel';

const screenHeight = window.innerHeight;

export default ({
  containerCarousel: {
    flexDirection: 'column',
    gap: 16},
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
    alignSelf: 'flex-start'}});
