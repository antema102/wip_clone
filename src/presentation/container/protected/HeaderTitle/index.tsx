import React from 'react';
;
import { styles } from './styles'
import { images } from '../../../../resources/constants';
interface headerTitle {
  title: string,
  _style?: object
  _styleText?:object
}

const HeaderTitle = ({ title, _style,_styleText }: headerTitle) => {
  return (
    <div style={[styles.headerCreateCv, _style]}>
      <span style={[styles.headerCreateCvText,_styleText]}>{title}</span>
      <img src={images.bannerImage} style={styles.headerCreateCvIcon} />
    </div>
  );
};

export default HeaderTitle;
