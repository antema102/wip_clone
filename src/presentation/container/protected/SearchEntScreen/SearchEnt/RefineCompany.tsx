import React, { useEffect, useState } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  RefreshControl,
  ScrollView
} from 'react-native';

import { styles } from './styles';
import { useForm } from './useForm';
import { Validation } from './validation';
import { getDynamicListByKey } from '../../../../../service/technique/dynamicService';
import MainPageHeader from '../../../../components/MainPageHeader';
import { SEARCHENT_RESULT } from '../../../../../data/constants/strings';
import globalStyle from '../../../../globalStyle/globalStyle';
import { formsStyles } from '../../../../globalStyle/formStyles';
import CriterionField from '../../../../components/FindTalentForm/CriterionField';
import { COLORS, icons } from '../../../../../resources/constants';
import Popup from '../../../../components/Popup';
import * as stringsFr from '../../../../../data/constants/strings';
import * as stringsEn from '../../../../../data/constants/strings_en';
import { useLang } from '../../../../../data/translation';
import { TitleLabels_en } from '../titleLabels_en';
import { TitleLabels } from '../titleLabels';
import { useMobile } from '../../../../../service/hooks/useMobile';
export const RefineCompany = (props: any) => {
  const { data, setIsLoading, navigation, candidat } = props;
  const [isLayerEditable, setIsLayerEditable] = useState({
    jobWish: false,
    activitySector: false,
    disponibility: false,
    salaryExpectation: false,
  });
  const [refreshing, setRefreshing] = useState(false);
  const [activityList, setActivityList] = useState<any>();
  const [availabilityList, setAvailabilityList] = useState<any>();
  const { isMobile } = useMobile();
  useEffect(() => {
    init();
    setRefreshing(false);
  }, []);

  const init = () => {
    setRefreshing(true);
  };

  const {
    handleChange,
    handleSubmit,
    values,
    errors,
    showErrors,
    handleInit,
    popupData,
    setVisiblePopup,
  } = useForm(data, Validation, setIsLoading, navigation, setIsLayerEditable);

  const getDynamicList = async () => {
    setIsLoading(true);
    try {
      const data = await localStorage.getItem('dynamic');
      const dataJSON = JSON.parse(data);
      const activity = getDynamicListByKey('activities', dataJSON);
      const availability = getDynamicListByKey('availabilities', dataJSON);
      setActivityList(activity);
      setAvailabilityList(availability);
    } catch (error) {
      // handle error
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getDynamicList();
  }, []);

  // ----------------------------------------------------------------------------
  // Managing Switch Field

  const onChangeEditable = (layerName: string) => {
    setIsLayerEditable({
      ...isLayerEditable,
      [layerName]: !isLayerEditable[layerName],
    });
  };

  values.jobWish_level = 7;

  const { lang } = useLang();
  const activeString = lang === 'fr' ? stringsFr : stringsEn;
  const activeStr = lang === 'fr' ? TitleLabels : TitleLabels_en;

  return (
    <View>
      <ScrollView>
        {candidat ? null : <MainPageHeader title={activeString.SEARCHENT_RESULT.FIND_COMPANY_THAT_ARE_HIRING} />}
        <View style={[styles.containers]}>
          <ScrollView style={[styles.contentForm, styles.containerForm]}>
            <View>
              {/** Layer Job Sought */}
              <View style={formsStyles.inputWrapBlue}>
                <CriterionField
                  type="text"
                  label={activeStr.FindOffer.post}
                  required
                  name="jobWish"
                  values={values}
                  onChange={handleChange}
                  isEditable={isLayerEditable}
                  onChangeEditable={onChangeEditable}
                  errors={errors}
                  showErrors={showErrors}
                  necessary
                  noSwitch={true}
                />
              </View>
              {/** Layer Activity Sector */}
              {activityList && (
                <View style={formsStyles.inputWrapBlue}>
                  <CriterionField
                    type="select"
                    label={activeStr.FindOffer.secteur}
                    required
                    name="activitySector"
                    values={values}
                    onChange={handleChange}
                    data={activityList}
                    isEditable={isLayerEditable}
                    onChangeEditable={onChangeEditable}
                    errors={errors}
                    showErrors={showErrors}
                  />
                </View>
              )}

              {/** Layer Disponibility */}
              {availabilityList && (
                <View style={formsStyles.inputWrapBlue}>
                  <CriterionField
                    type="select"
                    label={activeStr.FindOffer.availability}
                    required
                    name="disponibility"
                    values={values}
                    onChange={handleChange}
                    data={availabilityList}
                    isEditable={isLayerEditable}
                    onChangeEditable={onChangeEditable}
                    errors={errors}
                    showErrors={showErrors}
                  />
                </View>
              )}

              {/** Minimum Expected Salary */}
              <View style={formsStyles.inputWrapBlue}>
                <CriterionField
                  type="text"
                  label={activeStr.FindOffer.pretension}
                  required
                  name="salaryExpectation"
                  values={values}
                  onChange={handleChange}
                  isEditable={isLayerEditable}
                  onChangeEditable={onChangeEditable}
                  errors={errors}
                  showErrors={showErrors}
                />
              </View>
            </View>
          </ScrollView>

          <View style={isMobile ? styles.footerFormLargeSecMobile : styles.footerFormLargeSec}>
            <TouchableOpacity onPress={handleInit} style={styles.reinit}>
              <Text style={styles.textButtonOrange}>Reinitialiser</Text>
              <Image source={icons.reload} style={styles.iconReload} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleSubmit}
              style={[{ alignSelf: 'center' }, styles.submitJob]}>
              <Text style={styles.textButton}>Rechercher</Text>
            </TouchableOpacity>
          </View>

          <Popup
            visible={popupData.visibility}
            onClose={setVisiblePopup}
            cancel
            closeTitle="OK">
            <Text style={{ color: COLORS.black }}>{popupData.message}</Text>
          </Popup>
        </View>
      </ScrollView>
    </View>


  );
};
