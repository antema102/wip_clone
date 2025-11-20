import React from 'react';
;
import { styles } from './styles';
import { buttonsStyles } from '../../../globalStyle/boutonStyle';
import { SIZES, icons } from '../../../../resources/constants';
import globalStyle from '../../../globalStyle/globalStyle';

interface Props {
  title: string;
  btnLabel?: boolean;
  onPress: any;
  name: string;
}

export const LayerSwitch = ({ title, btnLabel, onPress, name }: Props) => {
  const handleChange = () => {
    onPress(name);
  };

  const optionalFieldTitle = 'Optionnel';

  return (
    <div style={styles.layerTitleContainer}>
      <span>
        <span style={buttonsStyles.titleSwitch}>{title}</span>
        {name === 'more' ? (
          <span
            style={[
              buttonsStyles.title{ fontSize: SIZES.h5 },
            ]}>{` (${optionalFieldTitle})`}</span>
        ) : null}
      </span>
      <button
        style={[styles.imgContainer, globalStyle.elevationBlue]}
        onClick={handleChange}>
        {btnLabel ? (
          <img src={{ uri: icons.arrowFldown }} style={styles.iconMoins} />
        ) : (
          <img src={{ uri: icons.arrowFlup }} style={styles.iconPlus} />
        )}
      </button>
    </div>
  );
};
