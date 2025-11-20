import React from 'react';
import { COLORS } from '../../../resources/constants';
const screenHeight = window.innerHeight;

export default {
  container: {
    flex: 1,
    flexDirection: 'column',
    minHeight: screenHeight,
  },
  splitterContainer: {
    flex: 1,
    paddingTop: 75,
    backgroundColor: COLORS.gray_fond,
    minHeight: screenHeight,
    borderBlockColor: COLORS.white,
  },
  splitterContainerMobile: {
    flex: 1,
    backgroundColor: COLORS.gray_fond,
    borderBlockColor: COLORS.white,
    marginTop: 80,
    marginBottom: 75,
  },
};
