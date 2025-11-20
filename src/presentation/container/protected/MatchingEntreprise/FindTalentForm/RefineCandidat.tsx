import React, { Fragment, useEffect, useState } from 'react';
;
import { useSelector } from 'react-redux';
import { ZonnageService } from '../../../../../service/applicatif/Zonnage.sa';
import { getDynamicListByKey } from '../../../../../service/technique/dynamicService';
import { useForm } from './useForm';
import { Validation } from './validation';
import { styles } from './styles';
import { COLORS, icons } from '../../../../../resources/constants';
import { logerOrNot, candidate } from '../../../../../data/constants/enum';
import globalStyle from '../../../../globalStyle/globalStyle';
import { formsStyles } from '../../../../globalStyle/formStyles';
import CriterionField from '../../../../components/FindTalentForm/CriterionField';
import { LayerSwitch } from '../../../../components/FindTalentForm/LayerSwitch';
import { SwitchComponent } from '../../../../components/Switch';
import Loader from '../../../../components/Loader';
import Popup from '../../../../components/Popup';
import { TitleLabels } from '../titleLabels';
import { TitleLabels_en } from '../titleLabels_en';
import { useLang } from '../../../../../data/translation';
import * as stringsFr from '../../../../../data/constants/strings';
import * as stringsEn from '../../../../../data/constants/strings_en';

interface dataModel {
  label: string;
  value: string;
}
export const RefineCandidat = (props: any) => {
  const { data, onCancelForm, navigate, candidat } = props;
  const { accessToken } = useSelector(({ auth }: any) => auth);
  const { getCountry, getProvince } = ZonnageService();
  const [refreshing, setRefreshing] = useState(false);
  const [country, setCountry] = useState<any>([]);
  const [gradeList, setGradeList] = useState<any>();
  const [subjectList, setSubjectList] = useState<any>();
  const [activityList, setActivityList] = useState<any>();
  const [experienceList, setExperienceList] = useState<any>();
  const [availabilityList, setAvailabilityList] = useState<any>();
  const [statusList, setStatusList] = useState<any>();
  const [transportList, setTransportList] = useState<any>();
  const [situationList, setSituationList] = useState<any>();
  const [sportList, setSportList] = useState<any>();
  const [languageList, setLanguageList] = useState<any>();
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    init();
    setRefreshing(false);
  }, []);

  const init = () => {
    setRefreshing(true);
  };

  const getDynamicList = async () => {
    setIsLoading(true);
    try {
      const data = await localStorage.getItem('dynamic');
      const dataJSON = JSON.parse(data);
      const grade = getDynamicListByKey('grades', dataJSON);
      const subject = getDynamicListByKey('subjects', dataJSON);
      const activity = getDynamicListByKey('activities', dataJSON);
      const experience = getDynamicListByKey('experiences', dataJSON);
      const availability = getDynamicListByKey('availabilities', dataJSON);
      const status = getDynamicListByKey('status', dataJSON);
      const sport = getDynamicListByKey('sports', dataJSON);
      const transport = getDynamicListByKey('transports', dataJSON);
      const situation = getDynamicListByKey('situations', dataJSON);
      const language = getDynamicListByKey('languages', dataJSON);
      setGradeList(grade);
      setSubjectList(subject);
      setActivityList(activity);
      setExperienceList(experience);
      setAvailabilityList(availability);
      setStatusList(status);
      setSportList(sport);
      setTransportList(transport);
      setSituationList(situation);
      setLanguageList(language);
    } catch (error) {
      // handle error
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getDynamicList();
  }, []);

  const formatSelectData = (data, label, value) => {
    const dataList: dataModel[] = [];
    if (data && data.length) {
      data.map(element => {
        dataList.push({
          label: element[label],
          value: element[value]});
      });
    }
    return dataList;
  };

  const getListCountry = () => {
    if (!country.lenth) {
      getCountry(accessToken)
        .then((res: any) => {
          setCountry(formatSelectData(res.data.items, 'name', 'id'));
        })
        .catch(error => { });
    }
  };

  // province management
  const [adrsProvince, setAdrsProvince] = useState<any>([]);
  const [jobProvince, setJobProvince] = useState<any>([]);

  const getRegion = (idCountry: string, type: string) => {
    getProvince(accessToken, idCountry)
      .then((res: any) => {
        if (type === 'adrs') {
          setAdrsProvince(formatSelectData(res.data.items, 'name', 'id'));
        } else {
          setJobProvince(formatSelectData(res.data.items, 'name', 'id'));
        }
      })
      .catch(error => { });
  };

  //Langue
  const { lang } = useLang();
  const activeString = lang === 'fr' ? TitleLabels : TitleLabels_en;
  const activeStringEN = lang === 'fr' ? stringsFr : stringsEn;

  const fieldData: any = {
    default: [
      {
        type: 'text',
        label: activeString.FindCriteria.post,
        name: 'desiredPost',
        necessary: true,
        noSwitch: true},
      {
        type: 'select',
        label: activeString.FindCriteria.secteur,
        name: 'activitySector',
        data: activityList || []},
      {
        type: 'select',
        label: activeString.FindCriteria.level,
        name: 'level',
        data: gradeList || []},
      {
        type: 'select',
        label: activeString.FindCriteria.availability,
        name: 'disponibility',
        data: availabilityList || []},
      {
        type: 'select',
        label: activeString.FindCriteria.transport,
        name: 'transport',
        data: transportList || []},
      {
        type: 'select',
        label: activeString.FindCriteria.Accommodated,
        name: 'loger',
        data: logerOrNot},
      {
        type: 'select',
        label: activeString.FindCriteria.recommend,
        name: 'recommandation',
        data: logerOrNot},
      ...(candidat ? [] : [{
        type: 'select',
        label: activeString.FindCriteria.candidate_search,
        name: 'candidat',
        data: candidate}])
    ],
    infoPerso: [
      {
        type: 'select',
        label: activeString.FindCriteria.contrat,
        name: 'statut',
        data: statusList || []},
      {
        type: 'select',
        label: activeString.FindCriteria.country,
        name: 'adrsCountry',
        data: country},
      {
        type: 'select',
        label: activeString.FindCriteria.province,
        name: 'adrsProvince',
        data: adrsProvince},
      {
        type: 'text',
        label: activeString.FindCriteria.common,
        name: 'AdrsZone'},
    ],
    experiencePro: [
      {
        type: 'select',
        label: activeString.FindCriteria.experience,
        name: 'yearOfExp',
        data: experienceList || []},
      {
        type: 'text',
        label: activeString.FindCriteria.old_job,
        name: 'lastjobType'},
      {
        type: 'text',
        label: activeString.FindCriteria.old_business,
        name: 'lastjobPlace'},
    ],
    destination: [
      {
        type: 'select',
        label: activeString.FindCriteria.country_wish,
        name: 'jobCountry',
        data: country},
      {
        type: 'select',
        label: activeString.FindCriteria.province_wish,
        name: 'jobProvince',
        data: jobProvince},
      {
        type: 'text',
        label: activeString.FindCriteria.common_wish,
        name: 'jobZone'},
    ],
    others: [
      {
        type: 'select',
        label: activeString.FindCriteria.langue,
        name: 'language',
        data: languageList},
      {
        type: 'select',
        label: activeString.FindCriteria.sport,
        name: 'sport',
        data: sportList || []},
      {
        type: 'text',
        label: activeString.FindCriteria.center_interest,
        name: 'interest'},
    ]};

  // ----------------------------------------------------------------------------
  // Managing Switch Field

  const [isLayerEditable, setIsLayerEditable] = useState({
    studyLevel: false,
    career: false,
    activitySector: false,
    jobSought: false,
    yearExp: false,
    disponibility: false,
    transport: false});

  const onChangeEditable = (layerName: string) => {
    setIsLayerEditable({
      ...isLayerEditable,
      [layerName]: !isLayerEditable[layerName]});
  };

  // ----------------------------------------------------------------------------
  // Managing the Hide/Show Form field

  const [layersetLayerSwitch] = useState({
    more: false,
    activitySector: false,
    studyArea: false,
    infoPerso: false,
    destination: false,
    experiencePro: false,
    others: false});

  const handleChangeLayerSwitch = (name: string) =>
    setLayerSwitch({ ...layer[name]: !layerSwitch[name] });

  // -----------------------------------------------------------------------------

  const handleSave = (errors: any) => {
    if (errors && Object.keys(errors)?.length) {
      Object.keys(errors).map(errorElt =>
        Object.keys(fieldData).map(element => {
          const elementTmp = fieldData[element].find(
            elt => elt.name === errorElt,
          );
          if (elementTmp) {
            setLayerSwitch(previousState => ({
              ...previousState,
              more: true,
              [element]: true}));
          }
        }),
      );
    }
  };

  const {
    handleChange,
    handleBlur,
    handleSubmit,
    handleInit,
    values,
    dataMatching,
    isLoading,
    noMatching,
    errors,
    showErrors,
    popupData,
    setVisiblePopup,
    setIsLoading,
    errorSalary,
    errorAge} = useForm(
    data,
    Validation,
    navigate,
    handleSave,
    setIsLayerEditable,
  );

  useEffect(() => {
    if (values?.adrsCountry?.length) {
      getRegion(values.adrsCountry, 'adrs');
    }
  }, [values.adrsCountry]);

  useEffect(() => {
    if (values?.jobCountry?.length) {
      getRegion(values.jobCountry, 'job');
    }
  }, [values.jobCountry]);

  useEffect(() => {
    getListCountry();
  }, []);

  useEffect(() => {
    getDynamicList();
  }, []);

  values.desiredPost_level = 7;

  if (values.loger && values.loger !== '') {
    values.loger_level = 7;
  }

  if (values.recommandation && values.recommandation !== '') {
    values.recommandation_level = 7;
  }

  return (
    <Fragment>
      <div>
        {!candidat &&
          <div style={{ borderRadius: 20, borderWidth: 1, borderColor: COLORS.blue_title }}>
            <span style={{ fontWeight: 700, fontSize: 15, padding: 16, color: COLORS.border_blue }}>{activeStringEN.FIND_TALENT_C.TEXT_C}</span>
          </div>
        }
        <div style={{ paddingTop: 24 }}>
          {fieldData.default.map((element, index) => (
            <div key={`default-${index}`} style={formsStyles.inputWrapBlue}>
              <CriterionField
                type={element.type}
                label={element.label}
                errors={element?.error || errors}
                showErrors={element?.showError || showErrors}
                name={element.name}
                values={element?.value || values}
                onChange={element?.handleChange || handleChange}
                isEditable={element?.isLayerEditable || isLayerEditable}
                onChangeEditable={
                  element?.onChangeEditable || onChangeEditable
                }
                required={element?.required || true}
                data={element?.data || null}
                necessary={element?.necessary || false}
                noSwitch={element?.noSwitch || false}
              />
            </div>
          ))}
        </div>
        <div style={[globalStyle.roundedBlue]}>
          <LayerSwitch
            title={activeString.FindCriteria.more}
            onClick={handleChangeLayerSwitch}
            btnLabel={layerSwitch.more}
            name="more"
          />

          {layerSwitch.more ? (
            <div style={[globalStyle.roundedBlue]}>
              <LayerSwitch
                title={activeString.FindCriteria.info}
                onClick={handleChangeLayerSwitch}
                btnLabel={layerSwitch.infoPerso}
                name="infoPerso"
              />

              {layerSwitch.infoPerso ? (
                <div>
                  <div style={formsStyles.inputWrapBlue}>
                    <CriterionField
                      type="select"
                      label={activeString.FindCriteria.contrat}
                      errors={errors}
                      showErrors={showErrors}
                      name="statut"
                      values={values}
                      onChange={handleChange}
                      isEditable={isLayerEditable}
                      onChangeEditable={onChangeEditable}
                      required
                      data={statusList}
                    />
                  </div>
                  <div style={formsStyles.inputWrapBlue}>
                    <CriterionField
                      type={'select'}
                      label={activeString.FindCriteria.country}
                      errors={errors}
                      showErrors={showErrors}
                      name={'adrsCountry'}
                      values={values}
                      onChange={handleChange}
                      isEditable={isLayerEditable}
                      onChangeEditable={onChangeEditable}
                      required
                      data={country}
                      reset
                    />
                  </div>

                  {values.adrsCountry === '' ||
                    values.adrsCountry === undefined ? (
                    <div style={[styles.defaultCriterion, {}]}>
                      <div style={formsStyles.inputWrapBlue}>
                        <div style={styles.alignSwitch}>
                          <span style={styles.titleGroup}>{activeString.FindCriteria.province}</span>
                          {typeof onChangeEditable === 'function' ? (
                            <SwitchComponent
                              onChangeValue={() => delete values.adrsProvince}
                              value={false}
                            />
                          ) : null}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div style={formsStyles.inputWrapBlue}>
                      <CriterionField
                        type={'select'}
                        label={activeString.FindCriteria.province}
                        errors={errors}
                        showErrors={showErrors}
                        name={'adrsProvince'}
                        values={values}
                        onChange={handleChange}
                        isEditable={isLayerEditable}
                        onChangeEditable={onChangeEditable}
                        required
                        data={adrsProvince}
                      />
                    </div>
                  )}

                  {values.adrsProvince === '' ||
                    values.adrsProvince === undefined ||
                    values.adrsCountry === '' ||
                    values.adrsCountry === undefined ? (
                    <div style={[styles.defaultCriterion, {}]}>
                      <div style={formsStyles.inputWrapBlue}>
                        <div style={styles.alignSwitch}>
                          <span style={styles.titleGroup}>
                            {activeString.FindCriteria.common}
                          </span>
                          {typeof onChangeEditable === 'function' ? (
                            <SwitchComponent
                              onChangeValue={() => null}
                              value={false}
                            />
                          ) : null}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div style={formsStyles.inputWrapBlue}>
                      <CriterionField
                        type={'text'}
                        label={activeString.FindCriteria.common}
                        errors={errors}
                        showErrors={showErrors}
                        name={'adrsZone'}
                        values={values}
                        onChange={handleChange}
                        isEditable={isLayerEditable}
                        onChangeEditable={onChangeEditable}
                        required
                        data={null}
                      />
                    </div>
                  )}
                  <div style={formsStyles.inputWrapBlue}>
                    <CriterionField
                      type="salary"
                      label={activeString.FindCriteria.pretension}
                      errors={errors}
                      showErrors={showErrors}
                      name="salary"
                      onBlur={() => handleBlur('salary')}
                      errorSalary={errorSalary}
                      values={values}
                      onChange={handleChange}
                      isEditable={isLayerEditable}
                      onChangeEditable={onChangeEditable}
                      required
                    />
                  </div>
                  <div style={formsStyles.inputWrapBlue}>
                    <CriterionField
                      type="salary"
                      label="Age"
                      errors={errors}
                      showErrors={showErrors}
                      name="dateofBirth"
                      onBlur={() => handleBlur('dateofBirth')}
                      errorSalary={errorAge}
                      values={values}
                      onChange={handleChange}
                      isEditable={isLayerEditable}
                      onChangeEditable={onChangeEditable}
                      required
                    />
                  </div>
                </div>
              ) : null}

              <LayerSwitch
                title="Experiences pro"
                onClick={handleChangeLayerSwitch}
                btnLabel={layerSwitch.experiencePro}
                name="experiencePro"
              />

              {layerSwitch.experiencePro
                ? fieldData.experiencePro.map((element, index) => (
                  <div
                    key={`experiencePro-${index}`}
                    style={formsStyles.inputWrapBlue}>
                    <CriterionField
                      type={element.type}
                      label={element.label}
                      errors={element?.error || errors}
                      showErrors={element?.showError || showErrors}
                      name={element.name}
                      values={element?.value || values}
                      onChange={element?.handleChange || handleChange}
                      isEditable={
                        element?.isLayerEditable || isLayerEditable
                      }
                      onChangeEditable={
                        element?.onChangeEditable || onChangeEditable
                      }
                      required={element?.required || true}
                      data={element?.data || null}
                    />
                  </div>
                ))
                : null}

              <LayerSwitch
                title="Destination"
                onClick={handleChangeLayerSwitch}
                btnLabel={layerSwitch.destination}
                name="destination"
              />
              {layerSwitch.destination ? (
                <div>
                  <div style={formsStyles.inputWrapBlue}>
                    <CriterionField
                      type={'select'}
                      label={activeString.FindCriteria.country_wish}
                      errors={errors}
                      showErrors={showErrors}
                      name={'jobCountry'}
                      values={values}
                      onChange={handleChange}
                      isEditable={isLayerEditable}
                      onChangeEditable={onChangeEditable}
                      required
                      data={country}
                      resetProvince
                    />
                  </div>

                  {values.jobCountry === '' ||
                    values.jobCountry === undefined ? (
                    <div style={[styles.defaultCriterion, {}]}>
                      <div style={formsStyles.inputWrapBlue}>
                        <div style={styles.alignSwitch}>
                          <span style={styles.titleGroup}>
                            {activeString.FindCriteria.province_wish}
                          </span>
                          {typeof onChangeEditable === 'function' ? (
                            <SwitchComponent
                              onChangeValue={() => null}
                              value={false}
                            />
                          ) : null}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div style={formsStyles.inputWrapBlue}>
                      <CriterionField
                        type={'select'}
                        label={activeString.FindCriteria.province_wish}
                        errors={errors}
                        showErrors={showErrors}
                        name={'jobProvince'}
                        values={values}
                        onChange={handleChange}
                        isEditable={isLayerEditable}
                        onChangeEditable={onChangeEditable}
                        required
                        data={jobProvince}
                      />
                    </div>
                  )}

                  {values.jobProvince === '' ||
                    values.jobProvince === undefined ||
                    values.jobCountry === '' ||
                    values.jobCountry === undefined ? (
                    <div style={[styles.defaultCriterion, {}]}>
                      <div style={formsStyles.inputWrapBlue}>
                        <div style={styles.alignSwitch}>
                          <span style={styles.titleGroup}>
                            {activeString.FindCriteria.common_wish}
                          </span>
                          {typeof onChangeEditable === 'function' ? (
                            <SwitchComponent
                              onChangeValue={() => null}
                              value={false}
                            />
                          ) : null}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div style={formsStyles.inputWrapBlue}>
                      <CriterionField
                        type={'text'}
                        label={activeString.FindCriteria.common_wish}
                        errors={errors}
                        showErrors={showErrors}
                        name={'jobZone'}
                        values={values}
                        onChange={handleChange}
                        isEditable={isLayerEditable}
                        onChangeEditable={onChangeEditable}
                        required
                        data={null}
                      />
                    </div>
                  )}
                </div>
              ) : null}
              <LayerSwitch
                title={activeString.FindCriteria.other}
                onClick={handleChangeLayerSwitch}
                btnLabel={layerSwitch.others}
                name="others"
              />

              {layerSwitch.others
                ? fieldData.others.map((element, index) => (
                  <div
                    key={`others-${index}`}
                    style={formsStyles.inputWrapBlue}>
                    <CriterionField
                      type={element.type}
                      label={element.label}
                      errors={element?.error || errors}
                      showErrors={element?.showError || showErrors}
                      name={element.name}
                      values={element?.value || values}
                      onChange={element?.handleChange || handleChange}
                      isEditable={
                        element?.isLayerEditable || isLayerEditable
                      }
                      onChangeEditable={
                        element?.onChangeEditable || onChangeEditable
                      }
                      required={element?.required || true}
                      data={element?.data || null}
                    />
                  </div>
                ))
                : null}
            </div>
          ) : null}
          {isLoading ? <Loader /> : null}
        </div>
        <Popup
          visible={popupData.visibility}
          onClose={setVisiblePopup}
          cancel
          closeTitle="OK">
          <span style={{ color: COLORS.black }}>{popupData.message}</span>
        </Popup>
      </div>
      <div style={styles.footerFormLargeSec}>
        <button onClick={handleInit} style={styles.reinit}>
          <span style={styles.textButtonOrange}>{'Reinitialiser'}</span>
          <img src={icons.reload} style={styles.iconReload} />
        </button>

        <button
          onClick={handleSubmit}
          style={[{ alignSelf: 'center' }, styles.submitJob]}>
          <span style={styles.textButton}>
            {noMatching
              ? 'Aucun profil trouvé'
              : dataMatching.length
                ? `Profils trouvés (${dataMatching?.length})`
                : 'Rechercher'}
          </span>
        </button>
      </div>
    </Fragment>
  );
};
