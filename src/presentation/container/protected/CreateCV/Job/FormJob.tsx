import React, { useEffect, useState, useRef } from 'react';
;
import { useSelector } from 'react-redux';

import styles from '../styles';
import { TitleLabels } from '../titleLabels';
import { TitleLabels_en } from '../titleLabels_en';
import { useLang } from '../../../../../data/translation';
import { useForm } from './useFormJob';
import { Validation } from './validationJob';

import { DesiredPosition } from './DesiredPosition';
import { YearsOfExperience } from './YearsOfExperience';
import { Recommandation } from './Recommandation';
import { studyLevel } from '../../../../../data/constants/studyLevel';
import { ZonnageService } from '../../../../../service/applicatif/Zonnage.sa';
import { getDynamicListByKey } from '../../../../../service/technique/dynamicService';
import { COLORS, icons } from '../../../../../resources/constants';
import { InputSelect } from '../../../../components/Inputs/InputSelect';
import { InputField } from '../../../../components/Inputs/InputField';
import { thousandSeparator } from '../../../../../data/factory';
import { formsStyles } from '../../../../globalStyle/formStyles';
import CurrencyInput from 'react-native-currency-input';
import Loader from '../../../../components/Loader';
import globalStyle from '../../../../globalStyle/globalStyle';
import { UserSA } from '../../../../../service/applicatif/User.sa';
import Popup from '../../../../components/CreateCV/Popup';

interface dataModel {
  label: string;
  value: string;
}
export const FormJob = (props: any) => {
  const { user } = useSelector(({ auth }: any) => auth);

  const {
    onSubmitForm,
    changeComplete,
    data,
    onChangeDataStore,
    type,
    setValues} = props;

  const {
    handleChange,
    handleSubmit,
    noError,
    dataJob,
    errors,
    showErrors,
    dto,
    salaryError} = useForm(data.job, Validation, handleSave, setValues);
  const [salary, setSalary] = useState(dataJob.minimumWageRequired);
  const salaryTxtError = 'Ce champ est obligatoire';
  const settingSalary = formattedValue => {
    if (formattedValue) {
      dataJob.minimumWageRequired = salary.toString();
    } else {
      dataJob.minimumWageRequired = '';
    }
  };

  function handleSave() {
    onSubmitForm(dto.dataJob);
  }

  useEffect(() => {
    changeComplete(previousState => ({
      ...previousState,
      job: data.job?.levelOfStudy ? noError() : false}));
  }, [errors]);

  useEffect(() => {
    if (
      dataJob.levelOfStudy === studyLevel.cepe ||
      dataJob.levelOfStudy === studyLevel.bepc
    ) {
      dataJob.faculty = '';
    }

    onChangeDataStore(previousState => ({ ...previousState, job: dataJob }));
  }, [dataJob]);

  // --------------------------------------------------------------------------
  // zonnage management begin here
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [gradeList, setGradeList] = useState<any>();
  const [subjectList, setSubjectList] = useState<any>();
  const [activityList, setActivityList] = useState<any>();
  const [experienceList, setExperienceList] = useState<any>();
  const [availabilityList, setAvailabilityList] = useState<any>();
  const [statusList, setStatusList] = useState<any>();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { getCountry } = ZonnageService();
  const { postPdfs, getPdf } = UserSA()

  const [popupVisible, setPopupVisible] = useState<boolean>(false);
  const [popupMessage, setPopupMessage] = useState<string>('');

  const formatSelectData = (data, label, value) => {
    const dataList: dataModel[] = [];
    data?.map(element => {
      dataList.push({
        label: element[label],
        value: element[value]});
    });
    return dataList;
  };

  // country management
  const [country, setCountry] = useState<any>([]);

  const getListCountry = async () => {
    const data = await localStorage.getItem('dynamic');
    const dataJSON = JSON.parse(data);
    const grade = getDynamicListByKey('grades', dataJSON);
    const subject = getDynamicListByKey('subjects', dataJSON);
    const activity = getDynamicListByKey('activities', dataJSON);
    const experience = getDynamicListByKey('experiences', dataJSON);
    const availability = getDynamicListByKey('availabilities', dataJSON);
    const status = getDynamicListByKey('status', dataJSON);
    setGradeList(grade);
    setSubjectList(subject);
    setActivityList(activity);
    setExperienceList(experience);
    setAvailabilityList(availability);
    setStatusList(status);
    if (!country.lenth) {
      setIsLoading(true);
      getCountry(user?.accessToken)
        .then((res: any) => {
          setCountry(formatSelectData(res.data.items, 'name', 'id'));

          setIsLoading(false);
        })
        .catch(error => {
          setIsLoading(false);
        });
    }
  };

  useEffect(() => {
    getListCountry();
  }, []);


  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;
    const file = files[0];
    if (!file) return;

    try {
      setIsLoading(true);
      const response = await postPdfs(user.accessToken, file, user.id);
      const uri = response.storage_path;
      setValues('job', { ...dataJob, fileCv: uri });
    } catch (error) {
      setPopupMessage("Une erreur s'est produite lors de l'envoi du fichier. Veuillez choisir un nouveau fichier, merci.");
      setPopupVisible(true);
    } finally {
      setIsLoading(false);
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleGetFile = async (uri: string) => {
    try {
      setIsLoading(true);
      const pdfUrl = await getPdf(user.accessToken, uri);
      if (typeof pdfUrl === 'string' && pdfUrl.trim() !== '') {
        window.open(pdfUrl, '_blank');
      } else {
        console.log('URL PDF invalide ou vide');
      }
    } catch (error) {
      console.warn(error);
    } finally {
      setIsLoading(false);
    }
  };

  // --------------------------------------------------------------------------
  const { lang } = useLang();
  const activeString = lang === 'fr' ? TitleLabels : TitleLabels_en;
  // --------------------------------------------------------------------------

  return (
    <div>
      <div>
        {/** Level of Study field */}
        {gradeList && (
          <div
            style={{...styles.inputWrap, ...({
                backgroundColor:
                  type === 'read' ? COLORS.disableGray : COLORS.white})}}>
            <InputSelect
              label={activeString.CreationCV.levelOfStudy}
              required
              name="levelOfStudy"
              value={dataJob.levelOfStudy}
              onChange={handleChange}
              error={errors.levelOfStudy}
              showError={showErrors.levelOfStudy}
              isEditable={type !== 'read'}
              data={gradeList}
            />
          </div>
        )}

        {/** Faculty field */}
        {subjectList && (
          <div
            style={{...styles.inputWrap, ...({
                backgroundColor:
                  type === 'read'
                    ? COLORS.disableGray
                    : dataJob.levelOfStudy !== studyLevel.cepe &&
                      dataJob.levelOfStudy !== studyLevel.bepc
                      ? COLORS.white
                      : COLORS.disableGray})}}>
            <InputSelect
              label={TitleLabels.CreationCV.faculty}
              required
              value={dataJob.faculty}
              name="faculty"
              onChange={handleChange}
              error={errors.faculty}
              showError={showErrors.faculty}
              isEditable={type !== 'read'}
              data={subjectList}
            />
          </div>
        )}

        {/** Level of Activity Area field */}
        {activityList && (
          <div
            style={{...styles.inputWrap, ...({
                backgroundColor:
                  type === 'read' ? COLORS.disableGray : COLORS.white})}}>
            <InputSelect
              label={activeString.CreationCV.activityArea}
              required
              name="activityArea"
              value={dataJob.activityArea}
              onChange={handleChange}
              error={errors.activityArea}
              showError={showErrors.activityArea}
              isEditable={type !== 'read'}
              data={activityList}
            />
          </div>
        )}

        {/** University field */}
        <div
          style={{...styles.inputWrap, ...({
              backgroundColor:
                type === 'read' ? COLORS.disableGray : COLORS.white})}}>
          <InputField
            label={activeString.CreationCV.university}
            required
            value={dataJob.university}
            name="university"
            onChange={handleChange}
            error={errors.university}
            showError={showErrors.university}
            isEditable={type !== 'read'}
            maxLength={50}
          />
        </div>

        {/** Desired Posiiton field */}
        <div
          style={{...styles.inputWrap, ...({
              backgroundColor:
                type === 'read' ? COLORS.disableGray : COLORS.white})}}>
          <InputField
            label={activeString.CreationCV.desiredPosition}
            required
            value={dataJob.desiredPosition}
            name="desiredPosition"
            onChange={handleChange}
            error={errors.desiredPosition}
            showError={showErrors.desiredPosition}
            isEditable={type !== 'read'}
            maxLength={50}
          />
        </div>

        <div
          style={{...styles.inputWrap, ...({
              backgroundColor:
                type === 'read' ? COLORS.disableGray : COLORS.white})}}>
          <InputField
            label={activeString.CreationCV.portfolio}
            value={dataJob.portfolio}
            name="portfolio"
            onChange={handleChange}
            maxLength={100}
            isEditable={type !== 'read'}
          />
        </div>

        {/**Profil facebook */}
        <div
          style={{...styles.inputWrap, ...({
              backgroundColor:
                type === 'read' ? COLORS.disableGray : COLORS.white})}}>
          <InputField
            label={TitleLabels.CreationCV.facebook}
            value={dataJob.socioLink}
            name="socioLink"
            onChange={handleChange}
            maxLength={100}
            isEditable={type !== 'read'}
          />
        </div>

        {/** Add pdf buttons */}
        <div
          style={{
            padding: 16,
            marginTop: 28,
            borderRadius: 10,
            borderColor: COLORS.blue_border,
            borderWidth: 1,
            backgroundColor: type === 'read' ? COLORS.disableGray : COLORS.white}}
        >
          <span
            style={{
              color: COLORS.primary,
              fontSize: 12,
              fontWeight: '700'}}
          >
            Importer votre CV en pdf, docx (Max 3 Mo) *
          </span>

          <div style={{ paddingHorizontal: 26, marginTop: 26 }}>
            <button onClick={triggerFileInput} disabled={type === 'read'}>
              <div
                style={{
                  alignItems: 'center',
                  flexDirection: 'row',
                  paddingVertical: 16,
                  justifyContent: 'center',
                  backgroundColor: 'rgb(1, 18, 158)',
                  borderRadius: 10}}
              >
                <img
                  src={icons.cv}
                  style={{ tintColor: 'white', marginRight: 16, height: 24, width: 24 }}
                />
                <span style={{ color: 'white', fontWeight: '700' }}>Importer</span>
              </div>
            </button>

            {/* Input HTML natif, invisible mais déclenché par le bouton */}
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              style={{ display: 'none' }}
              ref={fileInputRef}
              onChange={handleFileSelect}
            />
          </div>

          {dataJob?.fileCv?.length > 0 && (
            <div style={{ paddingHorizontal: 26, marginTop: 26 }}>
              <button onClick={() => handleGetFile(dataJob.fileCv)}>
                <div
                  style={{
                    alignItems: 'center',
                    flexDirection: 'row',
                    paddingVertical: 16,
                    justifyContent: 'center',
                    backgroundColor: COLORS.orange,
                    borderRadius: 10}}
                >
                  <img
                    src={icons.cv}
                    style={{ tintColor: 'white', marginRight: 16, height: 24, width: 24 }}
                  />
                  <span style={{ color: 'white', fontWeight: '700' }}>
                    Visualiser votre CV
                  </span>
                </div>
              </button>
            </div>
          )}
          {showErrors.fileCv && !dataJob.fileCv && (
            <span style={styles.textError}>Ce champ est requis. Veuillez le remplir.</span>
          )}
        </div>

        {/** Year of Experience field */}
        {experienceList && (
          <div
            style={{...styles.inputWrap, ...({
                backgroundColor:
                  type === 'read' ? COLORS.disableGray : COLORS.white})}}>
            <InputSelect
              label={activeString.CreationCV.yearOfExp}
              required
              name="yearOfExp"
              value={dataJob.yearOfExp}
              onChange={handleChange}
              error={errors.yearOfExp}
              showError={showErrors.yearOfExp}
              isEditable={type !== 'read'}
              data={experienceList}
            />
          </div>
        )}

        <DesiredPosition
          values={dataJob}
          handleChange={handleChange}
          errors={errors}
          showErrors={showErrors}
          formatSelectData={formatSelectData}
          country={country}
          type={type}
        />

        {/** Years Of Experiences */}
        <YearsOfExperience
          values={dataJob}
          handleChange={handleChange}
          errors={errors}
          showErrors={showErrors}
          type={type}
        />

        {/** Recommandation */}
        <Recommandation
          values={dataJob}
          handleChange={handleChange}
          errors={errors}
          showErrors={showErrors}
          type={type}
        />

        {/** Availablity */}
        {availabilityList && (
          <div
            style={{...styles.inputWrap, ...({
                backgroundColor:
                  type === 'read' ? COLORS.disableGray : COLORS.white})}}>
            <InputSelect
              label={activeString.CreationCV.availability}
              required
              name={'availability'}
              value={dataJob.availability}
              onChange={handleChange}
              error={errors.availability}
              showError={showErrors.availability}
              isEditable={type !== 'read'}
              data={availabilityList}
            />
          </div>
        )}

        {/** Status */}
        {statusList && (
          <div
            style={{...styles.inputWrap, ...({
                backgroundColor:
                  type === 'read' ? COLORS.disableGray : COLORS.white})}}>
            <InputSelect
              label={activeString.CreationCV.status}
              required
              name={'status'}
              value={dataJob.status}
              onChange={handleChange}
              error={errors.status}
              showError={showErrors.status}
              isEditable={type !== 'read'}
              data={statusList}
            />
          </div>
        )}

        {/** Expected Salary */}
        <div
          style={{...styles.inputWrap, ...({
              backgroundColor:
                type === 'read' ? COLORS.disableGray : COLORS.white})}}>
          {type === 'read' ? (
            <InputField
              label={activeString.CreationCV.minimumWage}
              type="numeric"
              value={thousandSeparator(dataJob.minimumWageRequired, '.')}
              name="minimumWageRequired"
              onChange={handleChange}
              error={errors.minimumWageRequired}
              showError={showErrors.minimumWageRequired}
              isEditable={type !== 'read'}
              maxLength={50}
            />
          ) : (
            <div>
              <div>
                <span style={[formsStyles.labelStyle]}>
                  {activeString.CreationCV.minimumWage}
                </span>
              </div>
              <CurrencyInput
                value={salary}
                onChangeValue={setSalary}
                delimiter="."
                separator="."
                precision={0}
                name="salaire"
                onChangeText={formattedValue => {
                  settingSalary(formattedValue);
                }}
                style={styles.textIput}
              />
            </div>
          )}
        </div>
        {salaryError && (
          <span
            style={{
              color: COLORS.red_color,
              marginLeft: 10,
              marginTop: 5}}>
            {salaryTxtError}
          </span>
        )}
        <div style={{ height: 24 }} />
      </div>
      {isLoading ? <Loader /> : <div />}
      {/** Submit buttons */}
      <div>
        {type !== 'read' && (
          <button
            onClick={handleSubmit}
            style={[styles.submitJob]}>
            <span style={styles.textButton}>Autres</span>
            <img src={icons.action} style={globalStyle.iconStyle} />
          </button>
        )}
      </div>
      <Popup
        visible={popupVisible}
        message={popupMessage}
        validation={setPopupVisible}
        btnTitle="Fermer"
      />
    </div >
  );
};
