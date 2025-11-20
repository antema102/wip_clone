import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { styles } from './styles';
import { ERROR, HOME, ROLEACCOUNT } from '../../../../data/constants/strings';
import { images, icons, COLORS } from '../../../../resources/constants';
import { useMobile } from '../../../../service/hooks/useMobile';
export const ContactScreen = (props:any) => {
  const {isMobile}=useMobile()
  return (
    <View style={styles.container}>
      <View style={styles.centeredContent}>
        <View style={styles.titleContainer}>
          <Text style={[styles.title ,isMobile ? { fontSize: 34 } : { fontSize: 54 }]}>NOUS CONTACTER</Text>
        </View>
        <View style={styles.titleLine}></View>
        <View style={styles.homeTitle}>
          <Text style={styles.description}>
            {HOME.LOGIN_TITLE}
          </Text>
        </View>
      </View>
      <View style={isMobile ? styles.cardContainerMobile : styles.cardContainer}>
        <View style={isMobile ? styles.cardMobile :styles.card}>
          <View style={styles.column}>
            <CustomIcon name="email" />
            <Text style={styles.columnTitle}>Email :</Text>
            <Text style={styles.columnText}>coordi@wipwork.com</Text>
          </View>
          <View style={styles.column}>
            <CustomIcon name="network" />
            <Text style={styles.columnTitle}>Facebook / Linkedin : </Text>
            <Text style={styles.columnText}>WIPwork</Text>
          </View>
          <View style={styles.column}>
            <CustomIcon name="phone" />
            <Text style={styles.columnTitle}>Téléphone :</Text>
            <Text style={styles.columnText}>+261 34 19 741 63</Text>
          </View>
          <View style={styles.column}>
            <CustomIcon name="instagram" />
            <Text style={styles.columnTitle}>Instagram :</Text>
            <Text style={styles.columnText}>WIPwork_mg</Text>
          </View>
          <View style={[styles.column]}>
            <CustomIcon name="location" />
            <Text style={styles.columnTitle}>Adresse :</Text>
            <Text style={{fontSize: 15}}>10 RUE GENERAL FIORELLA FRANCE</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

// CustomIcon component to create custom icons
const CustomIcon = ({ name }) => {
  let icon = null;


  switch (name) {
    case 'email':
      icon = (
        <View style={[styles.customIcon, styles.locationIcon]}>
          <Image
            source={icons.mail}
            style={styles.logo}
          />
        </View>
      );
      break;
    case 'network':
      icon = (
        <View style={[styles.customIcon, styles.emailIcon]}>
          <Image
            source={icons.facebook}
            style={styles.logo}
          />
        </View>
      );
      break;
    case 'phone':
      icon = (
        <View style={[styles.customIcon, styles.phoneIcon]}>
          <Image
            source={icons.phone}
            style={styles.logo}
          />
        </View>
      );
      break;
    case 'instagram':
      icon = (
        <View style={[styles.customIcon, styles.phoneIcon]}>
          <Image
            source={icons.users}
            style={styles.logo}
          />
        </View>
      );
      break;
    case 'location':
      icon = (
        <View style={[styles.customIcon, styles.phoneIcon]}>
          <Image
            source={icons.map}
            style={styles.logo}
          />
        </View>
      );
      break;
    default:
      break;
  }

  return icon;
};


