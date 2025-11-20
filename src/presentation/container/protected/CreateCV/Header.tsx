import React from 'react';
import globalStyle from '../../../globalStyle/globalStyle';
import { images } from '../../../../resources/constants';
export const HeaderContainer = () => {
  return (
    <div
      style={[
        { elevation: 0 },
        globalStyle.blueBanner,
        globalStyle.smallHeaderContainer,
      ]}
    >
      <div style={[globalStyle.alignTxtHeader]}>
        <span style={globalStyle.headerScreenTitle}>Créer votre CV</span>
        <span
          style={[{ maxWidth: '70%' }, globalStyle.headerScreenDescription]}
        >
          Veuillez remplir les différentes informations pour compléter votre CV
        </span>
      </div>
      <img style={globalStyle.imgBannerNotcrop} src={images.cvcreate} />
    </div>
  );
};
