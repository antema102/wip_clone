import React, { useState, useEffect, Fragment } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';

import { TAB } from '../../../data/constants/strings';
import { styles } from './styles';
import * as stringsFr from '../../../data/constants/strings';
import * as stringsEn from '../../../data/constants/strings_en';
import { useLang } from '../../../data/translation';
import { useMobile } from '../../../service/hooks/useMobile';
import { icons } from '../../../resources/constants';

const WipTabs = (props: any) => {
  const { isOffer, setIsOffer } = props
  const [show, setShow] = useState('News');
  const [index, setIndex] = useState(0);
  const { isMobile } = useMobile();
  const handleShow = (name: string, index: number) => {
    setShow(name);
    setIndex(index);
  };
  useEffect(() => {
    if (isOffer) {
      handleShow('Offers', 1);
      setIsOffer(false);
    }
  }, [])

  const { lang } = useLang();
  const activeString = lang === 'fr' ? stringsFr : stringsEn;
  return (
    <Fragment>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: isMobile ? 'space-between' : 'center',
        }}
      >

        <View style={isMobile ? { width: '20%' } : { width: '32%' }}>
          <TouchableOpacity
            onPress={() => handleShow('News', 0)}
            style={styles.contenair}>
            <View style={styles.item} >
              <View style={[styles.content, index === 0 ? styles.activebtn : styles.noBtn]}>
                <Image source={{ uri: icons.news_candidate }} style={[styles.images, index === 0 ? styles.activeImages : styles.noActiveImages]} />
              </View>
              <Text style={index === 0 ? styles.active : styles.ButtonTabs}>
                {activeString.TAB.NEWS}
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={isMobile ? { width: '20%' } : { width: '32%' }}>
          <TouchableOpacity
            onPress={() => handleShow('Offers', 1)}
            style={styles.contenair}>
            <View style={styles.item} >
              <View style={[styles.content, index === 1 ? styles.activebtn : styles.noBtn]}>
                <Image source={{ uri: icons.job_candidate }} style={[styles.images, index === 1 ? styles.activeImages : styles.noActiveImages]} />
              </View>
              <Text style={index === 1 ? styles.active : styles.ButtonTabs}>
                {activeString.TAB.OFFERS}
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={isMobile ? { width: '20%' } : { width: '32%' }}>
          <TouchableOpacity
            onPress={() => handleShow('Announces', 2)}
            style={styles.contenair}>
            <View style={styles.item} >
              <View style={[styles.content, index === 2 ? styles.activebtn : styles.noBtn]}>
                <Image source={{ uri: icons.ads_candidate }} style={[styles.images, index === 2 ? styles.activeImages : styles.noActiveImages]} />
              </View>
              <Text style={index === 2 ? styles.active : styles.ButtonTabs}>
                {activeString.TAB.ANNOUNCES}
              </Text>
            </View>
          </TouchableOpacity>
        </View>

      </View>
      <View style={{ marginBottom: 16 }}>{index === 0 ? props.News() : (index === 1) ? props.Offers() : props.Announces()}</View>
    </Fragment>
  );
};

export default WipTabs;
