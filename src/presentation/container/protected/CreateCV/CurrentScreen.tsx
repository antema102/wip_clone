import React, { useEffect } from 'react';
import { View, Pressable, Text, Image } from 'react-native';
import { COLORS, icons } from '../../../../resources/constants';
import styles from './styles';
import { useLang } from '../../../../data/translation';
import { TitleLabels } from './titleLabels';
import { TitleLabels_en } from './titleLabels_en';
interface Props {
  screen: any;
  onChange: any;
  dataStore: any;
  navigation: any;
  setDataStore?: any;
  onPress?: any;
  data?: any
  // values?: any;
}

export const CurrentScreen = ({ screen, onChange, dataStore, setDataStore, data }: Props) => {

  const { lang } = useLang()
  const activeString = lang === 'fr' ? TitleLabels : TitleLabels_en;

  const handleChange = (screenName: string) => {
    onChange({ ...screen, current: screenName });
    setDataStore({ ...dataStore });
  };

  return (
    <View style={styles.CurrentScreenContainer}>
      {/** Affichage tout Screen */}
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Pressable
          style={[styles.CurrentScreenStyle, screen.current === 'info' || (screen.info && screen.type !== 'read' && screen.type !== 'update') ? styles.currentActive : '']}
          onPress={() => handleChange('info')}>
          <Text
            style={[
              styles.textSousMenu,
              screen.current === 'info' || (screen.info && screen.type !== 'read' && screen.type !== 'update')
                ? { color: COLORS.white }
                : { color: COLORS.black },
            ]}>
            {activeString.CreationCV.personalInformation}
          </Text>
        </Pressable>
        

        <Pressable
          style={[styles.CurrentScreenStyle, screen.current === 'job' || (screen.info && screen.type !== 'read' && screen.type !== 'update') ? styles.currentActive : '']}
          onPress={() => handleChange('job')}>
          <Text
            style={[
              styles.textSousMenu,
              screen.current === 'job' || (screen.job && screen.type !== 'read'  && screen.type !== 'update')
                ? { color: COLORS.white }
                : { color: COLORS.black },
            ]}>
            {activeString.CreationCV.job}
          </Text>
        </Pressable>

        <Pressable
          style={[styles.CurrentScreenStyle, screen.current === 'other' || (screen.info && screen.type !== 'read' && screen.type !== 'update') ? styles.currentActive : '']}
          onPress={() => handleChange('other')}>
          <Text
            style={[
              styles.textSousMenu,
              screen.current === 'other' || (screen.other && screen.type !== 'read' && screen.type !== 'update')
                ? { color: COLORS.white }
                : { color: COLORS.black },
            ]}>
            {activeString.CreationCV.other}
          </Text>
        </Pressable>

      </View>

      <View>
        {data}
      </View>

    </View>
  );
};
