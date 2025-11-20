import React from 'react';
import { styles } from './styles';
import { ERROR, HOME, ROLEACCOUNT } from '../../../../data/constants/strings';
import { images, icons, COLORS } from '../../../../resources/constants';
import { useMobile } from '../../../../service/hooks/useMobile';
export const ContactScreen = (props: any) => {
  const { isMobile } = useMobile();
  return (
    <div style={styles.container}>
      <div style={styles.centeredContent}>
        <div style={styles.titleContainer}>
          <span
            style={{
              ...styles.title,
              ...(isMobile ? { fontSize: 34 } : { fontSize: 54 }),
            }}
          >
            NOUS CONTACTER
          </span>
        </div>
        <div style={styles.titleLine}></div>
        <div style={styles.homeTitle}>
          <span style={styles.description}>{HOME.LOGIN_TITLE}</span>
        </div>
      </div>
      <div style={isMobile ? styles.cardContainerMobile : styles.cardContainer}>
        <div style={isMobile ? styles.cardMobile : styles.card}>
          <div style={styles.column}>
            <CustomIcon name="email" />
            <span style={styles.columnTitle}>Email :</span>
            <span style={styles.columnText}>coordi@wipwork.com</span>
          </div>
          <div style={styles.column}>
            <CustomIcon name="network" />
            <span style={styles.columnTitle}>Facebook / Linkedin : </span>
            <span style={styles.columnText}>WIPwork</span>
          </div>
          <div style={styles.column}>
            <CustomIcon name="phone" />
            <span style={styles.columnTitle}>Téléphone :</span>
            <span style={styles.columnText}>+261 34 19 741 63</span>
          </div>
          <div style={styles.column}>
            <CustomIcon name="instagram" />
            <span style={styles.columnTitle}>Instagram :</span>
            <span style={styles.columnText}>WIPwork_mg</span>
          </div>
          <div style={[styles.column]}>
            <CustomIcon name="location" />
            <span style={styles.columnTitle}>Adresse :</span>
            <span style={{ fontSize: 15 }}>10 RUE GENERAL FIORELLA FRANCE</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// CustomIcon component to create custom icons
const CustomIcon = ({ name }) => {
  let icon = null;

  switch (name) {
    case 'email':
      icon = (
        <div style={[styles.customIcon, styles.locationIcon]}>
          <img src={icons.mail} style={styles.logo} />
        </div>
      );
      break;
    case 'network':
      icon = (
        <div style={[styles.customIcon, styles.emailIcon]}>
          <img src={icons.facebook} style={styles.logo} />
        </div>
      );
      break;
    case 'phone':
      icon = (
        <div style={[styles.customIcon, styles.phoneIcon]}>
          <img src={icons.phone} style={styles.logo} />
        </div>
      );
      break;
    case 'instagram':
      icon = (
        <div style={[styles.customIcon, styles.phoneIcon]}>
          <img src={icons.users} style={styles.logo} />
        </div>
      );
      break;
    case 'location':
      icon = (
        <div style={[styles.customIcon, styles.phoneIcon]}>
          <img src={icons.map} style={styles.logo} />
        </div>
      );
      break;
    default:
      break;
  }

  return icon;
};
