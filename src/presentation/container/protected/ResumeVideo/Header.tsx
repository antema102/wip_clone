import React from 'react';
import globalStyle from '../../../globalStyle/globalStyle';
import { RESUME_VIDEO } from '../../../../data/constants/strings';
export const HeaderComponent = () => {
  return (
    <div style={globalStyle.headerContainer}>
      <span style={globalStyle.headerScreenTitle}>
        {RESUME_VIDEO.PRESENTATION}
      </span>
      <span style={globalStyle.headerScreenDescription}>
        {RESUME_VIDEO.LOREM_IPSUM}
      </span>
    </div>
  );
};
