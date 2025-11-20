import React from 'react';
import { styles } from './styles';
import { images } from '../../../resources/constants';
interface headerProps {
  title: string;
  subtitle?: string;
  headPhoto?: any;
  noImage?: boolean;
}

const MainPageHeader = ({
  title,
  subtitle,
  headPhoto,
  noImage,
}: headerProps) => {
  return (
    <div style={styles.MainPageHeader}>
      <div style={[styles.item1]}>
        <span style={styles.item1Title}>{title}</span>
        {subtitle && <span style={styles.item1SubTitle}>{subtitle}</span>}
      </div>
      {!noImage && (
        <img src={headPhoto || images.bienvenue} style={[styles.item2]} />
      )}
    </div>
  );
};

export default MainPageHeader;
