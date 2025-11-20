import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { useNavigate } from 'react-router-dom';

import News from '../News/NewsDetails/index';
import Announces from '../AnnounceBox';
import Offer from '../Offers/OfferList/index';
import { styles } from './styles';
import { COLORS } from '../../../../resources/constants';
import WipTabs from '../../../components/WipTab';
import * as stringsEn from '../../../../data/constants/strings_en';
import * as stringsFr from '../../../../data/constants/strings';

import { useLang } from '../../../../data/translation';
import { UserSA } from '../../../../service/applicatif/User.sa';
import { useSelector } from 'react-redux';
import { CvService } from '../../../../service/applicatif/Cv.sa';
import { useUser } from '../../../../service/redux/ducks/user';

import globalStyle from '../../../globalStyle/globalStyle';
import Button from '../../../components/Button/button';

import { icons } from '../../../../resources/constants';

const CombinaisonCandidatScreen = (props: any) => {
  const navigate = useNavigate();
  const [isOffer, setIsOffer] = useState(true);
  const { findCvVideo } = CvService();
  const [isVideo, setIsVideo] = useState(true);
  const [isCV, setIsCV] = useState(true);

  const { updateHasMyCV, updateHasMyVideo } = useUser();
  const handleVideo = () => {
    navigate('/ResumeVideoScreen', { state: { isShow: false } });
  };

  const showDetails = id => {
    navigate('/EnterpriseOfferDetailsScreen', { state: { id, candidat: true } });
  };

  const { lang } = useLang();
  const activeString = lang === 'fr' ? stringsFr : stringsEn;
  const { accessToken, user } = useSelector(({ auth }) => auth);

  const {
    getUserText,
  } = UserSA();


  const storeDynamicText = async (value: any) => {
    try {
      await localStorage.setItem('dynamic', JSON.stringify(value));
    } catch (error) { }
  };

  const storeDynamic = async () => {
    const response = await getUserText(accessToken);
    storeDynamicText(response?.data?.items);
  };

  const checkCV = () => {
    findCvVideo().then((responseCV: any) => {
      setIsVideo(responseCV?.data === true);
      setIsCV(!!(responseCV?.status !== 500));
      updateHasMyCV(responseCV?.status !== 500);
      updateHasMyVideo(responseCV?.data === true);
    });
  };

  useEffect(() => {
    checkCV();
    storeDynamic();
  }, []);

  return (
    <View style={styles.container}>
      <View style={{ backgroundColor: COLORS.white, borderRadius: 10, overflow: 'hidden' }}>

        {isCV && !isVideo && (
          <View style={{ margin: 24 }}>
            <Text style={styles.textWarning}>{activeString.HOME.WARNING}</Text>
          </View>
        )}

        {(!isCV || !isVideo) && (
          <View style={{ margin: 24 }}>
            <Text style={styles.textWarning}>
              {activeString.HOME.BEGIN}
            </Text>
          </View>
        )}

        {!isCV && (
          <View style={[globalStyle.btnContainer, { marginHorizontal: 100 }]}>
            <Button
              onPress={() => navigate('/CreateCV', { state: { isCreate: true } })}
              title={activeString.HOME.PARCOURS}
              _style={[
                globalStyle.elevationBlue,
                styles.buttonHomeActionsaisir,
              ]}
              icon={icons.filetext}
              styleBtnTxt={styles.bigBtnTxt}
            />
          </View>
        )}

        {!isVideo && (
          <View style={[globalStyle.btnContainer, { marginHorizontal: 100, paddingBottom: 10 }]}>
            <Button
              onPress={handleVideo}
              title={activeString.HOME.PRESENTATION}
              _style={[
                globalStyle.elevationOrange,
                styles.buttonHomeExport,
              ]}
              color={COLORS.orange}
              icon={icons.camera}
              styleBtnTxt={styles.bigBtnTxt}
              isDisable={!isCV}
            />
          </View>)
        }
      </View>

      <View style={{ padding: 24, backgroundColor: 'white', borderRadius: 5, marginTop: 50 }}>
        <WipTabs
          News={() => <News {...props} />}
          Offers={() => <Offer {...props} showDetails={showDetails} initial={'Action sociale'} isClicked={0} />}
          Announces={() => <Announces {...props} category={'post'} />}
          isOffer={isOffer}
          setIsOffer={setIsOffer}
        />
      </View>

    </View>
  );
};

export default CombinaisonCandidatScreen;
