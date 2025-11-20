import React from 'react';

import { styles } from './styles';
import { images } from '../../../resources/constants';
import { useMobile } from '../../../service/hooks/useMobile';
interface TypeNotFounds {
  label?: string;
  text?: string;
  image?: any;
  customImage?: React.CSSProperties;
}
const NotFounds = ({ label, text, image, customImage }: TypeNotFounds) => {
  const { isMobile } = useMobile();
  return (
    <div style={styles.containerNoEvents}>
      <div style={styles.containerNoEvents}>
        {image ? (
          <img src={image} style={[styles.ImageNoEvents, customImage]} />
        ) : (
          <img
            src={images.notFound}
            style={[styles.ImageNoEvents, customImage]}
          />
        )}
        {label && (
          <div style={styles.textNoEvents}>
            <span
              style={{
                ...{ fontWeight: '700' },
                ...(isMobile ? { fontSize: 18 } : { fontSize: 26 }),
              }}
            >
              {label}
            </span>
            <span> {text} </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotFounds;
