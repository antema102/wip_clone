import React, { useEffect, useState } from 'react';
;

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
    salaryExpectation: false});
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
    setVisiblePopup} = useForm(data, Validation, setIsLoading, navigation, setIsLayerEditable);

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
      [layerName]: !isLayerEditable[layerName]});
  };

  values.jobWish_level = 7;

  const { lang } = useLang();
  const activeString = lang === 'fr' ? stringsFr : stringsEn;
  const activeStr = lang === 'fr' ? TitleLabels : TitleLabels_en;

  return (
    <div>
      <div style={{overflowY: "auto"}}>
        {candidat ? null : <MainPageHeader title={activeString.SEARCHENT_RESULT.FIND_COMPANY_THAT_ARE_HIRING} />}
        <div style={[styles.containers]}>
          <div style={{overflowY: "auto"}} style={[styles.contentForm, styles.containerForm]}>
            <div>
              {/** Layer Job Sought */}
              <div style={formsStyles.inputWrapBlue}>
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
              </div>
              {/** Layer Activity Sector */}
              {activityList && (
                <div style={formsStyles.inputWrapBlue}>
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
                </div>
              )}

              {/** Layer Disponibility */}
              {availabilityList && (
                <div style={formsStyles.inputWrapBlue}>
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
                </div>
              )}

              {/** Minimum Expected Salary */}
              <div style={formsStyles.inputWrapBlue}>
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
              </div>
            </div>
          </div>

          <div style={isMobile ? styles.footerFormLargeSecMobile : styles.footerFormLargeSec}>
            <button onClick={handleInit} style={styles.reinit}>
              <span style={styles.textButtonOrange}>Reinitialiser</span>
              <img src={icons.reload} style={styles.iconReload} />
            </button>
            <button
              onClick={handleSubmit}
              style={[{ alignSelf: 'center' }, styles.submitJob]}>
              <span style={styles.textButton}>Rechercher</span>
            </button>
          </div>

          <Popup
            visible={popupData.visibility}
            onClose={setVisiblePopup}
            cancel
            closeTitle="OK">
            <span style={{ color: COLORS.black }}>{popupData.message}</span>
          </Popup>
        </div>
      </div>
    </div>


  );
};
