import React, { useEffect, useState } from 'react';
import { View, ScrollView, Text } from 'react-native';
import { defaultValues } from './dto';
import { RefineCandidat } from './RefineCandidat';
import { Header } from '../../../../components/Header';
import { COLORS } from '../../../../../resources/constants';
import { styles } from './styles';
import { useNavigate } from 'react-router-dom';
import * as stringsFr from '../../../../../data/constants/strings';
import * as stringsEn from '../../../../../data/constants/strings_en';
import { useLang } from '../../../../../data/translation';
import Tabs from '../../../../components/Tab';
export const FindTalentForm = props => {

  const navigate = useNavigate();
  const { candidat } = props;
  const [isSuscribed, setIsSuscribed] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [dataDto, setDataDto] = useState({ ...defaultValues });
  const [isFormation, setIsFormation] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const GoToChat = () => {
    useEffect(() => {
      navigate('/chat');
    }, [navigate]);

    return null; // rien à afficher
  };
  const handleCancel = () => {
    setDataDto({ ...defaultValues });
  };

  useEffect(() => {
    init();
    setRefreshing(false);
  }, []);

  const init = () => {
    setRefreshing(true);
  };
  const { lang } = useLang();
  const activeString = lang === 'fr' ? stringsFr : stringsEn;
  return (
    <>
      {candidat ?
        (
          <View>
            <View>
              <View style={{ borderRadius: 20, borderWidth: 1, borderColor: COLORS.blue_title }}>
                <Text style={{ fontWeight: 700, fontSize: 15, padding: 16, color: COLORS.border_blue }}>{activeString.FIND_TALENT_C.TEXT_C}</Text>
              </View>
              <RefineCandidat
                data={dataDto}
                onCancelForm={handleCancel}
                navigate={navigate}
                {...props}
                candidat={candidat}
              />
            </View>
          </View>
        ) :
        (
          <View style={[styles.containers, { borderRadius: 10, marginTop: 75, backgroundColor: COLORS.white, paddingTop: 85 }]}>
            <Tabs
              title1={activeString.FIND_TALENT_C.TITLE_C}
              title2={"Les meilleurs talents via l’IA"}
              isFormation={isFormation}
              setIsVisible={setIsVisible}
              candidat
              Offers={
                () => (
                  <RefineCandidat
                    data={dataDto}
                    onCancelForm={handleCancel}
                    navigate={navigate}
                    {...props}
                  />
                )}
              Formations={
                GoToChat
              }
            />
          </View>
        )
      }
    </>
  );
};

export const FindTalentScreen: any = FindTalentForm;
