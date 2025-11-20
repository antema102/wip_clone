import React, {useEffect, useState} from 'react';


import {Language} from './Language';
import { useForm } from './useFormOther';
import { Validation } from './validationOther';
import { getDynamicListByKey } from '../../../../../service/technique/dynamicService';
import urls from '../../../../../data/constants/urls';
import { COLORS, icons } from '../../../../../resources/constants';
import styles from '../styles';
import { InputSelect } from '../../../../components/Inputs/InputSelect';
import { TitleLabels } from '../titleLabels';
import { TitleLabels_en } from '../titleLabels_en';
import { InputField } from '../../../../components/Inputs/InputField';
import Checkbox from '../../../../components/Checkbox';
import { formsStyles } from '../../../../globalStyle/formStyles';
import { TEXT_INFORMATIONS } from '../../../../../data/constants/strings';
import globalStyle from '../../../../globalStyle/globalStyle';
import { useLang } from '../../../../../data/translation';
import * as stringsFr from '../../../../../data/constants/strings';
import * as stringsEn from '../../../../../data/constants/strings_en';

export const FormOther = (props: any) => {
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
    dataOther,
    errors,
    showErrors,
    dto,
    languageError} = useForm(data.other, Validation, handleSave, setValues);

  let textToDisplay = '';
  const languageTxtError = 'Ce champ est obligatoire';
  const [sportList, setSportList] = useState<any>();
  const [isChecked, setIsChecked] = useState(false);

  if (type === 'update') {
    textToDisplay = 'Modification CV términée';
  } else {
    textToDisplay = 'Création CV términée';
  }

  const getDynamicList = async () => {
    const data = await localStorage.getItem('dynamic');
    const dataJSON = JSON.parse(data);
    const sport = getDynamicListByKey('sports', dataJSON);
    setSportList(sport);
  };

  const openTermsAndConditions = async () => {
    await window.open(urls.TERMS_CONDITIONS);
  };

  function handleSave() {
    onSubmitForm(dto.dataOther);
  }

  useEffect(() => {
    getDynamicList();
  }, []);

  useEffect(() => {
    changeComplete(previousState => ({
      ...previousState,
      other: data.other?.sport ? noError() : false}));
  }, [errors]);

  useEffect(() => {
    onChangeDataStore(previousState => ({...previousState, other: dataOther}));
  }, [dataOther]);

  const {lang} = useLang();
  const activeString = lang === 'fr' ? TitleLabels : TitleLabels_en;
  const activeStr = lang === 'fr' ? stringsFr : stringsEn;

  return (
    <div>
      <Language
        values={dataOther}
        handleChange={handleChange}
        errors={errors}
        showErrors={showErrors}
        type={type}
      />

      {languageError && (
        <span style={{color: COLORS.red_color, marginLeft: 10, marginTop: 5}}>
          {languageTxtError}
        </span>
      )}

      <div>
        {/** Sports */}
        {sportList && (
          <div
            style={{...styles.inputWrap, ...({
                backgroundColor:
                  type === 'read' ? COLORS.disableGray : COLORS.white}), ...}}>
            <InputSelect
              label={activeString.CreationCV.sport}
              required
              name={'sport'}
              value={dataOther.sport}
              onChange={handleChange}
              error={errors.sport}
              showError={showErrors.sport}
              isEditable={type !== 'read'}
              data={sportList}
            />
          </div>
        )}
        {/** Interests */}
        <div
          style={{...styles.inputWrap, ...({
              backgroundColor:
                type === 'read' ? COLORS.disableGray : COLORS.white}), ...}}>
          <InputField
            label={activeString.CreationCV.centerIntrest}
            value={dataOther.centerIntrest}
            name={'centerIntrest'}
            onChange={handleChange}
            maxLength={50}
            isEditable={type !== 'read'}
          />
        </div>
        <div
          style={{...styles.inputWrap, ...{
              marginBottom: 20, ...(backgroundColor:
                type === 'read' ? COLORS.disableGray : COLORS.white}), ...}}>
          <InputField
            label={activeString.CreationCV.somethingAboutU}
            type="textArea"
            value={dataOther.somethingAboutU}
            name="somethingAboutU"
            onChange={handleChange}
            maxLength={150}
            isEditable={type !== 'read'}
          />
        </div>

        {type !== 'update' && type !== 'read' ? (
          <div style={styles.checkBoxContaint}>
            <Checkbox
              checked={isChecked}
              onChange={() => setIsChecked(!isChecked)}
              styles={styles.checkBox}
              // tintColors={{true: COLORS.orange, false: COLORS.blue_border}}
            />
            <div style={{width: '90%'}}>
              <span style={[formsStyles.labelStyle, styles.checkBoxText]}>
                {activeStr.TEXT_INFORMATIONS.CANDIDAT_CHECKBOX}
                <span
                  style={[formsStyles.labelStyleTerms]}
                  onClick={() => openTermsAndConditions()}>
                  Politique de confidentialité
                </span>
                {''} à tout moment.
              </span>
            </div>
          </div>
        ) : null}
      </div>

      {/** Submit buttons */}
      <div>
        {type !== 'read' && (
          <button
            onClick={handleSubmit}
            disabled={type !== 'update' && type !== 'read' ? !isChecked : false}
            style={[styles.submitJob]}>
            <span style={styles.textButton}>{textToDisplay}</span>
            <img src={icons.action} style={globalStyle.iconStyle} />
          </button>
        )}
      </div>
    </div>
  );
};
