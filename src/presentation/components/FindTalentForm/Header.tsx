import React from 'react';

import { globalStyle } from '../../globalStyle/globalStyle';
interface Props {
  title: string;
  description?: string;
}

export const HeaderScreen = ({ title, description }: Props) => {
  return (
    <div style={globalStyle.smallHeaderContainer}>
      <span style={globalStyle.headerScreenTitle}>{title}</span>
      {description && description !== '' && (
        <span style={globalStyle.headerScreenDescription}>{description}</span>
      )}
    </div>
  );
};
